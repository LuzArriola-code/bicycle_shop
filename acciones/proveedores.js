// INICIALIZAR EL SERVIDOR CON LA BASE DE DATOS 

const express = require('express');
const router = express.Router();

// Traemos la conexión de Supabase desde el archivo principal
const { supabase } = require('../servidor.js'); 

//-----------------------------------------------------



// RUTA PARA AGREGAR UN NUEVO PROVEEDOR


router.post('/registroProveedor', async (req, res) => {
    // Recibimos los datos del formulario (frontend)
    const { nombre_Completo, telefono, direccion } = req.body;

    // Validación básica por si faltan datos obligatorios
    if (!nombre_Completo || !telefono || !direccion) {
        return res.status(400).json({ error: "Completar todos los datos." });
    }

    try {
        // Hacemos el INSERT en la tabla 'proveedores'
        // 'estado' no lo enviamos porque Supabase le pone 0 automáticamente
        const { data, error } = await supabase
            .from('proveedores')
            .insert([
                { 
                    nombre_Completo: nombre_Completo, 
                    telefono: telefono, 
                    direccion: direccion 
                }
            ])
            .select(); // Nos devuelve el registro creado para confirmar

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Si todo sale bien, respondemos con éxito y los datos creados
        res.status(201).json({
            mensaje: "Proveedor registrado con éxito",
            proveedores: data[0]
        });

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor." });
    }
});



//---------------------------------------------------

// RUTA PARA TRAER TODOS LOS PROVEEDORES ACTIVOS (QUE NO ESTÁN EN PAPELERA)
router.get('/listaProveedores', async (req, res) => {
    try {
        // Hacemos el SELECT filtrando donde el estado sea 0
        const { data, error } = await supabase
            .from('proveedores')
            .select('id_Prove,nombre_Completo, telefono, direccion') // Traemos solo lo necesario (sin password por seguridad)
            .eq('estado', 0)
            .order('nombre_Completo', { ascending: true });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Si todo sale bien, devolvemos la lista de usuarios
        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor." });
    }
});


// RUTA PARA EDITAR LOS DATOS DE UN USUARIO EXISTENTE (DINÁMICA)
router.put('/editarProv/:id', async (req, res) => {
    const id_Prove = req.params.id;
    const { nombre_Completo, telefono, direccion } = req.body;

    // 1. Creamos un objeto vacío donde vamos a meter SOLO lo que el usuario rellenó
    const camposAActualizar = {};

    
    if (nombre_Completo && nombre_Completo.trim() !== "") {
        camposAActualizar.nombre_Completo = nombre_Completo;
    }

    if (telefono && telefono.trim() !== "") {
       camposAActualizar.telefono = telefono;
    }

     if (direccion && direccion.trim() !== "") {
       camposAActualizar.direccion = direccion;
    }

   

    // Validación por si le dieron a guardar sin cambiar absolutamente nada
    if (Object.keys(camposAActualizar).length === 0) {
        return res.status(400).json({ error: "No enviaste ningún dato modificado para actualizar." });
    }

    try {
        // 5. Le pasamos el objeto dinámico a Supabase
        const { data, error } = await supabase
            .from('proveedores')
            .update(camposAActualizar) // Solo actualiza los campos que metimos arriba
            .eq('id_Prove', id_Prove)
            .select();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: "Proveedor no encontrado." });
        }

        res.status(200).json({
            mensaje: "Proveedor actualizado con éxito",
            proveedor: data[0]
        });

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor al actualizar." });
    }
});



// RUTA PARA BORRADO LÓGICO (ENVIAR PROVEEDOR A PAPELERA)
router.put('/papeleraProv/:id', async (req, res) => {
    // 1. Capturamos el ID del proveedor desde la URL
    const id_Prove = req.params.id;

    try {
        // 2. Hacemos el UPDATE cambiando el estado a 1 (Papelera)
        const { data, error } = await supabase
            .from('proveedores')
            .update({ estado: 1 }) 
            .eq('id_Prove', id_Prove)
            .select(); // Nos devuelve el registro para confirmar el cambio

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Si el ID no coincide con ningún usuario activo
        if (data.length === 0) {
            return res.status(404).json({ error: "Proveedor no encontrado." });
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

// RUTA PARA TRAER TODOS LOS PROVEEDORES QUE ESTÁN EN LA PAPELERA (ESTADO 1)
router.get('/listarP_Prov', async (req, res) => {
    try {
        // Hacemos el SELECT filtrando donde el estado sea 1 (Inactivos/Papelera)
        const { data, error } = await supabase
            .from('proveedores')
            .select('id_Prove, nombre_Completo, telefono,direccion') // Traemos lo mismo que la tabla común
            .eq('estado', 1)
            .order('nombre_Completo', { ascending: true });


        if (error) {
            return res.status(400).json({ error: error.message });
        }

       // FORZAMOS EL ORDEN AQUÍ (Manual en el servidor)
        // Esto toma los datos que trajo Supabase y los ordena A-Z correctamente
        const dataOrdenada = data.sort((a, b) => {
            const nombreA = a.nombre_Completo ? a.nombre_Completo.toLowerCase() : "";
            const nombreB = b.nombre_Completo ? b.nombre_Completo.toLowerCase() : "";
            return nombreA.localeCompare(nombreB);
        });

        // Devolvemos el array ya ordenado
        res.status(200).json(dataOrdenada);
        

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor al listar la papelera." });
    }
});


// RUTA PARA RESTAURAR PROVEEDOR (SACAR DE PAPELERA)
router.put('/restaurarProv/:id', async (req, res) => {
    const id_Prove = req.params.id;

    try {
        // Hacemos el UPDATE cambiando el estado a 0 (Activo de nuevo)
        const { data, error } = await supabase
            .from('proveedores')
            .update({ estado: 0 }) 
            .eq('id_Prove', id_Prove)
            .select();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: "Proveedor no encontrado en la papelera." });
        }

        res.status(200).json({
            mensaje: "El Proveedor ha sido restaurado correctamente"
        });

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor al restaurar." });
    }
});

// RUTA PARA ELIMINACIÓN PERMANENTE (BORRAR DEFINITIVO) PROVEEDOR
router.delete('/proveedorBorrado/:id', async (req, res) => {
    const id_Prove = req.params.id;

    try {
        // Hacemos el DELETE directo en la base de datos
        const { data, error } = await supabase
            .from('proveedores')
            .delete()
            .eq('id_Prove', id_Prove)
            .select(); // Confirmamos qué registro se borró

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: "Proveedor no encontrado en el sistema." });
        }

        res.status(200).json({
            mensaje: "El Proveedor ha sido eliminado permanentemente del sistema"
        });

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor al eliminar definitivamente." });
    }
});



//-----------------------------------------------------
// Exportamos el router para que servidor.js lo pueda leer
module.exports = router;






