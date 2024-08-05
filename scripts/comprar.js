document.addEventListener('DOMContentLoaded', () => {
    mostrarResumenCompra();
    console.log('Resumen de compra cargado');
});

// ---- Función para mostrar el resumen de la compra ----
function mostrarResumenCompra() {
    const resumenCompra = document.getElementById('resumen-compra');
    let carrito = getCarrito();
    resumenCompra.innerHTML = '';
    let total = 0;

    const template = document.getElementById('carrito-item-template').content;

    carrito.forEach((producto, index) => {
        total += producto.precio;
        const item = document.importNode(template, true);
        item.querySelector('.img-fluid').src = producto.imagen;
        item.querySelector('.img-fluid').alt = producto.nombre;
        item.querySelector('h5').textContent = producto.nombre;
        item.querySelector('p').textContent = `$${producto.precio}`;
        item.querySelector('.btn-danger').setAttribute('onclick', `eliminarDelCarrito(${index})`);
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

    console.log('Resumen de compra actualizado', {
        total,
        descuento,
        totalConDescuento,
        cuotas
    });
}

// ---- Función para eliminar productos del carrito ----
function eliminarDelCarrito(index) {
    let carrito = getCarrito();
    carrito.splice(index, 1);
    setCarrito(carrito);
    mostrarResumenCompra();
    console.log('Producto eliminado del carrito:', index);
}

// ---- Evento para finalizar la compra ----
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
    console.log('Compra finalizada');
});
