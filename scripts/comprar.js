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

// Función para mostrar el resumen de la compra
function mostrarResumenCompra() {
    const resumenCompra = document.getElementById('resumen-compra');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    resumenCompra.innerHTML = '';
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
        resumenCompra.appendChild(item);
    });

    const { cuotas, descuento } = calcularDescuentosYCuotas(total);
    const totalConDescuento = aplicarDescuento(total, descuento);

    const totalElement = document.createElement('p');
    totalElement.className = 'total-descuentos';
    totalElement.innerHTML = `Total: $${total} <br> Descuento: ${descuento}% <br> Total con descuento: $${totalConDescuento} <br> Cuotas: ${cuotas}`;
    resumenCompra.appendChild(totalElement);
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarResumenCompra();
}

// Función para finalizar la compra
function finalizarCompra() {
    Swal.fire({
        title: 'Compra Finalizada',
        text: 'Gracias por tu compra. Pronto recibirás un correo con los detalles.',
        icon: 'success'
    }).then(() => {
        localStorage.removeItem('carrito');
        window.location.href = 'index.html';
    });
}

// Mostrar el resumen de la compra al cargar la página
mostrarResumenCompra();

// Añadir evento al botón de finalizar compra
document.getElementById('finalizar-compra').addEventListener('click', finalizarCompra);
