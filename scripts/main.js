
// Función para mostrar los productos en la página principal
function mostrarProductos() {
    const contenedorProductos = document.getElementById('productos');
    productos.forEach((producto, index) => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card">
                <img src="https://via.placeholder.com/150" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${index})">Agregar al Carrito</button>
                </div>
            </div>
        `;
        contenedorProductos.appendChild(card);
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
mostrarProductos();
