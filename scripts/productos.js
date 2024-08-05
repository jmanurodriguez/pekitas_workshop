document.addEventListener('DOMContentLoaded', () => {
    // Cargar productos desde productos.json
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
            console.log("Productos cargados:", productos);
            renderProductos(paginaActual);
            actualizarContadorCarrito();
        })
        .catch(error => console.error('Error al cargar productos:', error));
});

// ---- Función para actualizar el contador del carrito ----
function actualizarContadorCarrito() {
    const carrito = getCarrito();
    document.getElementById('cart-count').textContent = carrito.length;
    console.log('Contador de carrito actualizado:', carrito.length);
}
