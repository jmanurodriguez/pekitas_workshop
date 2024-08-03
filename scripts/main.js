document.addEventListener('DOMContentLoaded', () => {
    // Mostrar el modal de promoción al cargar la página
    const promoModalElement = document.getElementById('promoModal');
    if (promoModalElement) {
        const promoModal = new bootstrap.Modal(promoModalElement);
        promoModal.show();
    }

    // Agregar efecto de fade-in para la sección de bienvenida
    const seccionBienvenida = document.querySelector('.seccion-bienvenida');
    if (seccionBienvenida) {
        seccionBienvenida.style.opacity = 0;
        setTimeout(() => {
            seccionBienvenida.style.transition = 'opacity 1s';
            seccionBienvenida.style.opacity = 1;
        }, 100);
    }

    // Cargar productos desde el JSON
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
            mostrarProductos(paginaActual);
        })
        .catch(error => console.error('Error al cargar productos:', error));

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

    // Flecha para retroceder
    crearItemPaginacion(paginaActual - 1, '&laquo;', false, paginaActual === 1);

    // Números de paginación
    for (let i = 1; i <= totalPaginas; i++) {
        crearItemPaginacion(i, i, i === paginaActual);
    }

    // Flecha para avanzar
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
}
