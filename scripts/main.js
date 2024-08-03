let audioContext;
const productosPorPagina = 6;
let paginaActual = 1;

document.addEventListener('DOMContentLoaded', () => {
    // Mostrar el modal de promoción al cargar la página
    const promoModal = new bootstrap.Modal(document.getElementById('promoModal'));
    promoModal.show();

    // Agregar efecto de fade-in para la sección de bienvenida
    const seccionBienvenida = document.querySelector('.seccion-bienvenida');
    seccionBienvenida.style.opacity = 0;
    setTimeout(() => {
        seccionBienvenida.style.transition = 'opacity 1s';
        seccionBienvenida.style.opacity = 1;
    }, 100);

    // Llamar a la función para mostrar los productos al cargar la página
    mostrarProductos(paginaActual);

    // Crear AudioContext después de una interacción del usuario
    document.body.addEventListener('click', () => {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }, { once: true });
});

function mostrarProductos(pagina) {
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = ""; // Limpiar contenedor antes de añadir productos

    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;

    productos.slice(inicio, fin).forEach((producto, index) => {
        const productoCard = document.createElement('div');
        productoCard.className = 'col-md-4 mb-4';
        productoCard.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body text-center">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${index + inicio})">Agregar al Carrito</button>
                </div>
            </div>
        `;
        contenedorProductos.appendChild(productoCard);
    });

    mostrarPaginacion(pagina);
}

function mostrarPaginacion(paginaActual) {
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const contenedorPaginacion = document.getElementById('pagination');
    contenedorPaginacion.innerHTML = "";

    for (let i = 1; i <= totalPaginas; i++) {
        const itemPaginacion = document.createElement('li');
        itemPaginacion.className = `page-item ${i === paginaActual ? 'active' : ''}`;
        itemPaginacion.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        itemPaginacion.addEventListener('click', (e) => {
            e.preventDefault();
            mostrarProductos(i);
        });
        contenedorPaginacion.appendChild(itemPaginacion);
    }
}

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
