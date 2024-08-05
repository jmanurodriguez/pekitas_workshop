// ---- Funciones para el manejo del carrito ----
const getCarrito = () => JSON.parse(localStorage.getItem('carrito')) || [];
const setCarrito = (carrito) => localStorage.setItem('carrito', JSON.stringify(carrito));

// ---- Función para renderizar productos ----
const renderProductos = (pagina) => {
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = "";
    const fragment = document.createDocumentFragment();
    const template = document.getElementById('producto-template').content;

    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;

    productos.slice(inicio, fin).forEach((producto, index) => {
        const productoCard = document.importNode(template, true);
        productoCard.querySelector('.card-img-top').src = producto.imagen;
        productoCard.querySelector('.card-img-top').alt = producto.nombre;
        productoCard.querySelector('.card-title').textContent = producto.nombre;
        productoCard.querySelector('.card-text').textContent = `$${producto.precio}`;
        productoCard.querySelector('.btn-primary').setAttribute('onclick', `agregarAlCarrito(${index + inicio})`);
        fragment.appendChild(productoCard);
    });

    contenedorProductos.appendChild(fragment);
    mostrarPaginacion(pagina);
    console.log('Productos renderizados para la página:', pagina);
};

// ---- Función para mostrar la paginación ----
const mostrarPaginacion = (paginaActual) => {
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
                renderProductos(pagina);
            });
        }
        contenedorPaginacion.appendChild(itemPaginacion);
    };

    crearItemPaginacion(paginaActual - 1, '&laquo;', false, paginaActual === 1);

    for (let i = 1; i <= totalPaginas; i++) {
        crearItemPaginacion(i, i, i === paginaActual);
    }

    crearItemPaginacion(paginaActual + 1, '&raquo;', false, paginaActual === totalPaginas);
    console.log('Paginación mostrada:', { paginaActual, totalPaginas });
};

// ---- Función para agregar un producto al carrito ----
const agregarAlCarrito = (index) => {
    let carrito = getCarrito();
    carrito.push(productos[index]);
    setCarrito(carrito);
    Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: `${productos[index].nombre} ha sido agregado al carrito.`,
        timer: 1500
    });
    actualizarContadorCarrito();
    console.log('Producto agregado al carrito:', productos[index]);
};

// ---- Función para mostrar los productos del carrito ----
const mostrarCarrito = () => {
    const itemsCarrito = document.getElementById('items-carrito');
    let carrito = getCarrito();
    itemsCarrito.innerHTML = '';
    let total = 0;

    const template = document.getElementById('carrito-item-template').content;

    carrito.forEach((producto, index) => {
        total += producto.precio;
        const item = document.importNode(template, true);
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
    console.log('Carrito mostrado con productos:', carrito);
};

// ---- Función para eliminar un producto del carrito ----
const eliminarDelCarrito = (index) => {
    let carrito = getCarrito();
    carrito.splice(index, 1);
    setCarrito(carrito);
    mostrarCarrito();
    actualizarContadorCarrito();
    console.log('Producto eliminado del carrito:', index);
};

// ---- Función para calcular descuentos y cuotas ----
const calcularDescuentosYCuotas = (totalCompra) => {
    if (totalCompra >= 65000) return { cuotas: 12, descuento: 15 };
    if (totalCompra >= 50000) return { cuotas: 12, descuento: 10 };
    if (totalCompra >= 40000) return { cuotas: 6, descuento: 10 };
    if (totalCompra >= 30000) return { cuotas: 6, descuento: 5 };
    if (totalCompra >= 20000) return { cuotas: 3, descuento: 5 };
    if (totalCompra >= 15000) return { cuotas: 3, descuento: 0 };
    return { cuotas: 0, descuento: 0 };
};

// ---- Función para aplicar el descuento ----
const aplicarDescuento = (total, descuento) => total - (total * descuento / 100);
