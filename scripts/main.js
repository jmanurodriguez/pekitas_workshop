// Función para mostrar los productos
function mostrarProductos() {
    const contenedorProductos = document.getElementById('productos-list');
    contenedorProductos.innerHTML = ""; // Limpiar contenedor antes de añadir productos
    productos.forEach((producto, index) => {
        const productoCard = document.createElement('div');
        productoCard.className = 'col-md-4 mb-4'; // Asegurar clase de Bootstrap correcta
        productoCard.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body text-center">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${index})">Agregar al Carrito</button>
                </div>
            </div>
        `;
        contenedorProductos.appendChild(productoCard);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(productos[index]);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: `${productos[index].nombre} ha sido agregado al carrito.`,
        timer: 1500
    });
}

// Llamar a la función para mostrar los productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    
    // Mostrar el modal al cargar la página
    const promoModal = new bootstrap.Modal(document.getElementById('promoModal'));
    promoModal.show();

    // Agregar efecto de fade-in para la sección de bienvenida
    const seccionBienvenida = document.querySelector('.seccion-bienvenida');
    seccionBienvenida.style.opacity = 0;
    setTimeout(() => {
        seccionBienvenida.style.transition = 'opacity 1s';
        seccionBienvenida.style.opacity = 1;
    }, 100);
});
