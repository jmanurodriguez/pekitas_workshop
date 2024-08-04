let productos = [];
const productosPorPagina = 6;
let paginaActual = 1;

document.addEventListener('DOMContentLoaded', () => {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
            mostrarProductos(paginaActual);
            actualizarContadorCarrito();
        })
        .catch(error => console.error('Error al cargar productos:', error));
});

function mostrarProductos(pagina) {
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = "";

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

    const crearItemPaginacion = (pagina, texto, activo = false, deshabilitado = false) => {
        const itemPaginacion = document.createElement('li');
        itemPaginacion.className = `page-item ${activo ? 'active' : ''} ${deshabilitado ? 'disabled' : ''}`;
        itemPaginacion.innerHTML = `<a class="page-link" href="#">${texto}</a>`;
        if (!deshabilitado) {
            itemPaginacion.addEventListener('click', (e) => {
                e.preventDefault();
                mostrarProductos(pagina);
            });
        }
        contenedorPaginacion.appendChild(itemPaginacion);
    };

    crearItemPaginacion(paginaActual - 1, '&laquo;', false, paginaActual === 1);

    for (let i = 1; i <= totalPaginas; i++) {
        crearItemPaginacion(i, i, i === paginaActual);
    }

    crearItemPaginacion(paginaActual + 1, '&raquo;', false, paginaActual === totalPaginas);
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
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = carrito.length;
}
