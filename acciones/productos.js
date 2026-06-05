// INICIALIZAR EL SERVIDOR CON LA BASE DE DATOS 

const express = require('express');
const router = express.Router();

// Traemos la conexión de Supabase desde el archivo principal
const { supabase } = require('../servidor.js'); 

//-----------------------------------------------------

// RUTA PARA AGREGAR UN NUEVO PRODUCTO

router.post('/registroProductos', async (req, res) => {
    // 🌟 NUEVO: Agregamos prov_ID que viene desde el frontend
    const { fecha, tipo_Prod, producto_Name, cantidad_Prod, costo_Prod, prov_ID } = req.body;

    // 🌟 VALIDACIÓN COMPLETA INCLUYENDO EL PROVEEDOR
    if (!fecha || !tipo_Prod || !producto_Name || !cantidad_Prod || !costo_Prod || !prov_ID) {
        return res.status(400).json({ error: "Todos los campos son obligatorios, incluido el proveedor." });
    }

    try {
        // Hacemos el INSERT en la tabla 'productos'
        const { data, error } = await supabase
            .from('productos')
            .insert([
                { 
                    fecha: fecha, 
                    tipo_Prod: tipo_Prod, 
                    producto_Name: producto_Name,
                    cantidad_Prod: cantidad_Prod,
                    costo_Prod: costo_Prod,
                    prov_ID: prov_ID // 🌟 Guardamos la FK en la base de datos
                }
            ])
            .select();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(201).json({
            mensaje: "Producto registrado con éxito",
            producto: data[0]
        });

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor." });
    }
});


//---------------------------------------------------
// RUTA PARA TRAER TODOS LOS PRODUCTOS ACTIVOS (CON SU PROVEEDOR)
router.get('/listaProductos', async (req, res) => {
    try {
        // 🌟 CAMBIO CLAVE: Modificamos el select para mandar a buscar los datos del proveedor relacionado
        const { data, error } = await supabase
            .from('productos')
            .select(`
                id_Producto,
                fecha,
                tipo_Prod,
                producto_Name,
                cantidad_Prod,
                costo_Prod,
                proveedores (
                    nombre_Completo
                )
            `) 
            .eq('estado', 0)
            .order('fecha', { ascending: true });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Si todo sale bien, devolvemos la lista de productos
        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor." });
    }
});




//---------------------------------------------------

// RUTA PARA EDITAR UN PRODUCTO EXISTENTE

router.put('/editarProducto/:id', async (req, res) => {
    const { id } = req.params; 
    const { fecha, tipo_Prod, producto_Name, cantidad_Prod, costo_Prod, prov_ID } = req.body;

    // 🌟 VALIDACIÓN FLEXIBLE: Solo obligamos los datos propios del producto.
    // Dejamos afuera prov_ID por si el usuario no lo toca o viene vacío temporalmente.
    if (!fecha || !tipo_Prod || !producto_Name || !cantidad_Prod || !costo_Prod) {
        return res.status(400).json({ error: "Los datos principales del producto son obligatorios." });
    }

    try {
        // Armamos el objeto de actualización básico
        const datosActualizar = {
            fecha: fecha,
            tipo_Prod: tipo_Prod,
            producto_Name: producto_Name,
            cantidad_Prod: parseInt(cantidad_Prod),
            costo_Prod: parseFloat(costo_Prod)
        };

        // 🌟 Si el usuario seleccionó un proveedor válido, lo sumamos al update
        if (prov_ID && prov_ID !== "") {
            datosActualizar.prov_ID = parseInt(prov_ID);
        }

        const { data, error } = await supabase
            .from('productos')
            .update(datosActualizar) // Mandamos solo lo que corresponde
            .eq('id_Producto', id) 
            .select(); 

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(200).json({
            mensaje: "Producto actualizado con éxito.",
            producto: data[0]
        });

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor al actualizar." });
    }
});

//---------------------------------------------------

// RUTA PARA BORRADO LÓGICO (ENVIAR PRODUCTOS A PAPELERA)
router.put('/papeleraProd/:id', async (req, res) => {
    // 1. Capturamos el ID del proveedor desde la URL
    const id_Producto = req.params.id;

    try {
        // 2. Hacemos el UPDATE cambiando el estado a 1 (Papelera)
        const { data, error } = await supabase
            .from('productos')
            .update({ estado: 1 }) 
            .eq('id_Producto', id_Producto)
            .select(); // Nos devuelve el registro para confirmar el cambio

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Si el ID no coincide con ningún usuario activo
        if (data.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado." });
        }

        // 3. Si todo salió bien, respondemos con el mensaje que me pediste
        res.status(200).json({
            mensaje: "El registro se envió a la papelera correctamente",
            usuario: data[0]
        });

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor al enviar a papelera." });
    }
});

//---------------------------------------------------

// RUTA PARA TRAER TODOS LOS PRODUCTOS QUE ESTÁN EN LA PAPELERA (ESTADO 1)
router.get('/listarP_Prod', async (req, res) => { // 🌟 Cambiamos el nombre de la ruta a listarP_Prod
    try {
        // Hacemos el SELECT apuntando a la tabla 'productos'
        // Filtrando donde el estado sea 1 (Inactivos/Papelera)
        const { data, error } = await supabase
            .from('productos')
            .select(`
                id_Producto,
                fecha,
                tipo_Prod,
                producto_Name,
                cantidad_Prod,
                costo_Prod,
                prov_ID,
                proveedores (
                    nombre_Completo
                )
            `) // 🌟 Traemos todas las columnas necesarias + el JOIN del proveedor
            .eq('estado', 1)
            .order('fecha', { ascending: true });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Si todo sale bien, devolvemos el array de productos archivados
        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor al listar la papelera de productos." });
    }
});


//---------------------------------------------------

// RUTA PARA RESTAURAR PRODUCTOS (SACAR DE PAPELERA)
router.put('/restaurarProd/:id', async (req, res) => {
    const id_Producto = req.params.id;

    try {
        // Hacemos el UPDATE cambiando el estado a 0 (Activo de nuevo)
        const { data, error } = await supabase
            .from('productos')
            .update({ estado: 0 }) 
            .eq('id_Producto', id_Producto)
            .select();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado en la papelera." });
        }

        res.status(200).json({
            mensaje: "El Producto ha sido restaurado correctamente"
        });

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor al restaurar." });
    }
});

//---------------------------------------------------

// RUTA PARA ELIMINACIÓN PERMANENTE (BORRAR DEFINITIVO) 
router.delete('/ProdBorrado/:id', async (req, res) => {
    const id_Producto = req.params.id;

    try {
        // 1. Borramos todo lo que usa este producto como FK
        await supabase.from('reparacion_Extra').delete().eq('producto_ID', id_Producto);
        await supabase.from('ventas').delete().eq('produ_ID', id_Producto);

        // 2. Finalmente, borramos el producto
        const { error } = await supabase.from('productos').delete().eq('id_Producto', id_Producto);

        if (error) return res.status(400).json({ error: error.message });

        res.status(200).json({ mensaje: "Producto y todo su historial eliminados." });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar." });
    }
});



//-----------------------------------------------------
// Exportamos el router para que servidor.js lo pueda leer
module.exports = router;
