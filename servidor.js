const express = require('express');
const cors = require('cors');
const {createClient} = require('@supabase/supabase-js');
require('dotenv').config();

//-------------------

const app = express();
const PORT = process.env.PORT || 3000; 

//------------------
// MIDDLEWARES 

app.use(cors());
app.use(express.json());

//------------------
// CONEXION A SUPABASE USANDO LAS VARIABLES DEL ARCHIVO .ENV 

const urlBase = process.env.SUPABASE_URL; 
const keyBase = process.env.SUPABASE_KEY; 
const supabase = createClient(urlBase,keyBase); 

// AGREGÁ ESTA LÍNEA JUSTO ACÁ ABAJO:
module.exports = { supabase };


//---------------------------------------------------------------
//                      --- USUARIOS --- 

// ENLAZAR EL ARCHIVO DE ACCIONES DE USUARIOS

const usuariosRutas = require('./acciones/usuarios'); // <-- IMPORTANTE 
app.use('/api/usuarios', usuariosRutas);

//------------------

//                      --- PROVEEDORES --- 

const proveedoresRutas = require('./acciones/proveedores'); // <-- IMPORTANTE 
app.use('/api/proveedores', proveedoresRutas);

//------------------

//                      --- CLIENTES --- 

const clientesRuta = require('./acciones/clientes'); // <-- IMPORTANTE 
app.use('/api/clientes', clientesRuta);

//------------------

//                      --- PRODUCTOS --- 

const productosRuta = require('./acciones/productos'); // <-- IMPORTANTE 
app.use('/api/productos', productosRuta);

//------------------

//                      --- REPARACIONES --- 

const reparacionesRuta = require('./acciones/reparaciones'); // <-- IMPORTANTE 
app.use('/api/reparaciones', reparacionesRuta);


//------------------

//                      --- VENTAS --- 

const ventasRuta = require('./acciones/ventas'); // <-- IMPORTANTE 
app.use('/api/ventas', ventasRuta);


//                      --- EXTRA REPARACION --- 

const extraRuta = require('./acciones/extraRepa'); // <-- IMPORTANTE 
app.use('/api/extraRepa', extraRuta);




//------------------
// RUTA PRUEBA PARA SABER SI EL SERVIDOR FUNCIONA 

app.get("/",(req,res)=>{

res.send("Servidor para el sitio web bike_code funcionando");

});

//------------------
// LEVANTAR EL SERVIDOR 

app.listen(PORT,()=>{

console.log(`Servidor escuchado en http://localhost:${PORT}`);

});