document.addEventListener('DOMContentLoaded', () => {
    const promoModalElement = document.getElementById('promoModal');
    if (promoModalElement) {
        const promoModal = new bootstrap.Modal(promoModalElement);
        promoModal.show();
    }

    const seccionBienvenida = document.querySelector('.seccion-bienvenida');
    if (seccionBienvenida) {
        seccionBienvenida.style.opacity = 0;
        setTimeout(() => {
            seccionBienvenida.style.transition = 'opacity 1s';
            seccionBienvenida.style.opacity = 1;
        }, 100);
    }

    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
            mostrarProductos(paginaActual);
            actualizarContadorCarrito();
        })
        .catch(error => console.error('Error al cargar productos:', error));

    document.body.addEventListener('click', () => {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }, { once: true });

    actualizarContadorCarrito();

    document.querySelector('#carrito-link').addEventListener('click', (e) => {
        e.preventDefault();
        mostrarCarritoEnModal();
    });

    document.getElementById('finalizar-compra').addEventListener('click', finalizarCompra);
});

function mostrarProductos(pagina) {
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = "";

    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;

    productos.slice(inicio, fin).forEach((producto, index) => {
        const productoCard = document.querySelector('#producto-template').content.cloneNode(true);
        productoCard.querySelector('.card-img-top').src = producto.imagen;
        productoCard.querySelector('.card-img-top').alt = producto.nombre;
        productoCard.querySelector('.card-title').textContent = producto.nombre;
        productoCard.querySelector('.card-text').textContent = `$${producto.precio}`;
        productoCard.querySelector('.btn-primary').onclick = () => agregarAlCarrito(index + inicio);
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

function mostrarCarritoEnModal() {
    const carritoModalElement = document.getElementById('carritoModal');
    const carritoModal = new bootstrap.Modal(carritoModalElement);
    mostrarCarrito();
    carritoModal.show();
}

function mostrarCarrito() {
    const itemsCarrito = document.getElementById('items-carrito');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    itemsCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((producto, index) => {
        total += producto.precio;
        const item = document.querySelector('#carrito-item-template').content.cloneNode(true);
        item.querySelector('.img-fluid').src = producto.imagen;
        item.querySelector('.img-fluid').alt = producto.nombre;
        item.querySelector('h5').textContent = producto.nombre;
        item.querySelector('p').textContent = `$${producto.precio}`;
        item.querySelector('.btn-danger').onclick = () => eliminarDelCarrito(index);
        itemsCarrito.appendChild(item);
    });

    const { cuotas, descuento } = calcularDescuentosYCuotas(total);
    const totalConDescuento = aplicarDescuento(total, descuento);

    document.getElementById('total').innerText = `Total: $${total} \n Descuento: ${descuento}% \n Total con descuento: $${totalConDescuento} \n Cuotas: ${cuotas}`;
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarContadorCarrito();
}

function calcularDescuentosYCuotas(totalCompra) {
    if (totalCompra >= 65000) return { cuotas: 12, descuento: 15 };
    if (totalCompra >= 50000) return { cuotas: 12, descuento: 10 };
    if (totalCompra >= 40000) return { cuotas: 6, descuento: 10 };
    if (totalCompra >= 30000) return { cuotas: 6, descuento: 5 };
    if (totalCompra >= 20000) return { cuotas: 3, descuento: 5 };
    if (totalCompra >= 15000) return { cuotas: 3, descuento: 0 };
    return { cuotas: 0, descuento: 0 };
}

const aplicarDescuento = (total, descuento) => total - (total * descuento / 100);

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
}

