// CONTROL DE ACCESO ACCIÓN: Si no inició sesión, lo pataleamos al login de inmediato
if (!localStorage.getItem("usuarioLogueado")) {
  window.location.href = "login.html";
}

//----------------------------------------------------------------------------------

// ==========================================
// 1. CONSTANTES / VARIABLES / OBJETOS GLOBALES
// ==========================================

//          --- USUARIOS ---
// BOTONES PARA EL CONTENEDOR DE AGREGAR USUARIO

const btnAbrirModal = document.getElementById("btnAbrirModal");
const modalUsuario = document.getElementById("modalUsuario");
const btnCerrarModal = document.getElementById("btnCerrarModal");
const formUsuario = document.getElementById("formUsuario");

// CONTENEDOR AGREGAR USUARIO
// Campos del formulario

const inputName = document.getElementById("userName");
const inputPassword = document.getElementById("password");
const selectRol = document.getElementById("rol");

// BOTONES PARA EL CONTENEDOR TABLA USUARIOS

const btnVerUsuarios = document.getElementById("btnVerUsuarios");
const contenedorUsuarios = document.getElementById("contenedorUsuarios");

// BOTONES + CONTENEDOR PARA EDITAR USUARIOS

const modalEditarUsuario = document.getElementById("modalEditarUsuario");
const formEditarUsuario = document.getElementById("formEditarUsuario");
const editUserId = document.getElementById("editUserId");
const editUserName = document.getElementById("editUserName");
const editPassword = document.getElementById("editPassword");
const editRol = document.getElementById("editRol");

// Captura exclusiva de la "X" del modal de edición
const btnCerrarEditar = document.querySelector(
  "#modalEditarUsuario .btn-cerrar-ventana",
);

/*------------------------------------------------------------------------------*/
//          --- PROVEEDORES ---
// BOTONES PARA EL CONTENEDOR DE AGREGAR PROVEEDOR

const modalProv = document.getElementById("modalProv");
const modalProveedor = document.getElementById("modalProveedor");
const CerrarModalProv = document.getElementById("CerrarModalProv");
const formProveedor = document.getElementById("formProveedor");

// CONTENEDOR AGREGAR PROVEEDOR
// Campos del formulario PROVEEDOR

const nameProv = document.getElementById("nameProv");
const numeroProv = document.getElementById("numeroProv");
const direccionProv = document.getElementById("direccionProv");

// BOTONES PARA EL CONTENEDOR TABLA PROVEEDORES

const btnVerProveedor = document.getElementById("btnVerProveedor");
const contenedorProveedores = document.getElementById("contenedorProveedores");

// SECCION MODAL EDICION PROVEEDORES

const modalEditarProv = document.getElementById("modalEditarProv");
const formEditarProv = document.getElementById("formEditarProv");
const btnCerrarE_Prov = document.querySelector(".btn-cerrarE_Prov");

// Campos del formulario de edición (inputs del modal)
const editProvId = document.getElementById("editProvId");
const editProvName = document.getElementById("editProvName");
const editNumero = document.getElementById("editNumero");
const editDire = document.getElementById("editDire");

/*------------------------------------------------------------------------------*/
//          --- CLIENTES ---
// BOTONES PARA EL CONTENEDOR DE AGREGAR CLIENTES

const btnModalCliente = document.getElementById("btnModalCliente");
const modalCliente = document.getElementById("modalCliente");
const CerrarModalCliente = document.getElementById("CerrarModalCliente");
const formCliente = document.getElementById("formCliente");

// CONTENEDOR AGREGAR CLIENTES
// Campos del formulario CLIENTES

const nameCliente = document.getElementById("nameCliente");
const numeroCliente = document.getElementById("numeroCliente");

// BOTONES PARA EL CONTENEDOR TABLA CLIENTES

const btnVerClientes = document.getElementById("btnVerClientes");
const contenedorClientes = document.getElementById("contenedorClientes");

// SECCION MODAL EDICION CLIENTES

const modalEditarCliente = document.getElementById("modalEditarCliente");
const formEditarCliente = document.getElementById("formEditarCliente");
const cerrarECliente = document.querySelector(".btn-cerrarECliente");

// Campos del formulario de edición (inputs del modal)
const editCli_Id = document.getElementById("editCli_Id");
const editCli_Name = document.getElementById("editCli_Name");
const edit_tel = document.getElementById("edit_tel");

/*------------------------------------------------------------------------------*/
//          --- PRODUCTOS ---
// BOTONES PARA EL CONTENEDOR DE AGREGAR PRODUCTO

const btnModalProd = document.getElementById("btnModalProd");
const modalNuevoProd = document.getElementById("modalNuevoProd");
const btnCerrarN_Prod = document.querySelector(".btn-cerrarN_Prod");
const formNuevoProd = document.getElementById("formNuevoProd");

// Elementos de los inputs del modal
const prodFecha = document.getElementById("prodFecha");
const prodProveedor = document.getElementById("prodProveedor");
const prodTipo = document.getElementById("prodTipo");
const prodName = document.getElementById("prodName");
const prodCantidad = document.getElementById("prodCantidad");
const prodCosto = document.getElementById("prodCosto");

// TABLA PRODUCTOS

const btnVerProd = document.getElementById("btnVerProd");
const contenedorProductos = document.getElementById("contenedorProductos");

// EDITAR PRODUCTOS
const modalEditarProd = document.getElementById("modalEditarProd");
const btnCerrarE_Prod = document.querySelector(".btn-cerrarE_Prod");
const formEditarProd = document.getElementById("formEditarProd");

// Inputs del modal de edición
const editProdId = document.getElementById("editProdId");
const editProdFecha = document.getElementById("editProdFecha");
const editProdProveedor = document.getElementById("editProdProveedor");
const editProdTipo = document.getElementById("editProdTipo");
const editProdName = document.getElementById("editProdName");
const editProdCantidad = document.getElementById("editProdCantidad");
const editProdCosto = document.getElementById("editProdCosto");

/*------------------------------------------------------------------------------*/
//          --- REPARACIONES ---

const btnModalReparacion = document.getElementById("btnModalReparacion");
const seccionFacturaReparacion = document.getElementById(
  "seccionFacturaReparacion",
);
const btnCancelarReparacion = document.getElementById("btnCancelarReparacion");
const formNuevaReparacion = document.getElementById("formNuevaReparacion");

// Inputs de la Factura
const repaFecha = document.getElementById("repaFecha");
const repaCliente = document.getElementById("repaCliente");
const repaTipo = document.getElementById("repaTipo");
const repaBici = document.getElementById("repaBici");
const repaCosto = document.getElementById("repaCosto");
const repaEstadoPago = document.getElementById("repaEstadoPago");

// TABLA PARA VER REPARACIONES
const btnVerRepa = document.getElementById("btnVerRepa");
const contenedorRepa = document.getElementById("contenedorRepa");

const modalEditarRepa = document.getElementById("modalEditarRepa");
const btnCerrarE_Repa = document.querySelector(".btn-cerrarE_Repa");
const formEditarRepa = document.getElementById("formEditarRepa");

// EDITAR REPARACIONES
// Inputs del modal de edición
const editRepaId = document.getElementById("editRepaId");
const editRepaFecha = document.getElementById("editRepaFecha");
const editRepaCliente = document.getElementById("editRepaCliente");
const editRepaTipo = document.getElementById("editRepaTipo");
const editRepaBici = document.getElementById("editRepaBici");
const editRepaCosto = document.getElementById("editRepaCosto");
const editRepaEstadoPago = document.getElementById("editRepaEstadoPago");

// =========================================================================
// RENDERIZAR TABLA DE FACTURA REPARACIONES (SIN COLUMNA DE ACCIONES)
// =========================================================================

const btnFacR = document.getElementById("btnFacR");
const contenedorFRepa = document.getElementById("contenedorFRepa");

const seccionContenedora = document.getElementById("seccionFiltrosYTabla");

/*------------------------------------------------------------------------------*/
//          --- VENTAS ---
// BOTONES PARA EL CONTENEDOR DE AGREGAR VENTAS

const btnModalVentas = document.getElementById("btnModalVentas");
const seccionFacturaVenta = document.getElementById("seccionFacturaVenta");
const btnCancelarVenta = document.getElementById("btnCancelarVenta");
const formNuevaVenta = document.getElementById("formNuevaVenta");

// Inputs de la Factura de Venta
const ventaFecha = document.getElementById("ventaFecha");
const ventaCliente = document.getElementById("ventaCliente");
const ventaTipoCompra = document.getElementById("ventaTipoCompra");
const ventaProducto = document.getElementById("ventaProducto");
const ventaCantidad = document.getElementById("ventaCantidad");
const ventaTotal = document.getElementById("ventaTotal");
const ventaEstadoPago = document.getElementById("ventaEstadoPago");

// Guardaremos los productos de forma global temporalmente para filtrarlos rápido en memoria
let listaProductosGlobal = [];

// Agregá esta constante arriba con tus otros elementos de ventas
const btnVerVenta = document.getElementById("btnVerVenta");
const contenedorVentas = document.getElementById("contenedorVentas");

// ELEMENTOS DEL MODAL DE EDICIÓN DE VENTAS
const modalEditarVenta = document.getElementById("modalEditarVenta");
const formEditarVenta = document.getElementById("formEditarVenta");
const btnCerrarModalVentaX = document.getElementById("btnCerrarModalVentaX");

// Elementos de Texto (Impresos, no editables)
const textVentaCliente = document.getElementById("textVentaCliente");
const textVentaProducto = document.getElementById("textVentaProducto");

// Inputs del Modal (Editables)
const editVentaId = document.getElementById("editVentaId");
const editVentaProductoId = document.getElementById("editVentaProductoId"); // ID oculto
const editVentaFecha = document.getElementById("editVentaFecha");
const editVentaCantidad = document.getElementById("editVentaCantidad");
const editVentaTotal = document.getElementById("editVentaTotal");
const editVentaEstadoPago = document.getElementById("editVentaEstadoPago");

// Variable global para recordar la cantidad original antes de editar
let cantidadOriginalVenta = 0;

const btnFacV = document.getElementById("btnFacV");
const contenedorFactV = document.getElementById("contenedorFactV");

//---------------------------------------------------------------------------
// ------------------------- INFO EXTRA --------

// ELEMENTOS DEL MODAL (MAPEADOS DIRECTO CON TU HTML)
const btnModalExtraR = document.getElementById("btnModalExtraR");
const modalExtraReparacion = document.getElementById("modalExtraReparacion");
const btnCerrarModalExtraX = document.getElementById("btnCerrarModalExtraX");

// Selectores del modal (Agregamos el input de fecha)
const selectExtraProductoId = document.getElementById("selectExtraProductoId");
const inputExtraFecha = document.getElementById("inputExtraFecha");
const inputExtraCantidad = document.getElementById("inputExtraCantidad");

// Tabla interna y botón de guardado
const btnAgregarRepuestoLista = document.getElementById(
  "btnAgregarRepuestoLista",
);
const cuerpoListaExtrasTemporal = document.getElementById(
  "cuerpoListaExtrasTemporal",
);
const btnGuardarExtrasFinal = document.getElementById("btnGuardarExtrasFinal");

// Array en memoria para acumular los repuestos seleccionados
let listaRepuestosTemporal = [];

// ==========================================
// 6. RENDERIZAR Y BORRAR REPUESTOS EXTRAS
// ==========================================

const btnVerExtra = document.getElementById("btnVerExtra");
const contenedorExtra = document.getElementById("contenedorExtra");

//---------------------------------------------------------------------------
// BOTON PARA CERRAR SESION

const btnCerrarSesion = document.getElementById("btnCerrarSesion");

/*------------------------------------------------------------------------------*/

//FUNCION MONEDAS
// Esta función convierte números (ej: 8520) a texto (ej: $8.520,00)
function formatearMoneda(valor) {
  let numero = parseFloat(valor);
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(numero);
}

// ==========================================
// 3. EVENTO PRINCIPAL DEL DOCUMENTO
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  /*--------------------------------------------------------------*/
  // 1. Recuperamos el usuario de la sesión
  const datosSesion = localStorage.getItem("usuarioLogueado");
  const usuarioSesion = datosSesion ? JSON.parse(datosSesion) : null;

  // 2. Si es Admin, buscamos y ocultamos todo lo que requiera ser "Dueño"
  if (usuarioSesion && usuarioSesion.rol === "Admin") {
    // Busca todos los elementos que tengan data-rol="Dueño"
    const elementosRestringidos =
      document.querySelectorAll('[data-rol="Dueño"]');

    // Los recorre a todos juntos y les clava la clase oculto
    elementosRestringidos.forEach((elemento) =>
      elemento.classList.add("oculto"),
    );
  }

  /*--------------------------------------------------------------*/

  /*---------------------------------------------------------------*/

  // =========================================================================
  // CONTROLADOR CENTRAL: DETECTA QUÉ SE ABRE Y CIERRA TODO LO DEMÁS
  // =========================================================================

  // 1. Mapeamos qué modal le pertenece a cada uno de esos 5 botones problemáticos
  const relacionBotonesModales = {
    btnAbrirModal: "modalUsuario",
    modalProv: "modalProveedor",
    btnModalCliente: "modalCliente",
    btnModalProd: "modalNuevoProd",
    btnModalReparacion: "seccionFacturaReparacion",
  };

  const botonesMenu = [
    "btnAbrirModal",
    "btnVerUsuarios",
    "modalProv",
    "btnVerProveedor",
    "btnModalCliente",
    "btnVerClientes",
    "btnModalProd",
    "btnVerProd",
    "btnModalReparacion",
    "btnVerRepa",
    "btnFacR",
    "btnModalVentas",
    "btnVerVenta",
    "btnFacV",
    "btnModalExtraR",
    "btnVerExtra",
  ];

  document.addEventListener("click", (e) => {
    const botonId = e.target.id;

    // Si el usuario presionó uno de los botones del menú...
    if (botonesMenu.includes(botonId)) {
      // Averiguamos si el botón que se tocó es uno de los que abre un modal
      const modalAAbrirId = relacionBotonesModales[botonId] || null;

      // --- PASO A: CERRAR TODOS LOS MODALES (MENOS EL QUE SE VA A ABRIR) ---
      const modales = [
        "modalUsuario",
        "modalEditarUsuario",
        "modalProveedor",
        "modalEditarProv",
        "modalCliente",
        "modalEditarCliente",
        "modalNuevoProd",
        "modalEditarProd",
        "seccionFacturaReparacion",
        "modalEditarRepa",
        "seccionFacturaVenta",
        "modalEditarVenta",
        "modalExtraReparacion",
        "seccionFacturaRepa",
        "seccionFacturaVentas",
      ];

      modales.forEach((idModal) => {
        const modal = document.getElementById(idModal);
        if (modal) {
          // Si NO es el que queremos abrir, lo ocultamos
          if (idModal !== modalAAbrirId) {
            modal.classList.add("oculto");
          } else {
            // Si ES el que queremos abrir, quitamos la clase oculto
            modal.classList.remove("oculto");
          }
        }
      });

      // --- PASO B: LIMPIAR TODAS LAS TABLAS EN PANTALLA ---
      const contenedoresTablas = [
        "contenedorUsuarios",
        "contenedorProveedores",
        "contenedorClientes",
        "contenedorProductos",
        "contenedorRepa",
        "contenedorFRepa",
        "contenedorVentas",
        "contenedorFactV",
        "contenedorExtra",
      ];

      contenedoresTablas.forEach((idContenedor) => {
        const contenedor = document.getElementById(idContenedor);
        if (contenedor) {
          contenedor.innerHTML = "";
        }
      });

      // C. DISPARAR LA CARGA SI ES EL BOTÓN DE FACTURA
      // ... dentro de tu controlador central ...
      if (botonId === "btnFacR") {
        // 1. Quitamos la clase 'oculto' a la sección de factura
        const seccion = document.getElementById("seccionFacturaRepa");
        if (seccion) seccion.classList.remove("oculto");

        // 2. Disparamos la función que carga los datos
        obtenerFacturaReparaciones();
      } else if (botonId === "btnFacV") {
        const seccion = document.getElementById("seccionFacturaVentas");
        if (seccion) seccion.classList.remove("oculto");
        window.obtenerFacturaVentas();
      }
    }
  });

  /*--------------------------------------------------------------*/

  //         --- EVENTOS ---

  //--------------------------------------------

  //          --- USUARIOS ---

  // Eventos de clics para el modal AGREGAR USER
  btnAbrirModal.addEventListener("click", abrirModal);
  btnCerrarModal.addEventListener("click", cerrarModal);

  // Cerrar al hacer clic en el fondo oscuro
  modalUsuario.addEventListener("click", (e) => {
    if (e.target === modalUsuario) {
      cerrarModal();
    }
  });

  // Evento de teclado (Tecla ESC) AGREGAR USER
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalUsuario.classList.contains("oculto")) {
      cerrarModal();
    }
  });

  // Evento de envío del formulario AGREGAR USER
  formUsuario.addEventListener("submit", guardarUsuario);

  // Evento para el botón de "Ver usuarios"
  btnVerUsuarios.addEventListener("click", obtenerUsuarios);

  // EVENTOS PARA EL SECTOR EDITAR DE USUARIOS

  // Cierre exclusivo al tocar la "X" de edición
  btnCerrarEditar.addEventListener("click", cerrarModalEditar);

  // Cierre exclusivo al hacer clic en el fondo oscuro de este modal
  modalEditarUsuario.addEventListener("click", function (e) {
    if (e.target === modalEditarUsuario) {
      cerrarModalEditar();
    }
  });

  // Cierre con la tecla ESC (solo si el modal de edición está visible)
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      !modalEditarUsuario.classList.contains("oculto")
    ) {
      cerrarModalEditar();
    }
  });

  // Detectar clic en el botón "Editar" dentro de la tabla
  contenedorUsuarios.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-editar")) {
      const id = e.target.getAttribute("data-id");
      const name = e.target.getAttribute("data-name");
      const rol = e.target.getAttribute("data-rol");
      prepararEdicion(id, name, rol);
    }
  });

  // Escuchar el envío del formulario de edición
  formEditarUsuario.addEventListener("submit", actualizarUsuario);

  // EVENTO PARA ENVIAR UN USUARIO A PAPELERA

  // Detectar clics dentro de la tabla de usuarios (Editar o Borrar)
  contenedorUsuarios.addEventListener("click", function (e) {
    // Acción para Editar (Esta ya la tenías)
    if (e.target.classList.contains("btn-editar")) {
      const id = e.target.getAttribute("data-id");
      const name = e.target.getAttribute("data-name");
      const rol = e.target.getAttribute("data-rol");
      prepararEdicion(id, name, rol);
    }

    // 👇 ¡ESTO ES LO NUEVO! Acción para mandar a Papelera 👇
    else if (e.target.classList.contains("btn-borrar")) {
      const id = e.target.getAttribute("data-id");
      enviarAPapelera(id);
    }
  });

  //--------------------------------------------------------

  // EVENTO PARA CERRAR SESION

  btnCerrarSesion.addEventListener("click", cerrarSesion);

  //-------------------------------------------------------------------------------------------------------

  //          --- PROVEEDORES ---

  // Eventos de clics para el modal AGREGAR PROVEEDOR
  modalProv.addEventListener("click", abrirModalProv);
  CerrarModalProv.addEventListener("click", cerrarModalProv);

  // Cerrar al hacer clic en el fondo oscuro
  modalProveedor.addEventListener("click", (e) => {
    if (e.target === modalProveedor) {
      cerrarModalProv();
    }
  });

  // Evento de teclado (Tecla ESC) AGREGAR PROVEEDOR
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalProveedor.classList.contains("oculto")) {
      cerrarModalProv();
    }
  });

  // Evento de envío del formulario AGREGAR PRVOEEDOR
  formProveedor.addEventListener("submit", guardarProveedor);

  // Evento para el botón de "Ver PROVEEDORES"
  btnVerProveedor.addEventListener("click", obtenerProveedores);

  // EVENTO PARA EDITAR LOS PROVEEDORES

  // 1. Escuchar el clic en el botón "Editar" de la tabla para ABRIR el modal (Tu código)
  contenedorProveedores.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-editar-prov")) {
      const id = e.target.getAttribute("data-id");
      const name = e.target.getAttribute("data-name");
      const telf = e.target.getAttribute("data-telf");
      const dire = e.target.getAttribute("data-direccion");

      editProvId.value = id;
      editProvName.value = name;
      editNumero.value = telf;
      editDire.value = dire;

      modalEditarProv.classList.remove("oculto");
    }

    // 👇 === [NUEVO] Acción para enviar PROVEEDOR a la Papelera === 👇
    else if (e.target.classList.contains("btn-borrar-prov")) {
      const id = e.target.getAttribute("data-id");

      // Un cartelito de confirmación por las dudas antes de mandarlo
      if (
        confirm(
          "¿Estás seguro de que querés enviar este proveedor a la papelera?",
        )
      ) {
        enviarProveedorAPapelera(id);
      }
    }
  });

  // 2. Cerrar el modal desde la 'X' (Tu código)
  btnCerrarE_Prov.addEventListener("click", function () {
    modalEditarProv.classList.add("oculto");
  });

  // 👇 === [NUEVO] CERRAR EL MODAL CON LA TECLA ESCAPE === 👇
  document.addEventListener("keydown", function (e) {
    // Verificamos si la tecla es Escape y si el modal NO está oculto
    if (e.key === "Escape" && !modalEditarProv.classList.contains("oculto")) {
      modalEditarProv.classList.add("oculto");
    }
  });

  // 3. Escuchar el submit del formulario para procesar el GUARDADO
  formEditarProv.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que la página se recargue

    const id = editProvId.value;

    // Metele este console.log temporal acá para espiar qué tiene adentro:
    console.log("El ID que se va a enviar es:", id);

    // Armamos el objeto con los datos limpios de los inputs
    const datos = {
      nombre_Completo: editProvName.value,
      telefono: editNumero.value,
      direccion: editDire.value,
    };

    // LLAMAMOS a la función de acción global que está en la Sección 2
    actualizarProveedor(id, datos);
  });

  //-------------------------------------------------------------------------------------------------------

  //          --- CLIENTES ---

  // Eventos de clics para el modal AGREGAR PROVEEDOR
  btnModalCliente.addEventListener("click", abrirModalCliente);
  CerrarModalCliente.addEventListener("click", cerrarModalCliente);

  // Cerrar al hacer clic en el fondo oscuro
  modalCliente.addEventListener("click", (e) => {
    if (e.target === modalCliente) {
      cerrarModalCliente();
    }
  });

  // Evento de teclado (Tecla ESC) AGREGAR CLIENTES
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalCliente.classList.contains("oculto")) {
      cerrarModalCliente();
    }
  });

  // Evento de envío del formulario AGREGAR CLIENTES
  formCliente.addEventListener("submit", guardarCliente);

  // Evento para el botón de "Ver CLIENTES"
  btnVerClientes.addEventListener("click", obtenerClientes);

  // EVENTO PARA EDITAR LOS CLIENTES

  // 1. Escuchar el clic en el botón "Editar" de la tabla para ABRIR el modal (Tu código)
  contenedorClientes.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-editar-cliente")) {
      const id = e.target.getAttribute("data-id");
      const nombreCli = e.target.getAttribute("data-name");
      const numeroTel = e.target.getAttribute("data-telf");

      editCli_Id.value = id;
      editCli_Name.value = nombreCli;
      edit_tel.value = numeroTel;

      modalEditarCliente.classList.remove("oculto");
    }

    // 👇 === [NUEVO] Acción para enviar PROVEEDOR a la Papelera === 👇
    else if (e.target.classList.contains("btn-borrar-cliente")) {
      const id = e.target.getAttribute("data-id");

      // Un cartelito de confirmación por las dudas antes de mandarlo
      if (
        confirm(
          "¿Estás seguro de que querés enviar este cliente a la papelera?",
        )
      ) {
        enviarClienteAPapelera(id);
      }
    }
  });

  // 2. Cerrar el modal desde la 'X' (Tu código)
  cerrarECliente.addEventListener("click", function () {
    modalEditarCliente.classList.add("oculto");
  });

  // 👇 === [NUEVO] CERRAR EL MODAL CON LA TECLA ESCAPE === 👇
  document.addEventListener("keydown", function (e) {
    // Verificamos si la tecla es Escape y si el modal NO está oculto
    if (
      e.key === "Escape" &&
      !modalEditarCliente.classList.contains("oculto")
    ) {
      modalEditarCliente.classList.add("oculto");
    }
  });

  // 3. Escuchar el submit del formulario para procesar el GUARDADO
  formEditarCliente.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que la página se recargue

    const id = editCli_Id.value;

    // Metele este console.log temporal acá para espiar qué tiene adentro:
    console.log("El ID que se va a enviar es:", id);

    // Armamos el objeto con los datos limpios de los inputs
    const datos = {
      cliente_Name: editCli_Name.value,
      numero_Telef: edit_tel.value,
    };

    // LLAMAMOS a la función de acción global que está en la Sección 2
    actualizarCliente(id, datos);
  });

  //-------------------------------------------------------------------------------------------------------

  //          --- PRODUCTOS ---

  // ABRIR MODAL: Al hacer clic en "Agregar Nuevo Producto"
  btnModalProd.addEventListener("click", function () {
    cargarSelectProveedores(); // Carga los proveedores actualizados antes de mostrar el modal
    modalNuevoProd.classList.remove("oculto");
  });

  // CERRAR MODAL: Desde la 'X'
  btnCerrarN_Prod.addEventListener("click", function () {
    modalNuevoProd.classList.add("oculto");
  });

  // CERRAR MODAL: Con la tecla Escape (ESC)
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modalNuevoProd.classList.contains("oculto")) {
      modalNuevoProd.classList.add("oculto");
    }
  });

  // SUBMIT FORMULARIO: Guardar el producto
  formNuevoProd.addEventListener("submit", function (e) {
    e.preventDefault(); // Evitamos recarga de página

    // Armamos el JSON limpiecito para mandar al backend
    const datosProducto = {
      fecha: prodFecha.value,
      tipo_Prod: prodTipo.value,
      producto_Name: prodName.value,
      cantidad_Prod: parseInt(prodCantidad.value), // Convertimos a entero (int4)
      costo_Prod: parseFloat(prodCosto.value), // Convertimos a número decimal (numeric)
      prov_ID: prodProveedor.value, // Captura el ID del proveedor seleccionado
    };

    guardarNuevoProducto(datosProducto);
  });

  // Evento para el botón de "Ver Productos"
  btnVerProd.addEventListener("click", obtenerProductos);

  // 🌟 CAPTURAR EL CLICK EN EL BOTÓN "EDITAR" DE LA TABLA DINÁMICA
  // Como la tabla se crea dinámicamente, escuchamos los clics en el contenedor de productos

  // 🌟 CAPTURAR EL CLICK EN EL BOTÓN "EDITAR" PRODUCTOS CORREGIDO
  contenedorProductos.addEventListener("click", async function (e) {
    if (e.target.classList.contains("btn-editar-prod")) {
      const boton = e.target;

      // 1. Extraemos los atributos
      const id = boton.getAttribute("data-id");
      const fecha = boton.getAttribute("data-fecha");
      const provId = boton.getAttribute("data-prov_id"); // Asegurate que tenga el guion bajo
      const tipo = boton.getAttribute("data-tipo");
      const name = boton.getAttribute("data-name");
      const cantidad = boton.getAttribute("data-cantidad");
      const costo = boton.getAttribute("data-costo");

      // 2. Volcamos los inputs comunes primero
      editProdId.value = id;
      editProdFecha.value = fecha;
      editProdTipo.value = tipo;
      editProdName.value = name;
      editProdCantidad.value = cantidad;
      editProdCosto.value = costo;

      // 3. 🌟 LLAMAMOS A LA FUNCIÓN PASÁNDOLE EL ID DEL PROVEEDOR
      // Esto asegura que cuando el modal se abra, el proveedor ya esté pintado e impreso en pantalla
      await cargarProveedoresEdicion(provId);

      // 4. Mostramos el modal
      modalEditarProd.classList.remove("oculto");
    }

    // Verificamos si el usuario hizo click en el botón borrar producto
    if (e.target.classList.contains("btn-borrar-prod")) {
      const boton = e.target;
      const id = boton.getAttribute("data-id");

      // Metemos un cartel de confirmación por seguridad antes de mandarlo a la papelera
      const confirmar = confirm(
        "⚠ ¿Estás segura de enviar este producto a la papelera?",
      );

      if (confirmar) {
        borrarProductoLogico(id);
      }
    }
  });

  // CERRAR MODAL EDITAR: Desde la 'X'
  btnCerrarE_Prod.addEventListener("click", function () {
    modalEditarProd.classList.add("oculto");
  });

  // CERRAR MODAL EDITAR: Con la tecla Escape (ESC)
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modalEditarProd.classList.contains("oculto")) {
      modalEditarProd.classList.add("oculto");
    }
  });

  // SUBMIT DEL FORMULARIO: Al hacer clic en "Actualizar Producto"
  formEditarProd.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = editProdId.value; // Agarramos el ID del input oculto

    // Armamos el objeto con las modificaciones del formulario
    const datosModificados = {
      fecha: editProdFecha.value,
      tipo_Prod: editProdTipo.value,
      producto_Name: editProdName.value,
      cantidad_Prod: parseInt(editProdCantidad.value),
      costo_Prod: parseFloat(editProdCosto.value),
      prov_ID: editProdProveedor.value,
    };

    // Ejecutamos la función para enviarlo al backend
    actualizarProducto(id, datosModificados);
  });

  //-------------------------------------------------------------------------------------------------------

  //          --- REPARACIONES  ---

  // AL PRESIONAR "Agregar Nueva Reparación": Imprime la factura en pantalla
  btnModalReparacion.addEventListener("click", function () {
    cargarSelectClientesRepa(); // Carga los clientes actualizados
    seccionFacturaReparacion.classList.remove("oculto"); // Muestra la factura
    seccionFacturaReparacion.scrollIntoView({ behavior: "smooth" }); // Hace un scroll suave hacia la factura
  });

  // BOTÓN CANCELAR: Cierra y limpia la factura
  btnCancelarReparacion.addEventListener("click", function () {
    formNuevaReparacion.reset();
    seccionFacturaReparacion.classList.add("oculto");
  });

  // SUBMIT: Cargar Registro
  formNuevaReparacion.addEventListener("submit", function (e) {
    e.preventDefault();

    // Estructuramos el JSON limpio que espera tu backend modificado
    const datosReparacion = {
      fecha_Repa: repaFecha.value,
      tipo_Repa: repaTipo.value, // Captura lo elegido o lo escrito a mano
      ID_cli: parseInt(repaCliente.value), // Enviamos la FK como número entero
      bici_User: repaBici.value,
      costo_Cobrado: parseFloat(repaCosto.value),
      estadoPago: repaEstadoPago.value, // "Pendiente" o "Pagado"
    };

    guardarNuevaReparacion(datosReparacion);
  });

  // Evento para el botón de "Ver Reparaciones"
  btnVerRepa.addEventListener("click", obtenerReparaciones);

  //---------------------------//

  // Función para cargar los tipos ÚNICOS al select
  async function cargarTiposEnSelect() {
    try {
      const respuesta = await fetch(
        "/api/reparaciones/listaReparaciones",
      );
      const reparaciones = await respuesta.json();

      // Obtenemos una lista de tipos únicos
      const tiposUnicos = [...new Set(reparaciones.map((r) => r.tipo_Repa))];

      const select = document.getElementById("editRepaTipo");
      select.innerHTML =
        '<option value="" disabled>-- Seleccionar Tipo --</option>';

      tiposUnicos.forEach((tipo) => {
        const option = document.createElement("option");
        option.value = tipo;
        option.textContent = tipo;
        select.appendChild(option);
      });
    } catch (error) {
      console.error("Error al cargar tipos:", error);
    }
  }
  // EDITAR REPARACIONES

  // 🌟 CAPTURAR EL CLICK EN EL BOTÓN "EDITAR"
  contenedorRepa.addEventListener("click", async function (e) {
    if (e.target.classList.contains("btn-editar-repa")) {
      const boton = e.target;

      // 1. Extraemos los valores del botón
      const id = boton.getAttribute("data-id");
      const fecha = boton.getAttribute("data-fecha");
      const idCli = boton.getAttribute("data-id_cli");
      const tipo = boton.getAttribute("data-tipo");
      const bici = boton.getAttribute("data-bici");
      const costo = boton.getAttribute("data-costo");
      const pago = boton.getAttribute("data-pago");

      // 2. Cargamos los clientes primero (para que el select de clientes se llene)
      await cargarClientesEdicionRepa(idCli);

      // 1. Cargamos las opciones dinámicas primero
      await cargarTiposEnSelect();

      // 3. Asignamos los valores a los inputs
      editRepaId.value = id;
      editRepaFecha.value = fecha;
      editRepaBici.value = bici;
      editRepaCosto.value = costo;
      editRepaEstadoPago.value = pago;

      // 4. CORRECCIÓN PARA EL SELECT DE TIPO
      // Usamos el ID que tú ya tienes en tu HTML
      const editRepaTipo = document.getElementById("editRepaTipo");

      // Asignamos el valor
      editRepaTipo.value = tipo;

      // 5. Desbloqueamos el modal visualmente
      modalEditarRepa.classList.remove("oculto");
    }
  });

  // CERRAR MODAL: Click en la 'X'
  btnCerrarE_Repa.addEventListener("click", function () {
    modalEditarRepa.classList.add("oculto");
  });

  // CERRAR MODAL: Presionando la tecla ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modalEditarRepa.classList.contains("oculto")) {
      modalEditarRepa.classList.add("oculto");
    }
  });

  // SUBMIT DEL FORMULARIO DE EDICIÓN: Al presionar "Guardar Cambios"
  formEditarRepa.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = editRepaId.value; // ID de la reparación oculta

    // Armamos el JSON con los datos actuales del modal.
    // Lo que el usuario no tocó, viaja con su valor original rellenado de entrada.
    const datosModificados = {
      fecha_Repa: editRepaFecha.value,
      tipo_Repa: editRepaTipo.value,
      bici_User: editRepaBici.value,
      costo_Cobrado: parseFloat(editRepaCosto.value),
      estadoPago: editRepaEstadoPago.value,
      ID_cli: editRepaCliente.value, // Envía el ID del cliente que quedó seleccionado
    };

    // Ejecutamos la llamada a la API
    actualizarReparacion(id, datosModificados);
  });

  // 🌟 CAPTURAR EL CLICK EN EL BOTÓN "BORRAR" DE LA TABLA DE REPARACIONES
  contenedorRepa.addEventListener("click", function (e) {
    // Verificamos si el usuario hizo click en el botón borrar reparación
    if (e.target.classList.contains("btn-borrar-repa")) {
      const boton = e.target;
      const id = boton.getAttribute("data-id"); // Captura el id_Repa

      // Cartel de confirmación por seguridad antes de archivar
      const confirmar = confirm(
        "⚠ ¿Estás segura de enviar este registro de reparación a la papelera?",
      );

      if (confirmar) {
        borrarReparacionLogica(id);
      }
    }
  });

  // ---------------------------------------------------------------------------------------------------------
  // ---------------- VENTAS ------

  // AL PRESIONAR "Agregar Nueva Venta": Abre e imprime el comprobante
  btnModalVentas.addEventListener("click", async function () {
    await cargarClientesVenta(); // Carga clientes vivos
    await precargarProductosVenta(); // Descarga stock actual del taller

    // Ponemos por defecto la fecha de hoy en el input para ahorrar clicks
    const hoy = new Date().toISOString().split("T")[0];
    ventaFecha.value = hoy;

    seccionFacturaVenta.classList.remove("oculto"); // Muestra la factura
    seccionFacturaVenta.scrollIntoView({ behavior: "smooth" });
  });

  // 🌟 DETECTOR DE CAMBIO DE CATEGORÍA: Activa el filtro al elegir "Bicicletas" o "Accesorios"
  ventaTipoCompra.addEventListener("change", function () {
    const categoria = ventaTipoCompra.value;
    filtrarProductosPorCategoria(categoria);
  });

  // BOTÓN CANCELAR: Cierra la factura sin guardar
  btnCancelarVenta.addEventListener("click", function () {
    formNuevaVenta.reset();
    seccionFacturaVenta.classList.add("oculto");
  });

  // SUBMIT DE LA FACTURA: Al presionar "Guardar Venta"
  formNuevaVenta.addEventListener("submit", function (e) {
    e.preventDefault();

    // Armamos el payload con los tipos de datos exactos que tu base de datos necesita
    const datosVenta = {
      fecha_Venta: ventaFecha.value,
      tipo_Compra: ventaTipoCompra.value,
      cantidad: parseInt(ventaCantidad.value),
      total_Comprado: parseFloat(ventaTotal.value),
      estado_Pago: ventaEstadoPago.value, // "Pendiente" o "Pagada"
      cliente_ID: parseInt(ventaCliente.value), // FK cliente
      produ_ID: parseInt(ventaProducto.value), // FK producto
    };

    guardarNuevaVenta(datosVenta);
  });

  // Escuchador para el botón "👁️ Ver Ventas"
  btnVerVenta.addEventListener("click", function () {
    obtenerVentas();
  });

  // 1. CAPTURAR CLICK EN BOTÓN EDITAR DE LA TABLA
  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("btn-editar-venta")) {
      const btn = e.target;
      const fila = btn.closest("tr"); // Buscamos la fila para sacar los nombres impresos

      // Recuperamos los datasets del botón
      const id = btn.dataset.id;
      const fecha = btn.dataset.fecha;
      const productoId = btn.dataset.producto_id;
      const cantidad = btn.dataset.cantidad;
      const total = btn.dataset.total;
      const estadoPago = btn.dataset.estado_pago;

      cantidadOriginalVenta = parseInt(cantidad);

      // Cargamos los datos en los inputs ocultos y editables
      editVentaId.value = id;
      editVentaProductoId.value = productoId; // Mantenemos la FK del producto para el backend
      editVentaFecha.value = fecha;
      editVentaCantidad.value = cantidad;
      editVentaTotal.value = total;
      editVentaEstadoPago.value = estadoPago;

      // 🌟 IMPRIMIMOS los nombres directo de lo que ve el usuario en la tabla
      // Fila celdas: 0=N° Venta, 1=Fecha, 2=Cliente, 3=Categoría, 4=Producto...
      textVentaCliente.textContent = fila.cells[2].textContent;
      textVentaProducto.textContent = fila.cells[4].textContent;

      // Abrimos el modal sin dar vueltas con llamadas asíncronas
      modalEditarVenta.classList.remove("oculto");
    }
  });

  // 2. SUBMIT PARA GUARDAR CAMBIOS (Mantiene tu lógica de stock inteligente)
  formEditarVenta.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nuevaCantidad = parseInt(editVentaCantidad.value);

    // VALIDACIÓN DE CERO O MENOS
    if (nuevaCantidad <= 0) {
      mostrarMensaje(
        "⚠ Error: La cantidad vendida no puede ser 0 ni un número negativo.",
      );
      return;
    }

    const idVenta = editVentaId.value;

    // Armamos el payload respetando lo que tu backend necesita
    const datosModificados = {
      fecha_Venta: editVentaFecha.value,
      cantidad: nuevaCantidad,
      cantidad_Vieja: cantidadOriginalVenta, // Para recalcular stock
      total_Comprado: parseFloat(editVentaTotal.value),
      estado_Pago: editVentaEstadoPago.value,
      produ_ID: parseInt(editVentaProductoId.value), // Enviamos el ID del producto fijo
    };

    try {
      const respuesta = await fetch(
        `/api/ventas/editarVenta/${idVenta}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datosModificados),
        },
      );

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        mostrarMensaje(resultado.mensaje);
        cerrarModalVentaFunc();
        obtenerVentas(); // Recarga la tabla de ventas
      } else {
        mostrarMensaje(`Error: ${resultado.error}`);
      }
    } catch (error) {
      console.error("Error al editar venta:", error);
      mostrarMensaje("Error de conexión con el servidor.");
    }
  });

  // BOTON PARA BORRRAR LOGICAMENTE LAS VENTAS

  // 1. EL DETECTOR DE CLICKS (Delegación de eventos que llama a tu función)
  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("btn-borrar-venta")) {
      const idVenta = e.target.dataset.id;
      ejecutarBorradoLogicoVenta(idVenta); // Llamamos a la función dedicada
    }
  });

  //---------------------------------------------------------------------------
  // ------------------------- INFO EXTRA --------

  // 1. CAPTURAR EL CLICK DIRECTO DESDE LA FILA DE LA TABLA

  if (btnModalExtraR) {
    btnModalExtraR.addEventListener("click", async function () {
      listaRepuestosTemporal = [];
      cuerpoListaExtrasTemporal.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#888; padding:10px;">No hay repuestos en la lista</td></tr>`;

      // Pone automáticamente la fecha de hoy en el input (formato YYYY-MM-DD)
      const hoy = new Date().toISOString().split("T")[0];
      inputExtraFecha.value = hoy;

      await cargarRepuestosEnSelect();
      modalExtraReparacion.classList.remove("oculto");
    });
  }

  // Escuchamos el click del botón "👁️ Ver"
  if (btnVerExtra) {
    btnVerExtra.addEventListener("click", function () {
      // Si la tabla ya se está mostrando, la ocultamos al hacer click de nuevo (tipo toggle)
      if (
        !contenedorExtra.classList.contains("oculto") &&
        contenedorExtra.innerHTML !== ""
      ) {
        contenedorExtra.classList.add("oculto");
      } else {
        contenedorExtra.classList.remove("oculto");
        obtenerYDibujarExtras();
      }
    });
  }
});

/*----------------------------------------------------------------------------*/
// ==========================================
// 2. FUNCIONES GLOBALES DE ACCIÓN
// ==========================================

//          --- USUARIOS ---

// ABRIR MODAL PARA AGREGAR USER
function abrirModal() {
  modalUsuario.classList.remove("oculto");
  inputName.focus();
}

//CERRAR MODAL PARA AGREGAR USER
function cerrarModal() {
  modalUsuario.classList.add("oculto");
  formUsuario.reset();
}

// GUARDAR INFORMACION INSERTADA EN EL FORMULARIO (G. USER)
async function guardarUsuario(e) {
  e.preventDefault(); // Evita que la página se recargue

  const usuarioData = {
    user_Name: inputName.value,
    password: inputPassword.value,
    rol: selectRol.value,
  };

  try {
    const respuesta = await fetch(
      "/api/usuarios/registroUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioData),
      },
    );

    const resultado = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje("¡Usuario guardado con éxito!");
      cerrarModal();
    } else {
      mostrarMensaje(`Error: ${resultado.error}`);
    }
  } catch (error) {
    console.error("Error en la conexión:", error);
    mostrarMensaje("No se pudo conectar con el servidor.");
  }
}

// FUNCION PARA VER LA TABLA USUARIOS

async function obtenerUsuarios() {
  try {
    const respuesta = await fetch(
      "/api/usuarios/listaUsuarios",
    );
    const usuarios = await respuesta.json();

    // --- ESTO ES LO QUE TENÉS QUE AGREGAR ACÁ ---
    if (respuesta.ok && Array.isArray(usuarios)) {
      usuarios.sort((a, b) => {
        const nomA = (a.user_Name || "").toLowerCase();
        const nomB = (b.user_Name || "").toLowerCase();
        return nomA.localeCompare(nomB);
      });
    }
    // --------------------------------------------

    if (respuesta.ok) {
      // Limpiamos el contenedor siempre antes de pintar
      contenedorUsuarios.innerHTML = "";

      // 1. VALIDACIÓN PROFESIONAL: Si la tabla no tiene registros
      if (usuarios.length === 0) {
        contenedorUsuarios.innerHTML = `
                    <div class="mensaje-vacio">
                        <p>⚠️ <strong>Sin Registros:</strong> No se encontraron usuarios activos en el sistema.</p>
                    </div>
                `;
        return; // Cortamos acá para que no dibuje la tabla vacía
      }

      // 2. SI HAY REGISTROS: Dibujamos la estructura de la tabla con los títulos
      const tabla = document.createElement("table");
      tabla.innerHTML = `
                <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>ROL</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody id="cuerpoTablaUsuarios"></tbody>
            `;
      contenedorUsuarios.appendChild(tabla);

      // 3. LLENAMOS LAS FILAS DE LA TABLA
      const cuerpoTabla = document.getElementById("cuerpoTablaUsuarios");

      usuarios.forEach(function (usuario) {
        const fila = document.createElement("tr");
        fila.innerHTML = `
                    <td>${usuario.user_Name}</td>
                    <td>${usuario.rol}</td>
                    <td>
<button class="btn-editar" 
                    data-id="${usuario.id_Usuario}" 
                    data-name="${usuario.user_Name}" 
                    data-rol="${usuario.rol}">
                Editar
            </button>                        
            <button class="btn-borrar" data-id="${usuario.id_Usuario}">Borrar</button>
                    </td>
                `;
        cuerpoTabla.appendChild(fila);
      });
    } else {
      console.error("Error al obtener usuarios:", usuarios.error);
    }
  } catch (error) {
    console.error("Error en la conexión al listar:", error);
  }
}

// FUNCION PARA EL SECTOR EDITAR USUARIOS

// Función de cierre única y exclusiva para este modal
function cerrarModalEditar() {
  modalEditarUsuario.classList.add("oculto");
  formEditarUsuario.reset();
}

// Abre edición, precarga datos y calcula el rol inverso
function prepararEdicion(id, name, rolActual) {
  editUserId.value = id;
  editUserName.value = name;
  editPassword.value = ""; // Vacío por seguridad

  const opcionContraria = rolActual === "Admin" ? "Dueño" : "Admin";

  editRol.innerHTML = `
        <option value="${rolActual}">${rolActual} (Actual)</option>
        <option value="${opcionContraria}">${opcionContraria}</option>
    `;

  modalEditarUsuario.classList.remove("oculto");
  editUserName.focus();
}

// Envía la actualización vía PUT al servidor
async function actualizarUsuario(e) {
  e.preventDefault();

  const id = editUserId.value;
  const usuarioData = {
    user_Name: editUserName.value,
    password: editPassword.value,
    rol: editRol.value,
  };

  try {
    const respuesta = await fetch(
      `/api/usuarios/editarUser/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioData),
      },
    );

    if (respuesta.ok) {
      mostrarMensaje("¡Usuario actualizado con éxito!");
      cerrarModalEditar();
      obtenerUsuarios(); // Refresca la tabla
    } else {
      const resultado = await respuesta.json();
      mostrarMensaje(`Error: ${resultado.error}`);
    }
  } catch (error) {
    mostrarMensaje("Error al conectar con el servidor.");
  }
}

// FUNCION PARA ENVIAR A PAPELERA EL REGISTRO USUARIOS

// FUNCIÓN: Envía el usuario a la papelera (Borrado Lógico)
async function enviarAPapelera(id) {
  const confirmar = confirm(
    "¿Estás segura de enviar este usuario a la papelera?",
  );
  if (!confirmar) return; // Si cancela, frena acá

  try {
    const respuesta = await fetch(
      `/api/usuarios/papeleraUser/${id}`,
      {
        method: "PUT", // Usamos PUT porque modifica el campo 'estado'
      },
    );

    const resultado = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje(resultado.mensaje);
      obtenerUsuarios(); // Refresca tu tabla principal para que desaparezca de la lista activa
    } else {
      mostrarMensaje(`Error: ${resultado.error}`);
    }
  } catch (error) {
    mostrarMensaje("Error al conectar con el servidor.");
  }
}

//-----------------------------------------------------------------
// FUNCION PARA CERRAR SESION

function cerrarSesion() {
  // Eliminamos el registro del usuario guardado en el navegador
  localStorage.removeItem("usuarioLogueado");

  // Lo redirigimos al login inmediatamente
  window.location.href = "login.html";
}

//-----------------------------------------------------------------

//          --- PROVEEDORES ---

// ABRIR MODAL PARA AGREGAR PROVEEDOR
function abrirModalProv() {
  modalProveedor.classList.remove("oculto");
  nameProv.focus();
}

//CERRAR MODAL PARA AGREGAR PROVEEDOR
function cerrarModalProv() {
  modalProveedor.classList.add("oculto");
  formProveedor.reset();
}

// GUARDAR INFORMACION INSERTADA EN EL FORMULARIO (G. PROVEEDOR)
async function guardarProveedor(e) {
  e.preventDefault(); // Evita que la página se recargue

  const proveedorData = {
    nombre_Completo: nameProv.value,
    telefono: numeroProv.value,
    direccion: direccionProv.value,
  };

  try {
    const respuesta = await fetch(
      "/api/proveedores/registroProveedor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proveedorData),
      },
    );

    const resultado = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje("Proveedor guardado con éxito!");
      cerrarModalProv();
    } else {
      mostrarMensaje(`Error: ${resultado.error}`);
    }
  } catch (error) {
    console.error("Error en la conexión:", error);
    mostrarMensaje("No se pudo conectar con el servidor.");
  }
}

// FUNCION PARA VER LA TABLA PROVEEDORES

async function obtenerProveedores() {
  try {
    const respuesta = await fetch(
      "/api/proveedores/listaProveedores",
    );
    const proveedores = await respuesta.json();

    // --- ESTO ES LO QUE TENÉS QUE AGREGAR ACÁ MISMO ---
if (respuesta.ok && Array.isArray(proveedores)) {
    proveedores.sort((a, b) => {
        // Obtenemos los nombres, si alguno es null usamos cadena vacía
        const nombreA = (a.nombre_Completo || "").toLowerCase();
        const nombreB = (b.nombre_Completo || "").toLowerCase();
        return nombreA.localeCompare(nombreB);
    });
}
// ----------------------------------------------------

    console.log("ESTO TRAE SUPABASE:", proveedores); // 👈 METE ESTO ACÁ

    if (respuesta.ok) {
      // Limpiamos el contenedor siempre antes de pintar
      contenedorProveedores.innerHTML = "";

      // 1. VALIDACIÓN PROFESIONAL: Si la tabla no tiene registros
      if (proveedores.length === 0) {
        contenedorProveedores.innerHTML = `
                    <div class="mensaje-vacio">
                        <p>⚠️ <strong>Sin Registros:</strong> No se encontraron proveedores activos en el sistema.</p>
                    </div>
                `;
        return; // Cortamos acá para que no dibuje la tabla vacía
      }

      // 2. SI HAY REGISTROS: Dibujamos la estructura de la tabla con los títulos
      const tablaProveedor = document.createElement("table");
      tablaProveedor.innerHTML = `
                <thead>
                    <tr>
                        <th>NOMBRE COMPLETO</th>
                        <th>TELÉFONO</th>
                        <th>DIRECCIÓN</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody id="cuerpoTablaProv"></tbody>
            `;
      contenedorProveedores.appendChild(tablaProveedor);

      // 3. LLENAMOS LAS FILAS DE LA TABLA
      const cuerpoTablaProv = document.getElementById("cuerpoTablaProv");

      // === [NUEVO] OBTENEMOS EL USUARIO LOGUEADO DESDE EL LOCALSTORAGE ===
      const datosSesion = localStorage.getItem("usuarioLogueado");
      const usuarioSesion = datosSesion ? JSON.parse(datosSesion) : null;

      proveedores.forEach(function (proveedor) {
        const filaProv = document.createElement("tr");

        // Por defecto, todos los roles (Admin y Dueño) pueden ver el botón "Editar"
        let accionesHTML = `
            <button class="btn-editar-prov" 
                    data-id="${proveedor.id_Prove}" 
                    data-name="${proveedor.nombre_Completo}" 
                    data-telf="${proveedor.telefono}"
                    data-direccion="${proveedor.direccion}">
                Editar
            </button>
        `;

        // === [NUEVO] SI EL ROL ES ESTRICTAMENTE "DUEÑO", LE SUMAMOS EL BOTÓN BORRAR ===
        if (
          (usuarioSesion && usuarioSesion.rol === "Dueño") ||
          usuarioSesion.rol === "Admin"
        ) {
          accionesHTML += `<button class="btn-borrar-prov" data-id="${proveedor.id_Prove}">Borrar</button>`;
        }

        filaProv.innerHTML = `
              <td>${proveedor.nombre_Completo}</td>
              <td>${proveedor.telefono}</td>
              <td>${proveedor.direccion}</td>
              <td>
                  ${accionesHTML}
              </td>
          `;
        cuerpoTablaProv.appendChild(filaProv);
      });
    } else {
      console.error("Error al obtener proveedor:", proveedores.error);
    }
  } catch (error) {
    console.error("Error en la conexión al listar:", error);
  }
}

// FUNCIÓN: Envía los datos modificados al servidor (LA QUE ME PEDISTE EXTRACCIÓN)
async function actualizarProveedor(id, datosActualizados) {
  try {
    const respuesta = await fetch(
      `/api/proveedores/editarProv/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosActualizados),
      },
    );

    const resultado = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje(resultado.mensaje);
      modalEditarProv.classList.add("oculto"); // Cerramos el modal
      obtenerProveedores(); // Refrescamos la tabla para ver los cambios
    } else {
      mostrarMensaje(`Error: ${resultado.error}`);
    }
  } catch (error) {
    console.error("Error al actualizar proveedor:", error);
    mostrarMensaje("Error al conectar con el servidor.");
  }
}

// ENVIAR PROVEEDOR A PAPELERA

// FUNCIÓN: Envía la petición para pasar el proveedor a estado 1 (Papelera)
async function enviarProveedorAPapelera(id) {
  try {
    const respuesta = await fetch(
      `/api/proveedores/papeleraProv/${id}`,
      {
        method: "PUT",
      },
    );

    const resultado = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje(resultado.mensaje);
      obtenerProveedores(); // Refresca la tabla para que desaparezca el proveedor borrado
    } else {
      mostrarMensaje(`Error: ${resultado.error}`);
    }
  } catch (error) {
    console.error("Error al enviar a papelera:", error);
    mostrarMensaje("Error al conectar con el servidor.");
  }
}

//-----------------------------------------------------------------

//          --- CLIENTES ---

// ABRIR MODAL PARA AGREGAR CLIENTE
function abrirModalCliente() {
  modalCliente.classList.remove("oculto");
  nameCliente.focus();
}

//CERRAR MODAL PARA AGREGAR CLIENTE
function cerrarModalCliente() {
  modalCliente.classList.add("oculto");
  formCliente.reset();
}

// GUARDAR INFORMACION INSERTADA EN EL FORMULARIO (G. CLIENTE)
async function guardarCliente(e) {
  e.preventDefault(); // Evita que la página se recargue

  const clienteData = {
    cliente_Name: nameCliente.value,
    numero_Telef: numeroCliente.value,
  };

  try {
    const respuesta = await fetch(
      "/api/clientes/registroCliente",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteData),
      },
    );

    const resultado = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje("Cliente guardado con éxito!");
      // 1. Limpiamos el formulario para que no queden los datos anteriores
      formCliente.reset();

      // 2. LLAMAMOS A LA FUNCIÓN CORRECTA PARA CERRAR ESTE MODAL
      cerrarModalCliente();
    } else {
      mostrarMensaje(`Error: ${resultado.error}`);
    }
  } catch (error) {
    console.error("Error en la conexión:", error);
    mostrarMensaje("No se pudo conectar con el servidor.");
  }
}

// FUNCION PARA VER LA TABLA CLIENTES

async function obtenerClientes() {
  try {
    const respuesta = await fetch(
      "/api/clientes/listaClientes",
    );
    const clientes = await respuesta.json();

    // --- AGREGAMOS EL ORDENAMIENTO AQUÍ ---
    if (respuesta.ok && Array.isArray(clientes)) {
      clientes.sort((a, b) => {
        const nomA = (a.cliente_Name || "").toLowerCase();
        const nomB = (b.cliente_Name || "").toLowerCase();
        return nomA.localeCompare(nomB);
      });
    }
    // --------------------------------------

    console.log("ESTO TRAE SUPABASE:", clientes); // 👈 METE ESTO ACÁ

    if (respuesta.ok) {
      // Limpiamos el contenedor siempre antes de pintar
      contenedorClientes.innerHTML = "";

      // 1. VALIDACIÓN PROFESIONAL: Si la tabla no tiene registros
      if (clientes.length === 0) {
        contenedorClientes.innerHTML = `
                    <div class="mensaje-vacio">
                        <p>⚠️ <strong>Sin Registros:</strong> No se encontraron clientes activos en el sistema.</p>
                    </div>
                `;
        return; // Cortamos acá para que no dibuje la tabla vacía
      }

      // 2. SI HAY REGISTROS: Dibujamos la estructura de la tabla con los títulos
      const tablaClientes = document.createElement("table");
      tablaClientes.innerHTML = `
                <thead>
                    <tr>
                        <th>NOMBRE COMPLETO</th>
                        <th>TELÉFONO</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody id="cuerpoTablaClientes"></tbody>
            `;
      contenedorClientes.appendChild(tablaClientes);

      // 3. LLENAMOS LAS FILAS DE LA TABLA
      const cuerpoTablaClientes = document.getElementById(
        "cuerpoTablaClientes",
      );

      // === [NUEVO] OBTENEMOS EL USUARIO LOGUEADO DESDE EL LOCALSTORAGE ===
      const datosSesion = localStorage.getItem("usuarioLogueado");
      const usuarioSesion = datosSesion ? JSON.parse(datosSesion) : null;

      clientes.forEach(function (cliente) {
        const filaCliente = document.createElement("tr");

        // Armamos el HTML de las acciones (Cerramos bien la etiqueta del botón Editar con el '>')
        let accionesHTML = `
            <button class="btn-editar-cliente" 
                    data-id="${cliente.id_Cliente}" 
                    data-name="${cliente.cliente_Name}" 
                    data-telf="${cliente.numero_Telef}">
                Editar
            </button>
        `;

        if (
          (usuarioSesion && usuarioSesion.rol === "Dueño") ||
          usuarioSesion.rol === "Admin"
        ) {
          accionesHTML += `<button class="btn-borrar-cliente" data-id="${cliente.id_Cliente}">Borrar</button>`;
        }

        // 🌟 CAMBIADO: Ahora sí usamos 'filaCliente' para meter los datos del cliente
        filaCliente.innerHTML = `
              <td>${cliente.cliente_Name}</td>
              <td>${cliente.numero_Telef}</td>
              <td>
                  ${accionesHTML}
              </td>
          `;

        // Agregamos la fila real con contenido al cuerpo de la tabla
        cuerpoTablaClientes.appendChild(filaCliente);
      });
    } else {
      console.error("Error al obtener cliente:", clientes.error);
    }
  } catch (error) {
    console.error("Error en la conexión al listar:", error);
  }
}

// FUNCIÓN: Envía los datos modificados al servidor (LA QUE ME PEDISTE EXTRACCIÓN)
async function actualizarCliente(id, datosActualizados) {
  try {
    const respuesta = await fetch(
      `/api/clientes/editarCliente/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosActualizados),
      },
    );

    const resultado = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje(resultado.mensaje);

      // --- AQUÍ ESTABA EL ERROR ---
      // Antes: modalEditarProv.classList.add("oculto");
      // Ahora:
      modalEditarCliente.classList.add("oculto");

      obtenerClientes(); // Refrescamos la tabla para ver los cambios
    } else {
      mostrarMensaje(`Error: ${resultado.error}`);
    }
  } catch (error) {
    console.error("Error al actualizar clientes:", error);
    mostrarMensaje("Error al conectar con el servidor.");
  }
}

// ENVIAR CLIENTE A PAPELERA

// FUNCIÓN: Envía la petición para pasar el proveedor a estado 1 (Papelera)
async function enviarClienteAPapelera(id) {
  try {
    const respuesta = await fetch(
      `/api/clientes/papeleraCliente/${id}`,
      {
        method: "PUT",
      },
    );

    const resultado = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje(resultado.mensaje);
      obtenerClientes(); // Refresca la tabla para que desaparezca el proveedor borrado
    } else {
      mostrarMensaje(`Error: ${resultado.error}`);
    }
  } catch (error) {
    console.error("Error al enviar a papelera:", error);
    mostrarMensaje("Error al conectar con el servidor.");
  }
}

//-----------------------------------------------------------------

//          --- PRODUCTOS ---

// FUNCIÓN: Trae los proveedores activos de la DB y llena el selector (<select>)
async function cargarSelectProveedores() {
  try {
    const respuesta = await fetch(
      "/api/proveedores/listaProveedores",
    );
    const proveedores = await respuesta.json();

    if (respuesta.ok) {
      // Limpiamos el select dejando solo la opción por defecto
      prodProveedor.innerHTML =
        '<option value="" disabled selected>-- Seleccionar Proveedor --</option>';

      // Inyectamos cada proveedor como un <option> usando su id_Prove como VALUE
      proveedores.forEach((prov) => {
        const option = document.createElement("option");
        option.value = prov.id_Prove; // 🌟 Esta es la FK que viajará al backend
        option.textContent = prov.nombre_Completo;
        prodProveedor.appendChild(option);
      });
    }
  } catch (error) {
    console.error("Error al cargar los proveedores en el select:", error);
  }
}

// FUNCIÓN: Envía los datos del nuevo producto al servidor
async function guardarNuevoProducto(datosProducto) {
  try {
    const respuesta = await fetch(
      "/api/productos/registroProductos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosProducto),
      },
    );

    const resultado = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje(resultado.mensaje);
      formNuevoProd.reset(); // Limpiamos el formulario entero
      modalNuevoProd.classList.add("oculto"); // Cerramos el modal

      // Si tenés una función para listar la tabla de productos, la llamarías acá:
      // obtenerProductos();
    } else {
      mostrarMensaje(`Error: ${resultado.error}`);
    }
  } catch (error) {
    console.error("Error al guardar producto:", error);
    mostrarMensaje("Error de conexión con el servidor.");
  }
}

// OBTENER TABLA PRODUCTO

// async function obtenerProductos() {
//     try {
//         const respuesta = await fetch("http://localhost:3000/api/productos/listaProductos");
//         const productos = await respuesta.json();

//         console.log("ESTO TRAE SUPABASE (PRODUCTOS):", productos);

//         if (respuesta.ok) {
//             // Limpiamos el contenedor siempre antes de pintar
//             contenedorProductos.innerHTML = "";

//             // 1. VALIDACIÓN: Si la tabla no tiene registros
//             if (productos.length === 0) {
//                 contenedorProductos.innerHTML = `
//                     <div class="mensaje-vacio">
//                         <p>⚠️ <strong>Sin Registros:</strong> No se encontraron productos activos en el sistema.</p>
//                     </div>
//                 `;
//                 return;
//             }

//             // 2. SI HAY REGISTROS: Dibujamos la estructura de la tabla con todos los títulos
//             const tablaProductos = document.createElement("table");
//             tablaProductos.innerHTML = `
//                 <thead>
//                     <tr>
//                         <th>Fecha</th>
//                         <th>Proveedor</th>
//                         <th>Tipo</th>
//                         <th>Producto</th>
//                         <th>Cantidad</th>
//                         <th>Costo Total</th>
//                         <th>Acciones</th>
//                     </tr>
//                 </thead>
//                 <tbody id="cuerpoTablaProductos"></tbody>
//             `;
//             contenedorProductos.appendChild(tablaProductos);

//             const cuerpoTablaProductos = document.getElementById("cuerpoTablaProductos");

//             // Obtenemos el usuario logueado para validar el rol
//             const datosSesion = localStorage.getItem("usuarioLogueado");
//             const usuarioSesion = datosSesion ? JSON.parse(datosSesion) : null;

//             // 3. LLENAMOS LAS FILAS DE LA TABLA
//             productos.forEach(function (producto) {
//                 const filaProducto = document.createElement("tr");

//    // Extraemos de forma segura el nombre del proveedor que viene del JOIN
//                 let nombreProv = producto.proveedores ? producto.proveedores.nombre_Completo : "Sin Proveedor";

//                 // Botón Editar adaptado para productos (Cargamos todos los datasets necesarios para el modal de edición)
//                // 🌟 CAMBIADO: 'data-provid' TODO EN MINÚSCULAS
// // Adentro del forEach de tus productos, el botón tiene que quedar así:
// let accionesHTML = `
//     <button class="btn-editar-prod"
//             data-id="${producto.id_Producto}"
//             data-fecha="${producto.fecha}"
//             data-prov_id="${producto.prov_ID}" data-tipo="${producto.tipo_Prod}"
//             data-name="${producto.producto_Name}"
//             data-cantidad="${producto.cantidad_Prod}"
//             data-costo="${producto.costo_Prod}">
//         Editar
//     </button>
// `;

//                 // Si es Dueño, sumamos el botón de borrado lógico de productos
//                 if (usuarioSesion && usuarioSesion.rol === "Dueño") {
//                     accionesHTML += ` <button class="btn-borrar-prod" data-id="${producto.id_Producto}">Borrar</button>`;
//                 }

//                 // Inyectamos los datos en las celdas correspondientes
//                 filaProducto.innerHTML = `
//                     <td>${producto.fecha}</td>
//                     <td><strong>${nombreProv}</strong></td>
//                     <td>${producto.tipo_Prod}</td>
//                     <td>${producto.producto_Name}</td>
//                     <td>${producto.cantidad_Prod} u.</td>
//                     <td>$${producto.costo_Prod}</td>
//                     <td>
//                         ${accionesHTML}
//                     </td>
//                 `;

//                 cuerpoTablaProductos.appendChild(filaProducto);
//             });

//         } else {
//             console.error("Error al obtener productos:", productos.error);
//         }
//     } catch (error) {
//         console.error("Error en la conexión al listar productos:", error);
//     }
// }

// OBTENER TABLA PRODUCTO
async function obtenerProductos() {
  try {
    const respuesta = await fetch(
      "/api/productos/listaProductos",
    );
    const productos = await respuesta.json();

    // --- ORDENAMIENTO FORZADO POR FECHA ---
    if (respuesta.ok && Array.isArray(productos)) {
      productos.sort((a, b) => {
        // Comparamos las fechas directamente
        return new Date(a.fecha) - new Date(b.fecha);
      });
    }

    if (respuesta.ok) {
      contenedorProductos.innerHTML = "";

      if (productos.length === 0) {
        contenedorProductos.innerHTML = `<p>⚠️ Sin productos registrados.</p>`;
        return;
      }

      // Estructura de la tabla
      const tablaProductos = document.createElement("table");
      tablaProductos.className = "tabla-general";
      tablaProductos.innerHTML = `
                <thead>
                    <tr>
                        <th>FECHA</th><th>PROVEEDOR</th><th>TIPO</th><th>PRODUCTO</th>
                        <th>CANTIDAD</th><th>COSTO TOTAL</th><th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody id="cuerpoTablaProductos"></tbody>
            `;
      contenedorProductos.appendChild(tablaProductos);

      const cuerpoTablaProductos = document.getElementById(
        "cuerpoTablaProductos",
      );
      let totalGastado = 0;

      // Sesión para botones
      const datosSesion = localStorage.getItem("usuarioLogueado");
      const usuarioSesion = datosSesion ? JSON.parse(datosSesion) : null;

      productos.forEach(function (producto) {
        const filaProducto = document.createElement("tr");

        const costoNumerico = parseFloat(producto.costo_Prod) || 0;
        totalGastado += costoNumerico;

        let nombreProv = producto.proveedores
          ? producto.proveedores.nombre_Completo
          : "Sin Proveedor";

        // LÓGICA DE TEXTO (A prueba de balas)
        let tipoRaw = producto.tipo_Prod
          ? producto.tipo_Prod.toLowerCase()
          : "";
        let tipoTextoLindo = "";

        if (tipoRaw === "bici") {
          tipoTextoLindo = "Bicicleta";
        } else if (tipoRaw === "accesorio") {
          tipoTextoLindo = "Accesorio";
        } else if (tipoRaw === "repuesto") {
          tipoTextoLindo = "Repuesto";
        } else {
          // Fallback: Capitaliza cualquier otra palabra que llegue
          tipoTextoLindo = tipoRaw.charAt(0).toUpperCase() + tipoRaw.slice(1);
        }

        // Construcción de botones original
        let accionesHTML = `
                    <button class="btn-editar-prod" 
                            data-id="${producto.id_Producto}" 
                            data-fecha="${producto.fecha}"
                            data-prov_id="${producto.prov_ID}" data-tipo="${producto.tipo_Prod}"
                            data-name="${producto.producto_Name}" 
                            data-cantidad="${producto.cantidad_Prod}"
                            data-costo="${producto.costo_Prod}">
                        Editar
                    </button>`;

        if (
          (usuarioSesion && usuarioSesion.rol === "Dueño") ||
          usuarioSesion?.rol === "Admin"
        ) {
          accionesHTML += ` <button class="btn-borrar-prod" data-id="${producto.id_Producto}">Borrar</button>`;
        }

        filaProducto.innerHTML = `
                    <td>${producto.fecha}</td>
                    <td><strong>${nombreProv}</strong></td>
                    <td>${tipoTextoLindo}</td>
                    <td>${producto.producto_Name}</td>
                    <td>${producto.cantidad_Prod} u.</td>
                    <td>${formatearMoneda(costoNumerico)}</td> 
                    <td>${accionesHTML}</td>
                `;
        cuerpoTablaProductos.appendChild(filaProducto);
      });

      // 🌟 4. TOTAL GASTADO CON DISEÑO MEJORADO
      const divTotal = document.createElement("div");
      divTotal.style.marginTop = "20px";
      divTotal.style.marginBottom = "20px";
      // Ajuste: le damos un margen derecho del 5% para que no toque el borde
      divTotal.style.marginRight = "5%";
      divTotal.style.textAlign = "right";
      divTotal.style.fontWeight = "bold";
      divTotal.style.fontSize = "1.2em";
      divTotal.style.color = "#333";
      divTotal.innerHTML = `Total Gastado: <span style="color: #1a4d4a;">${formatearMoneda(totalGastado)}</span>`;

      contenedorProductos.appendChild(divTotal);
    }
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}
// FUNCIÓN: Llena el select de proveedores del modal de edición
// 🌟 CORREGIDO: Ahora recibe el ID del proveedor que ya tiene el registro
async function cargarProveedoresEdicion(idProveedorActual) {
  try {
    const respuesta = await fetch(
      "/api/proveedores/listaProveedores",
    );
    const proveedores = await respuesta.json();

    if (respuesta.ok) {
      // Dejamos la opción por defecto limpia
      editProdProveedor.innerHTML =
        '<option value="" disabled>-- Seleccionar Proveedor --</option>';

      proveedores.forEach((prov) => {
        const option = document.createElement("option");
        option.value = prov.id_Prove;
        option.textContent = prov.nombre_Completo;

        // 🌟 CLAVE: Si este proveedor coincide con el del producto, lo dejamos seleccionado sí o sí
        if (String(prov.id_Prove) === String(idProveedorActual)) {
          option.selected = true; // Se clava en la pantalla de entrada
        }

        editProdProveedor.appendChild(option);
      });
    }
  } catch (error) {
    console.error("Error al cargar proveedores en edición:", error);
  }
}

// FUNCIÓN: Envía los datos modificados al servidor (PUT)
async function actualizarProducto(id, datosModificados) {
  try {
    const respuesta = await fetch(
      `/api/productos/editarProducto/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosModificados),
      },
    );

    const resultado = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje(resultado.mensaje);
      modalEditarProd.classList.add("oculto"); // Cerramos el modal
      obtenerProductos(); // 🌟 Refrescamos la tabla automáticamente para ver los cambios
    } else {
      mostrarMensaje(`Error: ${resultado.error}`);
    }
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
    mostrarMensaje("Error de conexión al actualizar.");
  }
}

// FUNCIÓN: Borrado lógico de un PRODUCTO (Enviar a papelera)
async function borrarProductoLogico(id) {
  try {
    const respuesta = await fetch(
      `/api/productos/papeleraProd/${id}`,
      {
        method: "PUT", // Usamos PUT tal cual lo definiste en tu backend
      },
    );

    const resultado = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje(resultado.mensaje); // "El registro se envió a la papelera correctamente"
      obtenerProductos(); // 🌟 Refrescamos la tabla para que desaparezca el producto borrado
    } else {
      mostrarMensaje(`Error: ${resultado.error}`);
    }
  } catch (error) {
    console.error("Error al enviar el producto a la papelera:", error);
    mostrarMensaje("Error de conexión con el servidor.");
  }
}

/*------------------------------------------------------------------------------*/
//          --- REPARACIONES ---

// FUNCIÓN: Trae los clientes de la DB para llenar el select de la factura
async function cargarSelectClientesRepa() {
  try {
    const respuesta = await fetch(
      "/api/clientes/listaClientes",
    ); // Ajustá esta URL a tu API de clientes
    const clientes = await respuesta.json();

    if (respuesta.ok) {
      repaCliente.innerHTML =
        '<option value="" disabled selected>-- Seleccionar Cliente --</option>';
      clientes.forEach((cli) => {
        const option = document.createElement("option");
        option.value = cli.id_Cliente; // 🌟 Enviamos el ID numérico como FK
        option.textContent = cli.cliente_Name; // Mostramos el nombre en la factura
        repaCliente.appendChild(option);
      });
    }
  } catch (error) {
    console.error("Error al cargar clientes en la factura:", error);
  }
}

// FUNCIÓN: Envía la factura al backend
async function guardarNuevaReparacion(datosReparacion) {
  try {
    const respuesta = await fetch(
      "/api/reparaciones/registroReparacion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosReparacion),
      },
    );

    const resultado = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje(resultado.mensaje);
      formNuevaReparacion.reset(); // Limpiamos la factura
      seccionFacturaReparacion.classList.add("oculto"); // Cerramos visualmente la factura

      // Si tenés una función para listar reparaciones, la llamás acá:
      obtenerReparaciones();
    } else {
      mostrarMensaje(`Error: ${resultado.error}`);
    }
  } catch (error) {
    console.error("Error al guardar la reparación:", error);
    mostrarMensaje("Error de conexión con el servidor.");
  }
}

// FUNCION PARA VER LAS REPARACIONES

async function obtenerReparaciones() {
  try {
    const respuesta = await fetch(
      "/api/reparaciones/listaReparaciones",
    );
    const reparaciones = await respuesta.json();

   // --- ORDENAMIENTO FORZADO POR FECHA ---
    if (respuesta.ok && Array.isArray(reparaciones)) {
      reparaciones.sort((a, b) => {
        return new Date(a.fecha_Repa) - new Date(b.fecha_Repa);
      });
    }
    // ------------------------------------

    if (respuesta.ok) {
      // Limpiamos el contenedor siempre antes de pintar
      contenedorRepa.innerHTML = "";

      // 1. VALIDACIÓN: Si la tabla no tiene registros
      if (reparaciones.length === 0) {
        contenedorRepa.innerHTML = `
                    <div class="mensaje-vacio">
                        <p>⚠️ <strong>Sin Registros:</strong> No se encontraron reparaciones activas en el taller.</p>
                    </div>
                `;
        return;
      }

      // 2. SI HAY REGISTROS: Creamos la estructura de la tabla
      const tablaRepa = document.createElement("table");
      tablaRepa.innerHTML = `
                <thead>
                    <tr>
                        <th>FECHA</th>
                        <th>CLIENTE</th>
                        <th>TRABAJO REALIZADO</th>
                        <th>BICICLETA</th>
                        <th>COSTO</th>
                        <th>ESTADO PAGO</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody id="cuerpoTablaRepa"></tbody>
            `;
      contenedorRepa.appendChild(tablaRepa);

      const cuerpoTablaRepa = document.getElementById("cuerpoTablaRepa");

      // Obtenemos el usuario logueado para validar el rol (por si Dueño borra)
      const datosSesion = localStorage.getItem("usuarioLogueado");
      const usuarioSesion = datosSesion ? JSON.parse(datosSesion) : null;

      // 3. LLENAMOS LAS FILAS
      reparaciones.forEach(function (reparacion) {
        const filaRepa = document.createElement("tr");

        // Extraemos de forma segura el nombre del cliente que viene del objeto relacionado
        let nombreCliente = reparacion.clientes
          ? reparacion.clientes.cliente_Name
          : "Cliente no encontrado";

        // Le damos un toque visual al estado del pago para que salte a la vista si debe o pagó
        let clasePago =
          reparacion.estadoPago === "Pagado"
            ? "pago-realizado"
            : "pago-pendiente";
        let emojiPago = reparacion.estadoPago === "Pagado" ? "✅" : "❌";

        // Botón Editar inflado con los data attributes (Ojo: pasamos el ID_cli de la relación)
        let accionesHTML = `
                    <button class="btn-editar-repa" 
                            data-id="${reparacion.id_Repa}" 
                            data-fecha="${reparacion.fecha_Repa}"
                            data-id_cli="${reparacion.ID_cli}"
                            data-tipo="${reparacion.tipo_Repa}"
                            data-bici="${reparacion.bici_User}" 
                            data-costo="${reparacion.costo_Cobrado}"
                            data-pago="${reparacion.estadoPago}">
                        Editar
                    </button>
                `;

        // Si el rol es Dueño, le sumamos el botón para mandar a la papelera de reparaciones
        if (
          (usuarioSesion && usuarioSesion.rol === "Dueño") ||
          usuarioSesion.rol === "Admin"
        ) {
          accionesHTML += ` <button class="btn-borrar-repa" data-id="${reparacion.id_Repa}">Borrar</button>`;
        }

        // Inyectamos las celdas
        filaRepa.innerHTML = `
                    <td>${reparacion.fecha_Repa}</td>
                    <td><strong>${nombreCliente}</strong></td>
                    <td>${reparacion.tipo_Repa}</td>
                    <td>${reparacion.bici_User}</td>
                   <td>${formatearMoneda(reparacion.costo_Cobrado)}</td>
                    <td>
                        <span class="badge-pago ${clasePago}">${emojiPago} ${reparacion.estadoPago}</span>
                    </td>
                    <td>
                        ${accionesHTML}
                    </td>
                `;

        cuerpoTablaRepa.appendChild(filaRepa);
      });
    } else {
      console.error("Error al obtener reparaciones:", reparaciones.error);
    }
  } catch (error) {
    console.error("Error en la conexión al listar reparaciones:", error);
  }
}

// FUNCIÓN: Carga los clientes en el modal de edición y preselecciona el actual
async function cargarClientesEdicionRepa(idClienteActual) {
  try {
    const respuesta = await fetch(
      "/api/clientes/listaClientes",
    );
    const clientes = await respuesta.json();

    if (respuesta.ok) {
      editRepaCliente.innerHTML =
        '<option value="" disabled>-- Seleccionar Cliente --</option>';

      clientes.forEach((cli) => {
        const option = document.createElement("option");
        option.value = cli.id_Cliente;
        option.textContent = cli.cliente_Name;

        // 🌟 CONTROL DE SINCRONISMO: Si coincide con el cliente actual, lo clava seleccionado
        if (String(cli.id_Cliente) === String(idClienteActual)) {
          option.selected = true;
        }

        editRepaCliente.appendChild(option);
      });
    }
  } catch (error) {
    console.error(
      "Error al cargar clientes en la edición de reparaciones:",
      error,
    );
  }
}

// FUNCIÓN: Envía el PUT con las modificaciones al servidor
async function actualizarReparacion(id, datosModificados) {
  try {
    const respuesta = await fetch(
      `/api/reparaciones/editarRepa/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosModificados),
      },
    );

    const resultado = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje(resultado.mensaje);
      modalEditarRepa.classList.add("oculto"); // Ocultamos el modal
      obtenerReparaciones(); // 🌟 Refrescamos la tabla dinámica automáticamente
    } else {
      mostrarMensaje(`Error: ${resultado.error}`);
    }
  } catch (error) {
    console.error("Error al conectar con el servidor para actualizar:", error);
    mostrarMensaje("Error de conexión al actualizar la reparación.");
  }
}

// FUNCIÓN: Borrado lógico de una reparación (Enviar a papelera)
async function borrarReparacionLogica(id) {
  try {
    const respuesta = await fetch(
      `/api/reparaciones/papeleraRepa/${id}`,
      {
        method: "PUT", // Coincide con el router.put de tu backend
      },
    );

    const resultado = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje(resultado.mensaje); // "El registro se envió a la papelera correctamente"
      obtenerReparaciones(); // 🌟 Refrescamos la tabla para que desaparezca la reparación de la lista activa
    } else {
      mostrarMensaje(`Error: ${resultado.error}`);
    }
  } catch (error) {
    console.error("Error al enviar la reparación a la papelera:", error);
    mostrarMensaje("Error de conexión con el servidor.");
  }
}

// --- FUNCIÓN PRINCIPAL ---
async function obtenerFacturaReparaciones() {
  const contenedorFRepa = document.getElementById("contenedorFRepa");
  const selectCliente = document.getElementById("filtroCliente");

  try {
    contenedorFRepa.innerHTML = `<p>Cargando...</p>`;

    // Fetch de reparaciones
    const res = await fetch(
      "/api/reparaciones/listaReparaciones",
    );
    const reparaciones = await res.json();

    // --- ORDENAMIENTO FORZADO POR FECHA (ASC) ---
    if (Array.isArray(reparaciones)) {
      reparaciones.sort((a, b) => new Date(a.fecha_Repa) - new Date(b.fecha_Repa));
    }
    // --------------------------------------------

    // 2. FILTRADO INTELIGENTE:
    // Creamos un array de nombres únicos usando un Set
    const nombresClientes = [...new Set(reparaciones.map(r => r.clientes?.cliente_Name).filter(Boolean))];

    // 3. Limpiamos el select y agregamos solo los que tienen reparaciones
    // (Asumiendo que el índice 0 es el "Todos" o "Seleccionar...")
    selectCliente.innerHTML = `<option value="">Todos los clientes</option>`;
    
    nombresClientes.forEach((nombre) => {
      selectCliente.innerHTML += `<option value="${nombre}">${nombre}</option>`;
    });

    contenedorFRepa.innerHTML = ""; // Limpiamos el "Cargando..."

    const tabla = document.createElement("table");
    tabla.className = "tabla-general";
    tabla.innerHTML = `<thead><tr><th>FECHA</th><th>CLIENTE</th><th>TRABAJO</th><th>BICICLETA</th><th>COSTO</th><th>ESTADO</th></tr></thead><tbody id="cuerpoTablaFRepa"></tbody>`;
    contenedorFRepa.appendChild(tabla);

    const cuerpo = document.getElementById("cuerpoTablaFRepa");

    reparaciones.forEach((item) => {
      const fila = document.createElement("tr");
      const esPagado = String(item.estadoPago).toLowerCase().includes("pagado");

      fila.innerHTML = `
                <td>${item.fecha_Repa}</td>
                <td><strong>${item.clientes?.cliente_Name || "N/A"}</strong></td>
                <td>${item.tipo_Repa}</td>
                <td>${item.bici_User}</td>
                <td>${formatearMoneda(item.costo_Cobrado)}</td>
                <td><span class="badge-pago ${esPagado ? "pago-realizado" : "pago-pendiente"}">${esPagado ? "✅ Pagado" : "❌ Pendiente"}</span></td>
            `;
      cuerpo.appendChild(fila);
    });
  } catch (error) {
    console.error(error);
    contenedorFRepa.innerHTML = `<p style="color: red;">⚠ Error al cargar datos.</p>`;
  }
}

// BOTON DE DESCARGAR EN PDF LA FACTURA REPARACION

document.getElementById("btnDescargarPDF").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth(); // Obtenemos ancho total (210mm)

  // 1. CENTRAR TÍTULO
  doc.setFontSize(18);
  const titulo = "Historial de Reparaciones";
  const textWidth = doc.getTextWidth(titulo);
  doc.text(titulo, (pageWidth - textWidth) / 2, 20); // Centrado matemático

  doc.setFontSize(10);
  doc.text(`Fecha de descarga: ${new Date().toLocaleString()}`, 14, 30);

  const filasPDF = [];
  let total = 0;

  document.querySelectorAll("#cuerpoTablaFRepa tr").forEach((fila) => {
    if (fila.style.display !== "none") {
      const fecha = fila.cells[0].innerText;
      const cliente = fila.cells[1].innerText;
      const trabajo = fila.cells[2].innerText;
      const bici = fila.cells[3].innerText;

      let costoTexto = fila.cells[4].innerText
        .replace(/\$|\./g, "")
        .replace(",", ".");
      let costoNumerico = parseFloat(costoTexto) || 0;
      total += costoNumerico;

      const estadoCompleto = fila.cells[5].innerText.toLowerCase();
      const simboloEstado = estadoCompleto.includes("pagado")
        ? "PAGADO"
        : "PENDIENTE";

      filasPDF.push([
        fecha,
        cliente,
        trabajo,
        bici,
        formatearMoneda(costoNumerico),
        simboloEstado,
      ]);
    }
  });

  doc.autoTable({
    startY: 35,
    theme: "grid",
    // 2. CORRECCIÓN DE LA FRANJA: Usamos 'margin' para controlar el ancho
    margin: { left: 14, right: 14 },
    head: [["FECHA", "CLIENTE", "TRABAJO", "BICICLETA", "COSTO", "ESTADO"]],
    body: filasPDF,
    styles: {
      fontSize: 8,
      cellPadding: 2,
      halign: "center",
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
    },
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.5,
    headStyles: {
      fillColor: [26, 77, 74],
      textColor: 255,
      lineWidth: 0.2,
      lineColor: [0, 0, 0],
    },
    // Ajustamos los anchos para que sumen proporcionalmente al ancho disponible (aprox 182mm)
    columnStyles: {
      0: { cellWidth: 22 },
      1: { cellWidth: 30 },
      2: { cellWidth: 30 },
      3: { cellWidth: 40 },
      4: { cellWidth: 30 },
      5: { cellWidth: 30 },
    },
  });

  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFont("helvetica", "bold");
  doc.text(`Costo a cobrar total: ${formatearMoneda(total)}`, 14, finalY);

  doc.save("Factura_Reparaciones.pdf");
});

// SELECTOR PARA OBTENER LOS CLIENTES

// Lógica de filtrado al cambiar los select
document
  .getElementById("filtroCliente")
  .addEventListener("change", filtrarTabla);
document
  .getElementById("filtroEstado")
  .addEventListener("change", filtrarTabla);

function filtrarTabla() {
  const cliente = document.getElementById("filtroCliente").value;
  const estado = document.getElementById("filtroEstado").value;
  const filas = document.querySelectorAll("#cuerpoTablaFRepa tr");

  filas.forEach((fila) => {
    const textoCliente = fila.cells[1].innerText;
    const textoEstado = fila.cells[5].innerText;

    const coincideCliente = cliente === "" || textoCliente.includes(cliente);
    const coincideEstado = estado === "" || textoEstado.includes(estado);

    fila.style.display = coincideCliente && coincideEstado ? "" : "none";
  });
}

/*------------------------------------------------------------------------------*/
//          --- VENTAS ---

// 1. Trae los clientes de la DB para el selector
async function cargarClientesVenta() {
  try {
    const respuesta = await fetch(
      "/api/clientes/listaClientes",
    );
    const clientes = await respuesta.json();

    if (respuesta.ok) {
      ventaCliente.innerHTML =
        '<option value="" disabled selected>-- Seleccionar Cliente --</option>';
      clientes.forEach((cli) => {
        const option = document.createElement("option");
        option.value = cli.id_Cliente;
        option.textContent = cli.cliente_Name;
        ventaCliente.appendChild(option);
      });
    }
  } catch (error) {
    console.error("Error al cargar clientes en ventas:", error);
  }
}

// 2. Descarga todos los productos activos de la DB y los guarda en el array global
async function precargarProductosVenta() {
  try {
    const respuesta = await fetch(
      "/api/productos/listaProductos",
    ); // Tu API común de productos activos
    if (respuesta.ok) {
      listaProductosGlobal = await respuesta.json();
    }
  } catch (error) {
    console.error("Error al precargar productos para la venta:", error);
  }
}

// 3. FILTRO INTELIGENTE: Filtra el select de productos según la categoría ("Bicicletas" o "Accesorios")
// 3. FILTRO INTELIGENTE: Filtra por categoría y oculta productos con stock <= 6
function filtrarProductosPorCategoria(categoriaSeleccionada) {
  ventaProducto.innerHTML =
    '<option value="" disabled selected>-- Seleccionar Producto --</option>';

  // TRADUCCIÓN: Convertimos lo que viene del select de ventas a como se guarda en tu DB
  let categoriaMapeada = "";
  if (categoriaSeleccionada === "Accesorios") {
    categoriaMapeada = "accesorio";
  } else if (categoriaSeleccionada === "Bicicletas") {
    categoriaMapeada = "bici";
  }

  // 🌟 FILTRO DOBLE: Debe coincidir el tipo Y la cantidad debe ser mayor a 6
  const productosFiltrados = listaProductosGlobal.filter((prod) => {
    return (
      prod.tipo_Prod === categoriaMapeada && parseInt(prod.cantidad_Prod) > 3
    );
  });

  if (productosFiltrados.length === 0) {
    ventaProducto.innerHTML =
      '<option value="" disabled selected>⚠ Sin stock disponible (Mínimo 5 unidades)</option>';
    return;
  }

  // Llenamos el selector con los productos que pasaron el filtro de seguridad
  productosFiltrados.forEach((prod) => {
    const option = document.createElement("option");
    option.value = prod.id_Producto;
    option.textContent = `${prod.producto_Name} (Stock: ${prod.cantidad_Prod})`;
    ventaProducto.appendChild(option);
  });
}

// 4. ENVÍO: Manda el POST al backend con el descuento automatizado
async function guardarNuevaVenta(datosVenta) {
  try {
    const respuesta = await fetch(
      "/api/ventas/registroVenta",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosVenta),
      },
    );

    const resultado = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje(resultado.mensaje); // "Venta registrada con éxito y stock actualizado."
      formNuevaVenta.reset(); // Limpiamos la factura
      seccionFacturaVenta.classList.add("oculto"); // Ocultamos el comprobante
    } else {
      // Si salta el error de stock insuficiente del backend, frena acá y avisa
      mostrarMensaje(`Error: ${resultado.error}`);
    }
  } catch (error) {
    console.error("Error de conexión al guardar venta:", error);
    mostrarMensaje("Error de conexión con el servidor.");
  }
}

async function obtenerVentas() {
  try {
    const respuesta = await fetch(
      "/api/ventas/listaVentas",
    );
    const ventas = await respuesta.json();

   // --- ORDENAMIENTO FORZADO POR ID Y FECHA ---
    if (respuesta.ok && Array.isArray(ventas)) {
      ventas.sort((a, b) => {
        // Primero ordenamos por ID (N° Venta)
        if (a.id_Venta !== b.id_Venta) {
          return a.id_Venta - b.id_Venta;
        }
        // Si el ID fuera igual, ordenamos por fecha
        return new Date(a.fecha_Venta) - new Date(b.fecha_Venta);
      });
    }
    // ------------------------------------------

    if (respuesta.ok) {
      // Limpiamos siempre el contenedor antes de pintar
      contenedorVentas.innerHTML = "";

      // 1. VALIDACIÓN: Si no hay ventas registradas
      if (ventas.length === 0) {
        contenedorVentas.innerHTML = `
                    <div class="mensaje-vacio">
                        <p>⚠️ <strong>Sin Registros:</strong> No se encontraron ventas activas en el sistema.</p>
                    </div>
                `;
        return;
      }

      // 2. SI HAY REGISTROS: Dibujamos la estructura de la tabla
      const tablaVentas = document.createElement("table");
      tablaVentas.innerHTML = `
                <thead>
                    <tr>
                        <th>N° VENTA</th>
                        <th>FECHA</th>
                        <th>CLIENTE</th>
                        <th>CATEGORÍA</th>
                        <th>PRODUCTO</th>
                        <th>CANTIDAD</th>
                        <th>TOTAL COBRADO</th>
                        <th>ESTADO</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody id="cuerpoTablaVentas"></tbody>
            `;
      contenedorVentas.appendChild(tablaVentas);

      const cuerpoTablaVentas = document.getElementById("cuerpoTablaVentas");

      // Obtenemos el usuario logueado para validar el rol (Dueño / Empleado)
      const datosSesion = localStorage.getItem("usuarioLogueado");
      const usuarioSesion = datosSesion ? JSON.parse(datosSesion) : null;

      // 3. LLENAMOS LAS FILAS DE LA TABLA
      ventas.forEach(function (venta) {
        const filaVenta = document.createElement("tr");

        // Formateamos visualmente la categoría para que no quede "bici" o "accesorio" crudo
        let categoriaLinda = "";
        if (
          venta.tipo_Compra === "Bicicletas" ||
          venta.tipo_Compra === "bici"
        ) {
          categoriaLinda = "Bicicleta";
        } else if (
          venta.tipo_Compra === "Accesorios" ||
          venta.tipo_Compra === "accesorio"
        ) {
          categoriaLinda = "Accesorio";
        } else {
          categoriaLinda = venta.tipo_Compra;
        }

        // Extraemos de forma segura los nombres del JOIN de la DB
        let nombreCliente = venta.clientes
          ? venta.clientes.cliente_Name
          : "Sin Cliente";
        let nombreProducto = venta.productos
          ? venta.productos.producto_Name
          : "Producto Eliminado";

        // Le ponemos un emoji o estilo visual lindo al estado del pago
        let estadoBadge =
          venta.estado_Pago === "Pagada" ? "✅ Pagada" : "❌ Pendiente";

        // Botón Editar adaptado con toda la info de la venta en sus datasets
        let accionesHTML = `
                    <button class="btn-editar-venta" 
                            data-id="${venta.id_Venta}" 
                            data-fecha="${venta.fecha_Venta}"
                            data-cliente_id="${venta.cliente_ID}" 
                            data-tipo="${venta.tipo_Compra}"
                            data-producto_id="${venta.produ_ID}" 
                            data-cantidad="${venta.cantidad}"
                            data-total="${venta.total_Comprado}"
                            data-estado_pago="${venta.estado_Pago}">
                        Editar
                    </button>
                `;

        // Si es Dueño, sumamos el botón de borrado lógico de ventas
        if (
          (usuarioSesion && usuarioSesion.rol === "Dueño") ||
          usuarioSesion.rol === "Admin"
        ) {
          accionesHTML += ` <button class="btn-borrar-venta" data-id="${venta.id_Venta}">Borrar</button>`;
        }

        // Inyectamos los datos en las celdas correspondientes
        filaVenta.innerHTML = `
                    <td><strong>#${venta.id_Venta}</strong></td> <td>${venta.fecha_Venta}</td>
                    <td>${nombreCliente}</td>
                    <td>${categoriaLinda}</td>
                    <td>${nombreProducto}</td>
                    <td>${venta.cantidad} u.</td>
                    
                    <td>${formatearMoneda(venta.total_Comprado)}</td>
                    <td>${estadoBadge}</td>
                    <td>
                        ${accionesHTML}
                    </td>
                `;

        cuerpoTablaVentas.appendChild(filaVenta);
      });
    } else {
      console.error("Error al obtener ventas:", ventas.error);
    }
  } catch (error) {
    console.error("Error en la conexión al listar ventas:", error);
  }
}

// 3. MANEJO DE CIERRE (Solo X y ESC)
function cerrarModalVentaFunc() {
  formEditarVenta.reset();
  modalEditarVenta.classList.add("oculto");
}

btnCerrarModalVentaX.addEventListener("click", cerrarModalVentaFunc);

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalEditarVenta.classList.contains("oculto")) {
    cerrarModalVentaFunc();
  }
});

// 2. FUNCIÓN DE BORRADO LÓGICO
async function ejecutarBorradoLogicoVenta(idVenta) {
  // Confirmación de seguridad en el navegador
  const seguro = confirm(
    `⚠️ ¿Está seguro de enviar la venta N° ${idVenta} a la papelera?`,
  );

  if (!seguro) return; // Si cancela, frena acá

  try {
    // Le pegamos a la ruta PUT del backend
    const respuesta = await fetch(
      `/api/ventas/borrarVenta/${idVenta}`,
      {
        method: "PUT",
      },
    );

    const resultado = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje(resultado.mensaje);
      obtenerVentas(); // Recarga únicamente la tabla de ventas
    } else {
      mostrarMensaje(`Error: ${resultado.error}`);
    }
  } catch (error) {
    console.error("Error al borrar la venta:", error);
    mostrarMensaje("Error de conexión con el servidor.");
  }
}

//---------------------------------------------------------------------------
// ------------------------- INFO EXTRA --------

async function cargarRepuestosEnSelect() {
  try {
    const respuesta = await fetch(
      "/api/productos/listaProductos",
    );
    const productos = await respuesta.json();

    if (respuesta.ok) {
      selectExtraProductoId.innerHTML =
        '<option value="" disabled selected>-- Seleccionar Repuesto --</option>';

      const soloRepuestos = productos.filter((prod) => {
        return (
          (prod.tipo_Prod === "repuesto" || prod.tipo_Prod === "Repuesto") &&
          parseInt(prod.cantidad_Prod) > 0
        );
      });

      if (soloRepuestos.length === 0) {
        selectExtraProductoId.innerHTML =
          '<option value="" disabled selected>⚠ No hay repuestos con stock</option>';
        return;
      }

      soloRepuestos.forEach((prod) => {
        const option = document.createElement("option");
        option.value = prod.id_Producto;
        option.textContent = `${prod.producto_Name} (Stock: ${prod.cantidad_Prod})`;
        selectExtraProductoId.appendChild(option);
      });
    }
  } catch (error) {
    console.error("Error al cargar repuestos:", error);
  }
}

// ==========================================
// 3. AGREGAR REPUESTO A LA LISTA DEL MODAL
// ==========================================
btnAgregarRepuestoLista.addEventListener("click", function () {
  const productoId = selectExtraProductoId.value;
  const fecha = inputExtraFecha.value;
  const cantidad = parseInt(inputExtraCantidad.value);
  const nombreProducto =
    selectExtraProductoId.options[selectExtraProductoId.selectedIndex].text;

  if (!productoId) {
    mostrarMensaje("⚠ Por favor, seleccione un repuesto de la lista.");
    return;
  }
  if (!fecha) {
    mostrarMensaje("⚠ Por favor, seleccione una fecha válida.");
    return;
  }
  if (cantidad <= 0 || isNaN(cantidad)) {
    mostrarMensaje("⚠ Ingrese una cantidad válida mayor a 0.");
    return;
  }

  // Filtramos duplicados considerando Producto Y Fecha (por si querés cargar el mismo ítem en días distintos)
  const existe = listaRepuestosTemporal.find(
    (item) => item.producto_ID === productoId && item.fechaExtra === fecha,
  );
  if (existe) {
    mostrarMensaje("ℹ Este repuesto ya está anotado para esa misma fecha.");
    return;
  }

  listaRepuestosTemporal.push({
    producto_ID: productoId,
    cantidad_Extra: cantidad,
    fechaExtra: fecha,
    nombre: nombreProducto,
  });

  dibujarListaTemporal();
});

function dibujarListaTemporal() {
  if (listaRepuestosTemporal.length === 0) {
    cuerpoListaExtrasTemporal.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#888; padding:10px;">No hay repuestos en la lista</td></tr>`;
    return;
  }

  cuerpoListaExtrasTemporal.innerHTML = "";
  listaRepuestosTemporal.forEach((item, index) => {
    // Formateamos la fecha visualmente a DD/MM/YYYY
    const [anio, mes, dia] = item.fechaExtra.split("-");
    const fechaVisual = `${dia}/${mes}/${anio}`;

    const fila = document.createElement("tr");
   
    // ... dentro de tu función dibujarListaTemporal
fila.innerHTML = `
    <td style="padding: 6px; border-bottom: 1px solid #eee;">${item.nombre}</td>
    <td style="padding: 6px; border-bottom: 1px solid #eee;">${fechaVisual}</td>
    <td style="padding: 6px; border-bottom: 1px solid #eee;"><strong>${item.cantidad_Extra} u.</strong></td>
    <td style="padding: 6px; border-bottom: 1px solid #eee; text-align:center;">
        <button type="button" class="btn-cancelar" style="padding:2px 6px; font-size:0.8rem; margin:0;" onclick="eliminarItemTemporal(${index})">❌</button>
    </td>
`; 
    cuerpoListaExtrasTemporal.appendChild(fila);
  });
}

window.eliminarItemTemporal = function (index) {
  listaRepuestosTemporal.splice(index, 1);
  dibujarListaTemporal();
};

// ==========================================
// 4. GUARDAR CAMBIOS (MANDA LA INFO AL POST)
// ==========================================
btnGuardarExtrasFinal.addEventListener("click", async function () {
  if (listaRepuestosTemporal.length === 0) {
    mostrarMensaje("⚠ La lista de repuestos está vacía.");
    return;
  }

  let errores = 0;

  for (const item of listaRepuestosTemporal) {
    const payload = {
      cantidad_Extra: item.cantidad_Extra,
      producto_ID: parseInt(item.producto_ID),
      fechaExtra: item.fechaExtra, // Agregamos la fecha al envío
      reparacion_ID: null,
    };

    try {
      const respuesta = await fetch(
        "/api/extraRepa/registroExtra",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        mostrarMensaje(`Error con [${item.nombre}]: ${resultado.error}`);
        errores++;
      }
    } catch (error) {
      console.error("Error de red:", error);
      errores++;
    }
  }

  if (errores === 0) {
    mostrarMensaje(
      "🎉 Repuestos registrados correctamente con sus fechas y stock descontado.",
    );
    cerrarModalExtraFunc();
  } else {
    mostrarMensaje("⚠ Hubo problemas al procesar la solicitud.");
    cerrarModalExtraFunc();
  }
});

// ==========================================
// 5. FUNCIONES DE CIERRE
// ==========================================
function cerrarModalExtraFunc() {
  listaRepuestosTemporal = [];
  modalExtraReparacion.classList.add("oculto");
}

btnCerrarModalExtraX.addEventListener("click", cerrarModalExtraFunc);

window.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    !modalExtraReparacion.classList.contains("oculto")
  ) {
    cerrarModalExtraFunc();
  }
});

// Función que va al backend a traer los datos y arma la tabla
async function obtenerYDibujarExtras() {
  try {
    contenedorExtra.innerHTML = `<p style="color: #666; font-style: italic;">Cargando registros...</p>`;

    const respuesta = await fetch(
      "/api/extraRepa/listarExtras",
    );
    const datos = await respuesta.json();

    if (!respuesta.ok) {
      contenedorExtra.innerHTML = `<p style="color: red;">⚠ Error al cargar los datos: ${datos.error}</p>`;
      return;
    }

    // --- ORDENAMIENTO FORZADO POR FECHA ---
    if (Array.isArray(datos)) {
      datos.sort((a, b) => new Date(a.fechaExtra) - new Date(b.fechaExtra));
    }
    // --------------------------------------

    if (datos.length === 0) {
      contenedorExtra.innerHTML = `<p style="color: #888; font-style: italic; padding: 10px; background: #f9f9f9; border: 1px dashed #ccc; border-radius: 4px;">No hay repuestos extras registrados en el historial.</p>`;
      return;
    }

    // Armamos la estructura de la tabla con los estilos de tu sistema
    let tablaHTML = `
            <table class="tabla-general" style="width:100%; border-collapse: collapse; margin-top: 15px;">
                <thead>
                    <tr style="background-color: #a2e1db; color: #333; text-align: left;">
                        <th style="padding: 10px; border: 1px solid #ddd;">📅 Fecha</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">📦 Repuesto / Producto</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">🔢 Cantidad</th>
                        <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">⚙️ Acción</th>
                    </tr>
                </thead>
                <tbody>
        `;

    // Iteramos los datos que vinieron de la DB
    datos.forEach((item) => {
      // Formateamos la fecha de YYYY-MM-DD a DD/MM/YYYY para que quede lindo
      let fechaFormateada = "Sin fecha";
      if (item.fechaExtra) {
        const [anio, mes, dia] = item.fechaExtra.split("-");
        fechaFormateada = `${dia}/${mes}/${anio}`;
      }

      // Sacamos el nombre del producto del objeto anidado que armó el JOIN de Supabase
      const nombreProducto = item.productos
        ? item.productos.producto_Name
        : "Producto no encontrado";

      // 🌟 1. OBTENEMOS EL ROL ACTUAL DEL USUARIO DESDE EL LOCALSTORAGE
      // (Cambiá "rol" por la clave exacta que uses vos en tu login, ej: "user_rol", "tipo_usuario", etc.)
      // const rolUsuario = localStorage.getItem("usuarioLogueado");

      const rolUsuario = JSON.parse(
        localStorage.getItem("usuarioLogueado"),
      ).rol;

      // 🌟 2. DEFINIMOS LAS VARIABLES DEL BOTÓN SEGÚN EL ROL
      let botonHTML = "";

      if (rolUsuario === "Dueño" || rolUsuario === "dueño") {
        // Si es Dueño: Botón completamente operativo con su onclick de siempre
        botonHTML = `
                    <button class="btn-cancelar" style="padding: 4px 8px; font-size: 0.85rem; margin: 0; cursor: pointer;" 
                            onclick="borrarRegistroExtra(${item.id_Extra}, ${item.producto_ID}, ${item.cantidad_Extra})">
                        🗑️ Borrar
                    </button>
                `;
      } else {
        // Si NO es Dueño: Le metemos disabled, opacity para que sea transparente y SIN el onclick
        botonHTML = `
                    <button class="btn-cancelar" style="padding: 4px 8px; font-size: 0.85rem; margin: 0; opacity: 0.35; cursor: not-allowed;" 
                            disabled>
                        🗑️ Borrar
                    </button>
                `;
      }

      // Inyectamos la fila con el botón que corresponda
      tablaHTML += `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px; border: 1px solid #ddd;">${fechaFormateada}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${nombreProducto}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>${item.cantidad_Extra} u.</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">
                        ${botonHTML}
                    </td>
                </tr>
            `;
    });

    tablaHTML += `
                </tbody>
            </table>
        `;

    // Inyectamos la tabla en tu div contenedor
    contenedorExtra.innerHTML = tablaHTML;
  } catch (error) {
    console.error("Error al renderizar la tabla:", error);
    contenedorExtra.innerHTML = `<p style="color: red;">⚠ Error de red al conectar con el servidor.</p>`;
  }
}

// Función global para manejar el borrado DEFINITIVO de la fila
window.borrarRegistroExtra = async function (idExtra, productoId, cantidad) {
  // Mensaje de advertencia potente
  const mensajeAdvertencia =
    `⚠️ ¡ADVERTENCIA CRÍTICA! ⚠️\n\n` +
    `¿Estás completamente segura de que querés ELIMINAR PERMANENTEMENTE este registro?\n\n` +
    `• El registro se borrará definitivamente de la base de datos.\n` +
    `• Se devolverán ${cantidad} unidad(es) al stock del taller.\n\n` +
    `Esta acción NO se puede deshacer. ¿Proceder?`;

  if (!confirm(mensajeAdvertencia)) {
    return; // Si cancela, frena acá
  }

  try {
    // 🌟 ACÁ ESTABA EL ERROR: Cambiamos "PUT" por "DELETE" para que coincida con tu backend
    const respuesta = await fetch(
      `/api/extraRepa/eliminarExtra/${idExtra}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          producto_ID: productoId,
          cantidad_Extra: cantidad,
        }),
      },
    );

    const resultado = await respuesta.json();
j
    if (respuesta.ok) {
      mostrarMensaje(
        "🗑️ Registro borrado por completo del sistema. El stock fue restablecido.",
      );
      // Volvemos a dibujar la tabla para que desaparezca la fila borrada
      obtenerYDibujarExtras();
    } else {
      mostrarMensaje(`⚠ Error al eliminar: ${resultado.error}`);
    }
  } catch (error) {
    console.error("Error al borrar:", error);
    mostrarMensaje("⚠ Error de red al intentar borrar el registro.");
  }
};

//--------------------------------
// VENTAS
window.obtenerFacturaVentas = async function () {
  const contenedor = document.getElementById("contenedorFactV");
  const selectCliente = document.getElementById("filtroClienteV");

  try {
    contenedor.innerHTML = `<p>Cargando...</p>`;

    // 1. Solo necesitamos las ventas
    const resV = await fetch("/api/ventas/listaVentas");
    const ventas = await resV.json();

    // --- ORDENAMIENTO FORZADO (ASC por ID y FECHA) ---
    if (Array.isArray(ventas)) {
      ventas.sort((a, b) => {
        if (a.id_Venta !== b.id_Venta) return a.id_Venta - b.id_Venta;
        return new Date(a.fecha_Venta) - new Date(b.fecha_Venta);
      });
    }

    // 2. Extraemos los nombres de clientes únicos presentes en las ventas
    // Usamos el mismo truco del Set para no repetir
    const nombresClientes = [...new Set(ventas.map(v => v.clientes?.cliente_Name).filter(Boolean))];

    // 3. Llenamos el select solo con esos nombres
    selectCliente.innerHTML = `<option value="">Todos los clientes</option>`;
    nombresClientes.forEach((nombre) => {
      selectCliente.innerHTML += `<option value="${nombre}">${nombre}</option>`;
    });
   

    contenedor.innerHTML = `
            <table class="tabla-general">
                <thead><tr><th>N°</th><th>FECHA</th><th>CLIENTE</th><th>CATEGORÍA</th><th>PRODUCTO</th><th>CANT.</th><th>TOTAL</th><th>ESTADO</th></tr></thead>
                <tbody id="cuerpoTablaFactV"></tbody>
            </table>`;

    const cuerpo = document.getElementById("cuerpoTablaFactV");
    ventas.forEach((v) => {
      const fila = document.createElement("tr");
      const esPagada = v.estado_Pago === "Pagada";
      fila.innerHTML = `
                <td>#${v.id_Venta}</td>
                <td>${v.fecha_Venta}</td>
                <td>${v.clientes?.cliente_Name || "N/A"}</td>
                <td>${v.tipo_Compra}</td>
                <td>${v.productos?.producto_Name || "N/A"}</td>
                <td>${v.cantidad} u.</td>
               <td>${formatearMoneda(v.total_Comprado)}</td>
    <td class="estado-celda">${v.estado_Pago === "Pagada" ? "Pagada" : "Pendiente"}</td>
            `;
      cuerpo.appendChild(fila);
    });
  } catch (e) {
    contenedor.innerHTML = `<p style="color:red">Error: ${e.message}</p>`;
  }
};

// --- FILTRADO PARA VENTAS ---
function filtrarVentas() {
  const cliente = document.getElementById("filtroClienteV").value;
  const estado = document.getElementById("filtroEstadoV").value;
  document.querySelectorAll("#cuerpoTablaFactV tr").forEach((f) => {
    const cText = f.cells[2].innerText;
    const eText = f.cells[7].innerText;
    f.style.display =
      cText.includes(cliente) && eText.includes(estado) ? "" : "none";
  });
}
document
  .getElementById("filtroClienteV")
  .addEventListener("change", filtrarVentas);
document
  .getElementById("filtroEstadoV")
  .addEventListener("change", filtrarVentas);

document.getElementById("btnDescargarPDFVentas").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "mm", "a4");

  doc.setFontSize(18);
  doc.text("Historial de Ventas", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.text(`Fecha de descarga: ${new Date().toLocaleString()}`, 14, 30);

  const filasPDF = [];
  let total = 0;

  document.querySelectorAll("#cuerpoTablaFactV tr").forEach((fila) => {
    if (fila.style.display !== "none") {
      const id = fila.cells[0].innerText;
      const fecha = fila.cells[1].innerText;
      const cliente = fila.cells[2].innerText;
      const cat = fila.cells[3].innerText;
      const prod = fila.cells[4].innerText;
      const cant = fila.cells[5].innerText;

      let totalTexto = fila.cells[6].innerText
        .replace(/\$|\./g, "")
        .replace(",", ".");
      let totalNumerico = parseFloat(totalTexto) || 0;
      total += totalNumerico;

      const estado = fila.cells[7].innerText.includes("Pagada")
        ? "PAGADA"
        : "PENDIENTE";

      filasPDF.push([id, fecha, cliente, cat, prod, cant, formatearMoneda(totalNumerico), estado]);
    }
  });

  doc.autoTable({
    startY: 35,
    theme: "grid",
    head: [["N°", "FECHA", "CLIENTE", "CATEG.", "PRODUCTO", "CANT.", "TOTAL", "ESTADO"]],
    body: filasPDF,
    margin: { left: 10, right: 10 }, // Asegura márgenes laterales
    styles: { 
      fontSize: 8, 
      cellPadding: 2, 
      halign: "center",
      valign: "middle", // Asegura alineación vertical centrada
      lineColor: [0, 0, 0], 
      lineWidth: 0.2
    },
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.5,
    headStyles: { 
      fillColor: [26, 77, 74], 
      textColor: 255,
      lineWidth: 0.2,
      lineColor: [0, 0, 0]
    },
    // Ajuste de anchos: columna 6 (TOTAL) aumentada a 30mm
    columnStyles: {
      0: { cellWidth: 10 },  // N°
      1: { cellWidth: 20 },  // FECHA
      2: { cellWidth: 30 },  // CLIENTE
      3: { cellWidth: 20 },  // CATEG.
      4: { cellWidth: 40 },  // PRODUCTO
      5: { cellWidth: 15 },  // CANT.
      6: { cellWidth: 30 },  // TOTAL (Aumentado para que no se corte)
      7: { cellWidth: 25 }   // ESTADO
    },
  });

  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFont("helvetica", "bold");
  doc.text(`Total a Cobrar: ${formatearMoneda(total)}`, 14, finalY);

  doc.save("Factura_Ventas.pdf");
});


//----------------------------------------------------------------------------

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