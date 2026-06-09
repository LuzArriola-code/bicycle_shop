// INICIALIZAR EL SERVIDOR CON LA BASE DE DATOS 

const express = require('express');
const router = express.Router();

// Traemos la conexión de Supabase desde el archivo principal
const { supabase } = require('../servidor.js'); 

//-----------------------------------------------------

//---------------------------------------------------
// RUTA PARA AGREGAR UN REPUESTO EXTRA A UNA REPARACIÓN

//---------------------------------------------------
// RUTA PARA AGREGAR UN REPUESTO EXTRA (CORREGIDA)
//---------------------------------------------------
// RUTA PARA AGREGAR UN REPUESTO EXTRA CON FECHA
//---------------------------------------------------
router.post('/registroExtra', async (req, res) => {
    
    // Agregamos fechaExtra al desestructurar el body
    const { cantidad_Extra, reparacion_ID, producto_ID, fechaExtra } = req.body;

    // Validación obligatoria incluyendo la fecha
    if (!cantidad_Extra || !producto_ID || !fechaExtra) {
        return res.status(400).json({ error: "La cantidad, el producto y la fecha son obligatorios." });
    }

    try {
        // 1. CONTROL Y DESCUENTO DE STOCK DIRECTO
        const { data: producto, error: errProd } = await supabase
            .from('productos')
            .select('cantidad_Prod')
            .eq('id_Producto', producto_ID)
            .single();

        if (errProd || !producto) {
            return res.status(400).json({ error: "No se encontró el repuesto en el sistema." });
        }

        const nuevoStock = producto.cantidad_Prod - parseInt(cantidad_Extra);

        if (nuevoStock < 0) {
            return res.status(400).json({ error: "Stock insuficiente del repuesto en el taller." });
        }

        // Actualizamos el stock en la tabla 'productos'
        await supabase
            .from('productos')
            .update({ cantidad_Prod: nuevoStock })
            .eq('id_Producto', producto_ID);


        // 2. HACEMOS EL INSERT EN LA TABLA 'reparacion_Extra'
        const { data, error } = await supabase
            .from('reparacion_Extra')
            .insert([
                { 
                    cantidad_Extra: parseInt(cantidad_Extra), 
                    reparacion_ID: reparacion_ID, 
                    producto_ID: parseInt(producto_ID),
                    fechaExtra: fechaExtra, // 🌟 GUARDAMOS LA FECHA EN TU NUEVA COLUMNA
                    estado: 0 
                }
            ])
            .select();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(201).json({
            mensaje: "Repuesto extra registrado con éxito",
            extra: data[0]
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error interno del servidor." });
    }
});



//---------------------------------------------------
// RUTA PARA TRAER TODOS LOS REPUESTOS EXTRAS REGISTRADOS


router.get('/listarExtras', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('reparacion_Extra')
            .select(`
                id_Extra,
                cantidad_Extra,
                fechaExtra,
                estado,
                producto_ID,
                productos (
                    producto_Name
                )
            `)
            .eq('estado', 0)
            .order('fechaExtra', { ascending: true }); // <--- ASC por fecha

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(200).json(data);

    } catch (err) {
        console.error("Error en servidor al listar extras:", err);
        res.status(500).json({ error: "Error interno del servidor." });
    }
});


//--------------------------------------------------------------

// BORRAR DE FORMA LOGICA REPARACIONES_EXTRA 

router.put('/papeleraExtra/:id', async (req, res) => {
    const { id } = req.params;
    
    // Solo actualizamos el estado, NADA MÁS
    const { error } = await supabase
        .from('reparacion_Extra')
        .update({ estado: 1 })
        .eq('id_Extra', id);

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ mensaje: "Registro enviado a papelera." });
});




//---------------------------------------------------------------
// VER EN PAPELERA REGISTROS BORRADOS L.

router.get('/listarP_Extra', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('reparacion_Extra')
            .select('id_Extra, fechaExtra, reparacion_ID, producto_ID, cantidad_Extra, estado')
            .eq('estado', 1)
            .order('fechaExtra', { ascending: false });

        if (error) return res.status(400).json({ error: error.message });

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Error al listar la papelera de extras." });
    }
});

//----------------------------------------------------------------
// RESTAURAR REGISTROS DE REPARACION_EXTRA



router.put('/restaurarExtra/:id', async (req, res) => {
    const id_Extra = req.params.id;

    try {
        const { data, error } = await supabase
            .from('reparacion_Extra')
            .update({ estado: 0 })
            .eq('id_Extra', id_Extra)
            .select();

        if (error) return res.status(400).json({ error: error.message });
        if (data.length === 0) return res.status(404).json({ error: "Registro no encontrado." });

        res.status(200).json({ mensaje: "Registro restaurado correctamente." });
    } catch (err) {
        res.status(500).json({ error: "Error al restaurar." });
    }
});

//---------------------------------------------------

// ELIMINAR DEFINITIVO

router.delete('/eliminarExtra/:id', async (req, res) => {
    const { error } = await supabase
        .from('reparacion_Extra')
        .delete()
        .eq('id_Extra', req.params.id);

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ mensaje: "Extra eliminado permanentemente." });
});








//-----------------------------------------------------
// Exportamos el router para que servidor.js lo pueda leer
module.exports = router;