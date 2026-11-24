const cuentaCarritoElement = document.getElementById("cuenta-carrito");
const keyLocalstorage = "ropa";

/** Toma un objeto producto o un objeto con al menos un ID y lo agrega al carrito */
function agregarAlCarrito(producto){
  // Reviso si el producto esta en el carrito
  let memoria = JSON.parse(localStorage.getItem(keyLocalstorage));
  console.log(memoria);
  let cantidadProductoFinal;

  // Si no hay localstorage o está vacío lo creo
  if(!memoria || memoria.length === 0){
    const nuevoProducto = getNuevoProductoParaMemoria(producto);
    localStorage.setItem(keyLocalstorage, JSON.stringify([nuevoProducto]));
    actualizarNumeroCarrito();
    cantidadProductoFinal = 1;
    return cantidadProductoFinal;
  } else {
    // Si hay localstorage me fijo si la prenda ya está ahí
    const indiceProducto = memoria.findIndex(prenda => prenda.id === producto.id);
    console.log(indiceProducto);
    const nuevaMemoria = memoria;

    // Si el producto no está en el carrito lo agrego
    if(indiceProducto === -1){
      const nuevoProducto = getNuevoProductoParaMemoria(producto);
      nuevaMemoria.push(nuevoProducto);
      cantidadProductoFinal = 1;
    } else {
      // Si el producto está en el carrito le agrego 1 a la cantidad
      nuevaMemoria[indiceProducto].cantidad++;
      cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    }

    localStorage.setItem(keyLocalstorage, JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
  }
}

/** Resta una unidad de un producto del carrito */
function restarAlCarrito(producto){
  let memoria = JSON.parse(localStorage.getItem(keyLocalstorage));
  if(!memoria) return console.warn("Error restando al carrito: Carrito no encontrado en memoria");

  let cantidadProductoFinal = 0;
  const indiceProducto = memoria.findIndex(prenda => prenda.id === producto.id);
  const nuevaMemoria = memoria;

  nuevaMemoria[indiceProducto].cantidad--;
  cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;

  if(cantidadProductoFinal === 0){
    nuevaMemoria.splice(indiceProducto, 1);
  }

  localStorage.setItem(keyLocalstorage, JSON.stringify(nuevaMemoria));
  actualizarNumeroCarrito();
  return cantidadProductoFinal;
}

/** Toma un producto, le agrega cantidad 1 y lo devuelve */
function getNuevoProductoParaMemoria(producto){
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

/* Contar cuantos productos en la memoria */
function actualizarNumeroCarrito(){
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem(keyLocalstorage));
  if(memoria && memoria.length > 0){
    cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
    cuentaCarritoElement.innerText = cuenta;
    return cuenta;
  }
  cuentaCarritoElement.innerText = 0;
}

/** Reinicia el carrito */
function reiniciarCarrito(){
  localStorage.removeItem(keyLocalstorage);
  actualizarNumeroCarrito();
}

actualizarNumeroCarrito();