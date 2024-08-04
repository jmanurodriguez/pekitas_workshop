// Función para calcular descuentos y cuotas
function calcularDescuentosYCuotas(totalCompra) {
    if (totalCompra >= 65000) return { cuotas: 12, descuento: 15 };
    if (totalCompra >= 50000) return { cuotas: 12, descuento: 10 };
    if (totalCompra >= 40000) return { cuotas: 6, descuento: 10 };
    if (totalCompra >= 30000) return { cuotas: 6, descuento: 5 };
    if (totalCompra >= 20000) return { cuotas: 3, descuento: 5 };
    if (totalCompra >= 15000) return { cuotas: 3, descuento: 0 };
    return { cuotas: 0, descuento: 0 };
}

// Función de orden superior para aplicar descuentos
const aplicarDescuento = (total, descuento) => total - (total * descuento / 100);

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    const itemsCarrito = document.getElementById('items-carrito');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    itemsCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((producto, index) => {
        total += producto.precio;
        const item = document.createElement('div');
        item.className = 'row mb-3';
        item.innerHTML = `
            <div class="col-4">
                <img src="${producto.imagen}" class="img-fluid" alt="${producto.nombre}">
            </div>
            <div class="col-4">
                <h5>${producto.nombre}</h5>
                <p>$${producto.precio}</p>
            </div>
            <div class="col-4 text-end">
                <button class="btn btn-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </div>
        `;
        itemsCarrito.appendChild(item);
    });

    const { cuotas, descuento } = calcularDescuentosYCuotas(total);
    const totalConDescuento = aplicarDescuento(total, descuento);

    document.getElementById('total').innerText = `Total: $${total} \n Descuento: ${descuento}% \n Total con descuento: $${totalConDescuento} \n Cuotas: ${cuotas}`;
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarContadorCarrito();
}

// Redirigir a la página de compra al hacer clic en "Proceder al Pago"
document.getElementById('pagar').addEventListener('click', () => {
    window.location.href = 'comprar.html';
});

// Mostrar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', mostrarCarrito);

// Actualizar el contador del carrito
document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = carrito.length;
}
