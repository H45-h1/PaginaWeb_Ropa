const contenedorTarjetas = document.getElementById("productos-contenedor");
const cantidadElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");

/** Crea las tarjetas de productos teniendo en cuenta lo guardado en localstorage */
function crearTarjetasProductosInicio(){
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("ropa")); //convertir de string a objeto
    console.log(productos);
    if(productos && productos.length > 0){
        productos.forEach(producto => {
            const nuevaPrenda = document.createElement("div");
            nuevaPrenda.className = "tarjeta-producto flex gap-5 items-center";
            nuevaPrenda.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}" class="w-36 h-24 rounded-md">
                <h3 class="w-[130px] text-sm font-bold">${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <div class="flex items-center gap-2">
                    <button class="bg-pink-500 hover:bg-pink-700 text-white font-semibold px-2 py-1 rounded-lg cursor-pointer transition duration-300">-</button>
                    <span class="cantidad">${producto.cantidad}</span>
                    <button class="bg-pink-500 hover:bg-pink-700 text-white font-semibold px-1 py-1 rounded-lg cursor-pointer transition duration-300">+</button>
                </div>
            `;
            contenedorTarjetas.appendChild(nuevaPrenda);

            nuevaPrenda
                .getElementsByTagName("button")[0]
                .addEventListener("click", (e) => {
                    const spanCantidad = e.target.parentElement.getElementsByClassName("cantidad")[0];
                    spanCantidad.innerText = restarAlCarrito(producto);
                    crearTarjetasProductosInicio();
                    actualizarTotales();
                });

            nuevaPrenda
                .getElementsByTagName("button")[1]
                .addEventListener("click", (e) => {
                    const spanCantidad = e.target.parentElement.getElementsByClassName("cantidad")[0];
                    spanCantidad.innerText = agregarAlCarrito(producto);
                    actualizarTotales();
                });
        });
    }
    revisarMensajeVacio();
    actualizarTotales();
    actualizarNumeroCarrito();
}

crearTarjetasProductosInicio();

/** Actualiza el total de precio y unidades de la página del carrito */
function actualizarTotales(){
    const productos = JSON.parse(localStorage.getItem("ropa"));
    let cantidad = 0;
    let precio = 0;
    if(productos && productos.length > 0){
        productos.forEach(producto => {
            cantidad += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        });
    }
    if(cantidadElement) cantidadElement.innerText = cantidad;
    if(precioElement) precioElement.innerText = precio;
    if(precio === 0){
        reiniciarCarrito();
        revisarMensajeVacio();
    }
}

const botonReiniciar = document.getElementById("reiniciar");
if(botonReiniciar){
    botonReiniciar.addEventListener("click", () => {
        contenedorTarjetas.innerHTML = "";
        reiniciarCarrito();
        revisarMensajeVacio();
        actualizarTotales();
    });
}

/** Muestra o esconde el mensaje de que no hay nada en el carrito */
function revisarMensajeVacio(){
    const productos = JSON.parse(localStorage.getItem("ropa"));
    const hayProductos = productos && productos.length > 0;
    if(carritoVacioElement){
        carritoVacioElement.classList.toggle("hidden", hayProductos);
    }
    if(totalesContainer){
        totalesContainer.classList.toggle("hidden", !hayProductos);
    }
}