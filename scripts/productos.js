let productos = [];
const productosPorPagina = 6;
let paginaActual = 1;

document.addEventListener('DOMContentLoaded', () => {
    // Cargar productos desde el JSON
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
            mostrarProductos(paginaActual);
        })
        .catch(error => console.error('Error al cargar productos:', error));
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
