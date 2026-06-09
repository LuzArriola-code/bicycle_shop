// INICIALIZAR EL SERVIDOR CON LA BASE DE DATOS 

const express = require('express');
const router = express.Router();

// Traemos la conexión de Supabase desde el archivo principal
const { supabase } = require('../servidor.js'); 

//-----------------------------------------------------


// RUTA PARA AGREGAR UNA NUEVA VENTA

// RUTA PARA AGREGAR UNA NUEVA VENTA (CON CONTROL DE STOCK)
router.post('/registroVenta', async (req, res) => {
    const { fecha_Venta, tipo_Compra, cantidad, total_Comprado, estado_Pago, cliente_ID, produ_ID } = req.body;

    // 1. VALIDACIÓN: Aseguramos que vengan todos los campos obligatorios
    if (!fecha_Venta || !tipo_Compra || !cantidad || !total_Comprado || !estado_Pago || !cliente_ID || !produ_ID) {
        return res.status(400).json({ error: "Todos los campos son obligatorios para registrar la venta." });
    }

    try {
        // 2. CONSULTAR EL STOCK ACTUAL DEL PRODUCTO
        const { data: producto, error: errorProducto } = await supabase
            .from('productos')
            .select('cantidad_Prod, producto_Name')
            .eq('id_Producto', produ_ID)
            .single(); // Traemos solo ese producto específico

        if (errorProducto || !producto) {
            return res.status(404).json({ error: "El producto seleccionado no existe." });
        }

        // 3. VALIDACIÓN DE STOCK: Verificamos si alcanzan las unidades
        if (producto.cantidad_Prod < parseInt(cantidad)) {
            return res.status(400).json({ 
                error: `Stock insuficiente. Solo quedan ${producto.cantidad_Prod} unidades de "${producto.producto_Name}".` 
            });
        }

        // 4. PASO A: Insertar la venta en la tabla 'ventas'
        const { data: nuevaVenta, error: errorVenta } = await supabase
            .from('ventas')
            .insert([
                {
                    fecha_Venta: fecha_Venta,
                    tipo_Compra: tipo_Compra,
                    cantidad: parseInt(cantidad),
                    total_Comprado: parseFloat(total_Comprado),
                    estado_Pago: estado_Pago,
                    cliente_ID: parseInt(cliente_ID),
                    produ_ID: parseInt(produ_ID),
                    estado: 0 // Venta activa (no en papelera)
                }
            ])
            .select();

        if (errorVenta) {
            return res.status(400).json({ error: errorVenta.message });
        }

        // 5. PASO B: Descontar el Stock en la tabla 'productos'
        const nuevoStock = producto.cantidad_Prod - parseInt(cantidad);

        const { error: errorStock } = await supabase
            .from('productos')
            .update({ cantidad_Prod: nuevoStock })
            .eq('id_Producto', produ_ID);

        if (errorStock) {
            // Nota: El registro de la venta ya se creó, si falla el stock habría que evaluar un rollback,
            // pero en estructuras simples con Supabase este update es sumamente seguro.
            return res.status(400).json({ error: `Venta creada pero falló la actualización de stock: ${errorStock.message}` });
        }

        // 6. RESPUESTA DE ÉXITO
        res.status(201).json({
            mensaje: "Venta registrada con éxito y stock actualizado.",
            venta: nuevaVenta[0]
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error interno del servidor al registrar la venta." });
    }
});

//--------------------------------------------------------------------

//---------------------------------------------------
// RUTA PARA TRAER TODAS LAS VENTAS ACTIVAS (CON RELACIONES)
router.get('/listaVentas', async (req, res) => {
    try {
        // Hacemos el select trayendo los campos de ventas y los datos de las tablas vinculadas
        const { data, error } = await supabase
            .from('ventas')
            .select(`
                id_Venta,
                fecha_Venta,
                tipo_Compra,
                cantidad,
                total_Comprado,
                estado_Pago,
                cliente_ID,
                clientes (
                    cliente_Name
                ),
                produ_ID,
                productos (
                    producto_Name
                )
            `)
            .eq('estado', 0) // Solo ventas activas (no borradas)
            .order('id_Venta', { ascending: true }) 
            .order('fecha_Venta', { ascending: true });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Si todo sale bien, devolvemos la lista de ventas
        res.status(200).json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error interno del servidor al listar ventas." });
    }
});


//--------------------------------------------------------

//---------------------------------------------------
// RUTA PARA ACTUALIZAR UNA VENTA Y RECALCULAR STOCK

router.put('/editarVenta/:id', async (req, res) => {
    const idVenta = req.params.id;
    // Recibimos solo lo que puede cambiar y el id del producto
    const { fecha_Venta, cantidad, cantidad_Vieja, total_Comprado, estado_Pago, produ_ID } = req.body;

    try {
        // 1. Buscamos el stock disponible actual de ese producto
        const { data: producto, error: errProd } = await supabase
            .from('productos')
            .select('cantidad_Prod')
            .eq('id_Producto', produ_ID)
            .single();

        if (errProd || !producto) {
            return res.status(400).json({ error: "No se encontró el producto asociado." });
        }

        // LÓGICA DE STOCK INTELIGENTE
        const diferencia = parseInt(cantidad) - parseInt(cantidad_Vieja);
        const nuevoStock = producto.cantidad_Prod - diferencia;

        if (nuevoStock < 0) {
            return res.status(400).json({ error: `Stock insuficiente en taller. Quedarían ${nuevoStock} unidades.` });
        }

        // 2. Actualizamos el stock del producto
        const { error: errUpdateProd } = await supabase
            .from('productos')
            .update({ cantidad_Prod: nuevoStock })
            .eq('id_Producto', produ_ID);

        if (errUpdateProd) {
            return res.status(400).json({ error: "Error al actualizar el stock del producto." });
        }

        // 3. Modificamos los datos permitidos de la venta
        const { data, error } = await supabase
            .from('ventas')
            .update({
                fecha_Venta,
                cantidad: parseInt(cantidad),
                total_Comprado: parseFloat(total_Comprado),
                estado_Pago
            })
            .eq('id_Venta', idVenta)
            .select();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(200).json({ 
            mensaje: "Venta actualizada con éxito y stock recalculado.",
            venta: data[0] 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error interno en el servidor." });
    }
});
//-----------------------------------------------------
//---------------------------------------------------
// RUTA PARA BORRADO LÓGICO DE UNA VENTA (ENVÍO A PAPELERA)
//---------------------------------------------------

router.put('/borrarVenta/:id', async (req, res) => {
    const idVenta = req.params.id;

    try {
        // 1. Verificamos si la venta existe y su estado actual
        const { data: venta, error: errVenta } = await supabase
            .from('ventas')
            .select('estado')
            .eq('id_Venta', idVenta)
            .single();

        if (errVenta || !venta) {
            return res.status(404).json({ error: "No se encontró la venta especificada." });
        }

        if (venta.estado === 1) {
            return res.status(400).json({ error: "Esta venta ya se encuentra en la papelera." });
        }

        // 2. BORRADO LÓGICO DIRECTO
        // Simplemente actualizamos el estado sin tocar la tabla de productos
        const { error: errBorrado } = await supabase
            .from('ventas')
            .update({ estado: 1 })
            .eq('id_Venta', idVenta);

        if (errBorrado) {
            return res.status(400).json({ error: errBorrado.message });
        }

        res.status(200).json({ 
            mensaje: "Venta enviada a la papelera correctamente." 
        });

    } catch (err) {
        console.error("Error en servidor al borrar venta:", err);
        res.status(500).json({ error: "Error interno del servidor." });
    }
});

//---------------------------------------------------
// RUTA PARA TRAER TODAS LAS VENTAS QUE ESTÁN EN LA PAPELERA (ESTADO 1)
//---------------------------------------------------
router.get('/listarP_Venta', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('ventas')
            .select(`
                id_Venta,
                fecha_Venta,
                tipo_Compra,
                cantidad,
                total_Comprado,
                estado_Pago,
                clientes (cliente_Name),
                productos (producto_Name)
            `)
            .eq('estado', 1)
            .order('id_Venta', { ascending: true })
            .order('fecha_Venta', { ascending: true });

        if (error) return res.status(400).json({ error: error.message });

        // Aplanamos para que el frontend reciba strings directos
        const datosAplanados = data.map(v => ({
            id_Venta: v.id_Venta,
            fecha_Venta: v.fecha_Venta,
            tipo_Compra: v.tipo_Compra,
            cantidad: v.cantidad,
            total_Comprado: v.total_Comprado,
            estado_Pago: v.estado_Pago,
            nombre_cliente: v.clientes ? v.clientes.cliente_Name : "---",
            nombre_producto: v.productos ? v.productos.producto_Name : "---"
        }));

        res.status(200).json(datosAplanados);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al listar ventas." });
    }
});

//---------------------------------------------------
// RUTA PARA RESTAURAR VENTAS (SACAR DE PAPELERA)
//---------------------------------------------------
router.put('/restaurarVenta/:id', async (req, res) => {
    const id_Venta = req.params.id;

    try {
        // 1. Antes de restaurar, restamos el stock de nuevo (porque al borrarla se lo habíamos devuelto)
        const { data: venta, error: errVenta } = await supabase
            .from('ventas')
            .select('produ_ID, cantidad, estado')
            .eq('id_Venta', id_Venta)
            .single();

        if (venta && venta.estado === 1) {
            const { data: producto } = await supabase
                .from('productos')
                .select('cantidad_Prod')
                .eq('id_Producto', venta.produ_ID)
                .single();

            if (producto) {
                const nuevoStock = parseInt(producto.cantidad_Prod) - parseInt(venta.cantidad);
                // Actualizamos el stock disminuyéndolo
                await supabase
                    .from('productos')
                    .update({ cantidad_Prod: nuevoStock })
                    .eq('id_Producto', venta.produ_ID);
            }
        }

        // 2. Hacemos el UPDATE cambiando el estado a 0 (Activo de nuevo)
        const { data, error } = await supabase
            .from('ventas')
            .update({ estado: 0 }) 
            .eq('id_Venta', id_Venta)
            .select();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: "Venta no encontrada en la papelera." });
        }

        res.status(200).json({
            mensaje: "La Venta ha sido restaurada correctamente"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error interno del servidor al restaurar la venta." });
    }
});


//---------------------------------------------------
// RUTA PARA ELIMINACIÓN PERMANENTE (BORRAR DEFINITIVO) VENTA


router.delete('/borradoDefinitivoVenta/:id', async (req, res) => {
    const id_Venta = req.params.id;

    try {
        // Al tener SET NULL en las relaciones, esto no afectará a Clientes ni Productos
        const { error } = await supabase
            .from('ventas')
            .delete()
            .eq('id_Venta', id_Venta);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(200).json({
            mensaje: "La Venta ha sido eliminada permanentemente del sistema."
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error interno al eliminar la venta." });
    }
});

//-----------------------------------------------------
// Exportamos el router para que servidor.js lo pueda leer
module.exports = router;