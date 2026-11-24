const contenedorTarjetas = document.getElementById("productos-contenedor");

function crearTarjetasProductosInicio(productos){
    productos.forEach(producto => {
        const nuevaPrenda = document.createElement("div");
        nuevaPrenda.className = "tarjeta-producto w-80 max-w-sm text-center bg-pink-200 p-4 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl transition duration-400";
        nuevaPrenda.innerHTML = `
            <img src=${producto.img} alt="${producto.nombre}" class="w-full h-56 rounded-md">
            <h3 class="m-3 text-sm font-bold">${producto.nombre}</h3>
            <p class="m-4">$${producto.precio}</p>
            <button class="bg-pink-500 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer transition duration-300">
        Agregar al carrito
    </button>
        `
        contenedorTarjetas.appendChild(nuevaPrenda);
        nuevaPrenda.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(producto))
    });
}

crearTarjetasProductosInicio(ropa);