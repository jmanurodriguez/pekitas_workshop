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

    const template = document.getElementById('producto-template').content;

    productos.slice(inicio, fin).forEach((producto, index) => {
        const productoCard = document.importNode(template, true);
        productoCard.querySelector('.card-img-top').src = producto.imagen;
        productoCard.querySelector('.card-img-top').alt = producto.nombre;
        productoCard.querySelector('.card-title').textContent = producto.nombre;
        productoCard.querySelector('.card-text').textContent = `$${producto.precio}`;
        productoCard.querySelector('.btn-primary').setAttribute('onclick', `agregarAlCarrito(${index + inicio})`);
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
