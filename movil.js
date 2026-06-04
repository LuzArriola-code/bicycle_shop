function toggleMenuMovil() {

    const menu = document.getElementById("menuPrincipal");
    const boton = document.getElementById("btnMenuMovil");

    menu.classList.toggle("activo");

    if(menu.classList.contains("activo")){
        boton.innerHTML = "🡄";
    }else{
        boton.innerHTML = "🡆";
    }

}

/*----------------------------------------------------------*/
/*                      TABLAS                             */


function limpiarTablas(){

    document.getElementById("contenedorUsuarios").innerHTML = "";

    document.getElementById("contenedorProveedores").innerHTML = "";

    document.getElementById("contenedorClientes").innerHTML = "";

    document.getElementById("contenedorProductos").innerHTML = "";

    document.getElementById("contenedorRepa").innerHTML = "";

    document.getElementById("contenedorFRepa").innerHTML = "";

    document.getElementById("contenedorVentas").innerHTML = "";

    document.getElementById("contenedorFactV").innerHTML = "";

    document.getElementById("contenedorExtra").innerHTML = "";
}



function ocultarTodasLasTablas(){

    document
    .querySelectorAll(".contenedor-tabla")
    .forEach(tabla => {

        tabla.classList.remove("activa");

    });

}