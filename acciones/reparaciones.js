// INICIALIZAR EL SERVIDOR CON LA BASE DE DATOS 

const express = require('express');
const router = express.Router();

// Traemos la conexión de Supabase desde el archivo principal
const { supabase } = require('../servidor.js'); 

//-----------------------------------------------------


// RUTA PARA AGREGAR UNA NUEVA REPARACION

router.post('/registroReparacion', async (req, res) => {
    

    const { fecha_Repa, tipo_Repa, ID_cli, bici_User, costo_Cobrado,estadoPago} = req.body;

    // 🌟 VALIDACIÓN COMPLETA INCLUYENDO EL PROVEEDOR
    if (!fecha_Repa || !tipo_Repa || !ID_cli || !bici_User || !costo_Cobrado || !estadoPago) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    try {
        // Hacemos el INSERT en la tabla 'productos'
        const { data, error } = await supabase
            .from('reparaciones')
            .insert([
                { 
                    fecha_Repa: fecha_Repa, 
                    tipo_Repa: tipo_Repa, 
                    ID_cli: ID_cli,
                    bici_User: bici_User,
                    costo_Cobrado: costo_Cobrado,
                    estadoPago:estadoPago
                   
                }
            ])
            .select();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(201).json({
            mensaje: "Reparacion registrada con éxito",
            producto: data[0]
        });

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor." });
    }
});


//---------------------------------------------------
// RUTA PARA TRAER TODOS LAS REPARACIONES  ACTIVAS (CON SU PROVEEDOR)
router.get('/listaReparaciones', async (req, res) => {
    try {
        // 🌟 CAMBIO CLAVE: Modificamos el select para mandar a buscar los datos del proveedor relacionado
        const { data, error } = await supabase
            .from('reparaciones')
            .select(`
                id_Repa,
                fecha_Repa,
                 clientes (
                    cliente_Name
                ),
                tipo_Repa,
                bici_User,
                costo_Cobrado,
                estadoPago
               
            `) 
            .eq('estado', 0)
            .order('fecha_Repa', { ascending: true }); // ASC por fecha

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
// RUTA PARA EDITAR UNA REPARACIÓN EXISTENTE (CORREGIDA)
router.put('/editarRepa/:id', async (req, res) => {
    const { id } = req.params; // Captura el ':id' de la URL de forma segura
    const { fecha_Repa, ID_cli, tipo_Repa, bici_User, costo_Cobrado, estadoPago } = req.body;

    // VALIDACIÓN FLEXIBLE: Aseguramos los datos obligatorios propios de la reparación
    if (!fecha_Repa || !tipo_Repa || !bici_User || !costo_Cobrado || !estadoPago) {
        return res.status(400).json({ error: "Los datos principales de la reparación son obligatorios." });
    }

    try {
        // Armamos el objeto con las variables correctas de esta tabla
        const datosActualizar = {
            fecha_Repa: fecha_Repa,
            tipo_Repa: tipo_Repa,
            bici_User: bici_User,
            costo_Cobrado: parseFloat(costo_Cobrado), // 🌟 CORREGIDO: Usamos costo_Cobrado
            estadoPago: estadoPago
        };

        // Si el usuario seleccionó un cliente válido, lo sumamos al update
        if (ID_cli && ID_cli !== "") {
            datosActualizar.ID_cli = parseInt(ID_cli);
        }

        const { data, error } = await supabase
            .from('reparaciones')
            .update(datosActualizar) 
            .eq('id_Repa', id) // 🌟 CORREGIDO: Compara la columna id_Repa con el ':id' de la URL
            .select(); 

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(200).json({
            mensaje: "Reparación actualizada con éxito.",
            reparacion: data[0] // 🌟 CORREGIDO: Refleja que es una reparación
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error interno del servidor al actualizar." });
    }
});

//---------------------------------------------------
// RUTA PARA BORRADO LÓGICO (ENVIAR REPARACIONES A PAPELERA)
router.put('/papeleraRepa/:id', async (req, res) => {
    // 1. Capturamos el ID del proveedor desde la URL
    const id_Repa = req.params.id;

    try {
        // 2. Hacemos el UPDATE cambiando el estado a 1 (Papelera)
        const { data, error } = await supabase
            .from('reparaciones')
            .update({ estado: 1 }) 
            .eq('id_Repa', id_Repa)
            .select(); // Nos devuelve el registro para confirmar el cambio

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Si el ID no coincide con ningún usuario activo
        if (data.length === 0) {
            return res.status(404).json({ error: "Reparacion no encontrado." });
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


router.get('/listarP_Repa', async (req, res) => {
    try {
        // Hacemos el SELECT apuntando a la tabla 'reparaciones'
        // Filtrando donde el estado sea 1 (Papelera)
        const { data, error } = await supabase
            .from('reparaciones')
            .select(`
                id_Repa,
                fecha_Repa,
                tipo_Repa,
                bici_User,
                costo_Cobrado,
                estadoPago,
                ID_cli,
                clientes (
                    cliente_Name
                )
            `) // 🌟 Traemos las columnas de reparaciones + el JOIN para saber de qué cliente era
            .eq('estado', 1)
            .order('fecha_Repa', { ascending: true }); // ASC por fecha

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Devolvemos el array de las reparaciones archivadas
        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor al listar la papelera de reparaciones." });
    }
});

// =================================================================
// 2. RUTA PARA RESTAURAR REPARACIONES (SACAR DE PAPELERA)
// =================================================================
router.put('/restaurarRepa/:id', async (req, res) => {
    const id_Repa = req.params.id;

    try {
        // Hacemos el UPDATE cambiando el estado a 0 (Activo de nuevo en el taller)
        const { data, error } = await supabase
            .from('reparaciones')
            .update({ estado: 0 }) 
            .eq('id_Repa', id_Repa)
            .select();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: "Reparación no encontrada en la papelera." });
        }

        res.status(200).json({
            mensaje: "La Reparación ha sido restaurada correctamente"
        });

    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor al restaurar." });
    }
});

// =================================================================
// 3. RUTA PARA ELIMINACIÓN PERMANENTE (BORRAR DEFINITIVO)
// =================================================================
router.delete('/RepaBorrado/:id', async (req, res) => {
    const id_Repa = req.params.id;

    try {
        // 1. PRIMERO: Borramos los hijos (Extras)
        await supabase.from('reparacion_Extra').delete().eq('reparacion_ID', id_Repa);

        // 2. DESPUÉS: Borramos el padre (Reparación)
        const { error } = await supabase.from('reparaciones').delete().eq('id_Repa', id_Repa);

        if (error) return res.status(400).json({ error: error.message });

        res.status(200).json({ mensaje: "Reparación y sus extras eliminados." });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar." });
    }
});

//-----------------------------------------------------
// Exportamos el router para que servidor.js lo pueda leer
module.exports = router;
