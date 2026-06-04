// INICIALIZAR EL SERVIDOR CON LA BASE DE DATOS 

const express = require('express');
const router = express.Router();

// Traemos la conexión de Supabase desde el archivo principal
const { supabase } = require('../servidor.js'); 

//-----------------------------------------------------



// RUTA PARA AGREGAR UN NUEVO CLIENTE


router.post('/registroCliente', async (req, res) => {
    // Recibimos los datos del formulario (frontend)
    const { cliente_Name, numero_Telef } = req.body;

    // Validación básica por si faltan datos obligatorios
    if (!cliente_Name || !numero_Telef) {
        return res.status(400).json({ error: "Completar todos los datos." });
    }

    try {
        // Hacemos el INSERT en la tabla 'clientes'
        // 'estado' no lo enviamos porque Supabase le pone 0 automáticamente
        const { data, error } = await supabase
            .from('clientes')
            .insert([
                { 
                    cliente_Name: cliente_Name, 
                    numero_Telef: numero_Telef 
                    
                }
            ])
            .select(); // Nos devuelve el registro creado para confirmar

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Si todo sale bien, respondemos con éxito y los datos creados
        res.status(201).json({
            mensaje: "Cliente registrado con éxito",
            clientes: data[0]
        });

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor." });
    }
});

//---------------------------------------------------

// RUTA PARA TRAER TODOS LOS CLIENTES ACTIVOS (QUE NO ESTÁN EN PAPELERA)
router.get('/listaClientes', async (req, res) => {
    try {
        // Hacemos el SELECT filtrando donde el estado sea 0
        const { data, error } = await supabase
            .from('clientes')
            .select('id_Cliente,cliente_Name, numero_Telef') // Traemos solo lo necesario (sin password por seguridad)
            .eq('estado', 0)
            .order('cliente_Name', { ascending: true });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Si todo sale bien, devolvemos la lista de usuarios
        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor." });
    }
});


// RUTA PARA EDITAR LOS DATOS DE UN CLIENTE EXISTENTE (DINÁMICA)
router.put('/editarCliente/:id', async (req, res) => {
    const id_Cliente = req.params.id;
    const { cliente_Name, numero_Telef } = req.body;

    // 1. Creamos un objeto vacío donde vamos a meter SOLO lo que el usuario rellenó
    const camposAActualizar = {};

    
    if (cliente_Name && cliente_Name.trim() !== "") {
        camposAActualizar.cliente_Name = cliente_Name;
    }

    if (numero_Telef && numero_Telef.trim() !== "") {
       camposAActualizar.numero_Telef = numero_Telef;
    }

     

    // Validación por si le dieron a guardar sin cambiar absolutamente nada
    if (Object.keys(camposAActualizar).length === 0) {
        return res.status(400).json({ error: "No enviaste ningún dato modificado para actualizar." });
    }

    try {
        // 5. Le pasamos el objeto dinámico a Supabase
        const { data, error } = await supabase
            .from('clientes')
            .update(camposAActualizar) // Solo actualiza los campos que metimos arriba
            .eq('id_Cliente', id_Cliente)
            .select();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: "Cliente no encontrado." });
        }

        res.status(200).json({
            mensaje: "Cliente actualizado con éxito",
            cliente: data[0]
        });

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor al actualizar." });
    }
});

// RUTA PARA BORRADO LÓGICO (ENVIAR PROVEEDOR A PAPELERA)
router.put('/papeleraCliente/:id', async (req, res) => {
    // 1. Capturamos el ID del proveedor desde la URL
    const id_Cliente = req.params.id;

    try {
        // 2. Hacemos el UPDATE cambiando el estado a 1 (Papelera)
        const { data, error } = await supabase
            .from('clientes')
            .update({ estado: 1 }) 
            .eq('id_Cliente', id_Cliente)
            .select(); // Nos devuelve el registro para confirmar el cambio

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Si el ID no coincide con ningún usuario activo
        if (data.length === 0) {
            return res.status(404).json({ error: "Cliente no encontrado." });
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
router.get('/listarP_Clientes', async (req, res) => {
    try {
        // Hacemos el SELECT filtrando donde el estado sea 1 (Inactivos/Papelera)
        const { data, error } = await supabase
            .from('clientes')
            .select('id_Cliente, cliente_Name, numero_Telef') // Traemos lo mismo que la tabla común
            .eq('estado', 1)
            .order('cliente_Name', { ascending: true });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Si todo sale bien, devolvemos el array de usuarios archivados
        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor al listar la papelera." });
    }
});


// RUTA PARA RESTAURAR CLIENTES (SACAR DE PAPELERA)
router.put('/restaurarCliente/:id', async (req, res) => {
    const id_Cliente = req.params.id;

    try {
        // Hacemos el UPDATE cambiando el estado a 0 (Activo de nuevo)
        const { data, error } = await supabase
            .from('clientes')
            .update({ estado: 0 }) 
            .eq('id_Cliente', id_Cliente)
            .select();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: "Cliente no encontrado en la papelera." });
        }

        res.status(200).json({
            mensaje: "El Cliente ha sido restaurado correctamente"
        });

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor al restaurar." });
    }
});

// RUTA PARA ELIMINACIÓN PERMANENTE (BORRAR DEFINITIVO) CLIENTE
router.delete('/clienteBorrado/:id', async (req, res) => {
    const id_Cliente = req.params.id;

    try {
        // Hacemos el DELETE directo en la base de datos
        const { data, error } = await supabase
            .from('clientes')
            .delete()
            .eq('id_Cliente', id_Cliente)
            .select(); // Confirmamos qué registro se borró

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: "Cliente no encontrado en el sistema." });
        }

        res.status(200).json({
            mensaje: "El Cliente ha sido eliminado permanentemente del sistema"
        });

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor al eliminar definitivamente." });
    }
});
















//-----------------------------------------------------
// Exportamos el router para que servidor.js lo pueda leer
module.exports = router;
