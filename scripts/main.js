let paginaActual = 1;
const productosPorPagina = 6;

document.addEventListener('DOMContentLoaded', () => {
    // Mostrar el modal promocional al cargar la página
    const promoModal = new bootstrap.Modal(document.getElementById('promoModal'));
    promoModal.show();

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

    // Configurar eventos
    document.getElementById('finalizar-compra').addEventListener('click', finalizarCompra);
    document.getElementById('carrito-link').addEventListener('click', (e) => {
        e.preventDefault();
        mostrarCarritoEnModal();
    });
    console.log('Eventos configurados');
});

// ---- Función para actualizar el contador del carrito ----
function actualizarContadorCarrito() {
    const carrito = getCarrito();
    document.getElementById('cart-count').textContent = carrito.length;
    console.log('Contador de carrito actualizado:', carrito.length);
}

// ---- Función para finalizar la compra ----
function finalizarCompra() {
    localStorage.removeItem('carrito');
    Swal.fire({
        icon: 'success',
        title: 'Compra Finalizada',
        text: 'Tu compra se ha realizado con éxito.',
        confirmButtonText: 'OK'
    }).then(() => {
        window.location.href = 'index.html';
    });
    console.log('Compra finalizada');
}

// ---- Función para mostrar el carrito en un modal ----
function mostrarCarritoEnModal() {
    mostrarCarrito();
    const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
    carritoModal.show();
    console.log('Carrito mostrado en modal');
}
