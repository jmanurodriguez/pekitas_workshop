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

    const resumenTotal = document.createElement('div');
    resumenTotal.className = 'text-end';
    resumenTotal.innerHTML = `
        <p>Total: $${total}</p>
        <p>Descuento: ${descuento}%</p>
        <p>Total con descuento: $${totalConDescuento}</p>
        <p>Cuotas: ${cuotas}</p>
    `;
    resumenCompra.appendChild(resumenTotal);
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarResumenCompra();
}

// Finalizar compra
document.getElementById('finalizar-compra').addEventListener('click', () => {
    localStorage.removeItem('carrito');
    Swal.fire({
        icon: 'success',
        title: 'Compra Finalizada',
        text: 'Tu compra se ha realizado con éxito.',
        confirmButtonText: 'OK'
    }).then(() => {
        window.location.href = 'index.html';
    });
});

// Mostrar el resumen de la compra al cargar la página
document.addEventListener('DOMContentLoaded', mostrarResumenCompra);
