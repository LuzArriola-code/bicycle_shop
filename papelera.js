// CONTROL DE ACCESO ACCIÓN: Si no inició sesión, lo pataleamos al login de inmediato
if (!localStorage.getItem("usuarioLogueado")) {
  window.location.href = "login.html";
}


// ==========================================
// 1. CONSTANTES GLOBALES
// ==========================================
const selectTablas = document.getElementById("selectTablas");
const contenedorPapelera = document.getElementById("contenedorPapelera");

// Mapas de configuración: Le dice al JS cómo mapear los datos que vienen de Supabase
const configuracionTablas = {
    usuarios: {
        rutaApi: "usuarios",
        rutaListar: "listarP_User",       // 👈 Su ruta para el GET
        rutaRestaurar: "restaurarUser",   // 👈 Su ruta para el PUT
        rutaBorrarDef: "usuarioBorrado",  // 👈 Su ruta para el DELETE
        idColumna: "id_Usuario",
        campos: ["user_Name", "rol"]
    },
    proveedores: {
        rutaApi: "proveedores",
        rutaListar: "listarP_Prov",       // 👈 Su ruta para el GET
        rutaRestaurar: "restaurarProv",   // 👈 Su ruta para el PUT
        rutaBorrarDef: "proveedorBorrado",// 👈 Su ruta para el DELETE
        idColumna: "id_Prove",
        campos: ["nombre_Completo", "telefono", "direccion"]
    },
    clientes: { // 🌟 ¡NUEVO BLOQUE COMPLETITO!
        rutaApi: "clientes",
        rutaListar: "listarP_Clientes",     // 👈 La ruta que crees en tu backend clientes
        rutaRestaurar: "restaurarCliente",  // 👈 La ruta para sacar de papelera
        rutaBorrarDef: "clienteBorrado",    // 👈 La ruta para el delete definitivo
        idColumna: "id_Cliente",
        campos: ["cliente_Name", "numero_Telef"]
    },
      productos: { // 🌟 ¡NUEVO BLOQUE COMPLETITO!
        rutaApi: "productos",
        rutaListar: "listarP_Prod",     // 👈 La ruta que crees en tu backend clientes
        rutaRestaurar: "restaurarProd",  // 👈 La ruta para sacar de papelera
        rutaBorrarDef: "ProdBorrado",    // 👈 La ruta para el delete definitivo
        idColumna: "id_Producto",
        campos: ["id_Producto","fecha","prov_ID","tipo_Prod","producto_Name","cantidad_Prod","costo_Prod"]
    },
   reparaciones: {
    rutaApi: "reparaciones",
    rutaListar: "listarP_Repa",
    rutaRestaurar: "restaurarRepa",
    rutaBorrarDef: "RepaBorrado",
    idColumna: "id_Repa",
    // Corregido: cada columna es un string independiente
    campos: ["id_Repa", "fecha_Repa", "ID_cli", "tipo_Repa", "bici_User", "costo_Cobrado", "estadoPago"]
},
ventas: {
    rutaApi: "ventas",
    rutaListar: "listarP_Venta",       // Tu ruta GET para traer las ventas de la DB
    rutaRestaurar: "restaurarVenta",   // La que usará el PUT para volver el estado a 0
    rutaBorrarDef: "borradoDefinitivoVenta", // La que ejecutará el DELETE físico en Supabase
    idColumna: "id_Venta",
    campos: ["id_Venta", "fecha_Venta", "tipo_Compra", "cantidad", "total_Comprado", "estado_Pago", "cliente_ID", "produ_ID"]
}


};

// ==========================================
// 2. FUNCIONES GLOBALES GENÉRICAS
// ==========================================

// FUNCIÓN MAESTRA: Carga y dibuja la papelera de CUALQUIER tabla

async function cargarPapeleraGenerica(nombreTabla, titulosColumnas) {
    const config = configuracionTablas[nombreTabla];
    if (!config) return;

    try {
        // 🌟 REEMPLAZADO: Ya no hay "sufijo" con ifs. Va directo al manual:
        const respuesta = await fetch(`/api/${config.rutaApi}/${config.rutaListar}`);
        const registros = await respuesta.json();

        if (respuesta.ok) {
            contenedorPapelera.innerHTML = "";

            // 1. VALIDACIÓN: Si la papelera está vacía
            if (registros.length === 0) {
                contenedorPapelera.innerHTML = `
                    <div class="mensaje-vacio">
                        <p>✅ <strong>Sin Registros:</strong> La papelera de ${nombreTabla} está vacía.</p>
                    </div>
                `;
                return;
            }

            // 2. DIBUJAMOS LA TABLA DINÁMICAMENTE
            const tabla = document.createElement("table");
            
            let thsHTML = titulosColumnas.map(titulo => `<th>${titulo}</th>`).join("");
            tabla.innerHTML = `
                <thead>
                    <tr>
                        ${thsHTML}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="cuerpoPapelera"></tbody>
            `;
            contenedorPapelera.appendChild(tabla);

            const cuerpoTabla = document.getElementById("cuerpoPapelera");
            const datosSesion = localStorage.getItem("usuarioLogueado");
            const usuarioSesion = datosSesion ? JSON.parse(datosSesion) : null;

            // 3. PINTAMOS LOS REGISTROS
            registros.forEach(function (registro) {
                const fila = document.createElement("tr");
                const idActual = registro[config.idColumna];

                let accionesHTML = `<button class="btn-restaurar" data-id="${idActual}" data-tabla="${nombreTabla}">Restaurar</button>`;

                if (usuarioSesion && usuarioSesion.rol === "Dueño") {
                    accionesHTML += ` <button class="btn-borrar-definitivo" data-id="${idActual}" data-tabla="${nombreTabla}">Borrar permanente</button>`;
                }

                let tdsHTML = config.campos.map(campo => `<td>${registro[campo]}</td>`).join("");

                fila.innerHTML = `
                    ${tdsHTML}
                    <td>${accionesHTML}</td>
                `;
                cuerpoTabla.appendChild(fila);
            });
        }
    } catch (error) {
        console.error(`Error al conectar con la papelera de ${nombreTabla}:`, error);
    }
}


// FUNCIÓN ACCIÓN: Envía la petición PUT para restaurar (Sirve para todas las tablas)
// FUNCIÓN: Restaurar Registro Genérico
async function restaurarRegistro(id, nombreTabla) {
    const config = configuracionTablas[nombreTabla];

    try {
        // 🌟 Usa config.rutaRestaurar de forma automática
        const respuesta = await fetch(`/api/${config.rutaApi}/${config.rutaRestaurar}/${id}`, {
            method: 'PUT'
        });
        const resultado = await respuesta.json();

        if (respuesta.ok) {
            alert(resultado.mensaje);
            const optionSeleccionada = selectTablas.options[selectTablas.selectedIndex];
            const columnas = optionSeleccionada.getAttribute("data-columnas").split(",");
            cargarPapeleraGenerica(nombreTabla, columnas);
        } else {
            alert(`Error: ${resultado.error}`);
        }
    } catch (error) {
        alert("Error al conectar con el servidor.");
    }
}

// FUNCIÓN: Eliminar Definitivo Genérico (ACTUALIZADA)

async function eliminarRegistroDefinitivo(id, nombreTabla) {
    const config = configuracionTablas[nombreTabla];

    // 1. Mensaje de advertencia dinámico (el que ya tenías)
    let mensaje = `⚠ ¿Estás completamente seguro de eliminar este registro de ${nombreTabla} permanentemente?`;
    
    if (nombreTabla === 'productos') {
        mensaje = `⚠️ ¡ATENCIÓN!\n\n` +
                  `Estás eliminando un producto. Al hacerlo, también se eliminarán de forma permanente:\n` +
                  `• Todas las ventas asociadas a este producto.\n` +
                  `• Todos los registros de reparaciones donde se usó este producto.\n\n` +
                  `¿Querés eliminar el producto y toda su información vinculada?`;
    } 

    if (nombreTabla === 'reparaciones') {
        mensaje = `⚠️ ¡ATENCIÓN!\n\n` +
                  `Estás eliminando una reparación. Al hacerlo, también se eliminarán:\n` +
                  `• Todos los materiales (repuestos/extras) cargados a esta reparación.\n\n` +
                  `¿Querés eliminar la reparación y sus materiales asociados?`;
    }

    const confirmar = confirm(mensaje);
    if (!confirmar) return;

    try {
        // 2. Fetch genérico
        const respuesta = await fetch(`/api/${config.rutaApi}/${config.rutaBorrarDef}/${id}`, {
            method: 'DELETE'
        });
        
        const resultado = await respuesta.json();

        if (respuesta.ok) {
            // AQUI USAMOS TU NUEVO DISEÑO EN LUGAR DE ALERT
            mostrarMensaje("✅ " + resultado.mensaje, 'exito');
            
            // Recargar tabla
            const optionSeleccionada = selectTablas.options[selectTablas.selectedIndex];
            const columnas = optionSeleccionada.getAttribute("data-columnas").split(",");
            cargarPapeleraGenerica(nombreTabla, columnas);
        } else {
            // AQUI TAMBIEN USAMOS TU NUEVO DISEÑO
            mostrarMensaje("❌ Error: " + resultado.error, 'error');
        }
    } catch (error) {
        console.error(error);
        mostrarMensaje("❌ Error al conectar con el servidor.", 'error');
    }
}



// ==========================================
// 3. EVENTO PRINCIPAL DEL DOCUMENTO (LISTENERS)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {

    // Control de roles al cargar la vista
    const datosSesion = localStorage.getItem("usuarioLogueado");
    const usuarioSesion = datosSesion ? JSON.parse(datosSesion) : null;

    if (usuarioSesion && usuarioSesion.rol === "Admin") {
        const elementosRestringidos = document.querySelectorAll('[data-rol="Dueño"]');
        elementosRestringidos.forEach(elemento => elemento.classList.add("oculto"));
    }

    // Escuchamos los cambios en el selector de tablas
    selectTablas.addEventListener("change", function () {
        const tablaSeleccionada = selectTablas.value;
        
        // Capturamos las columnas configuradas en el HTML separadas por coma
        const optionSeleccionada = selectTablas.options[selectTablas.selectedIndex];
        const columnas = optionSeleccionada.getAttribute("data-columnas").split(",");

        // Lanzamos la función mágica pasándole la tabla y sus títulos
        cargarPapeleraGenerica(tablaSeleccionada, columnas);
    });

    // Escuchamos los clics dentro del contenedor de la papelera
    contenedorPapelera.addEventListener('click', function(e) {
        const id = e.target.getAttribute('data-id');
        const tabla = e.target.getAttribute('data-tabla'); // Atrapamos de qué tabla viene el botón
        
        if (e.target.classList.contains('btn-restaurar')) {
            restaurarRegistro(id, tabla);
        } 
        else if (e.target.classList.contains('btn-borrar-definitivo')) {
            eliminarRegistroDefinitivo(id, tabla);
        }
    });

});

//-------------------------------------------------------------
function mostrarMensaje(texto, tipo) {
    const contenedor = document.getElementById('miMensaje');
    const span = document.getElementById('textoMensaje');
    
    span.innerText = texto;
    
    // Limpiamos clases previas
    contenedor.classList.remove('mensaje-exito', 'mensaje-error');
    
    // Aplicamos la clase correcta
    if (tipo === 'error') {
        contenedor.classList.add('mensaje-error');
    } else {
        contenedor.classList.add('mensaje-exito');
    }
    
    contenedor.style.display = 'block';
    
    setTimeout(() => { 
        contenedor.style.display = 'none'; 
    }, 3000);
}