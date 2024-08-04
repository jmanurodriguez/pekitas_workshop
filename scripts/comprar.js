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

function mostrarResumenCompra() {
    const resumenCompra = document.getElementById('resumen-compra');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
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
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarResumenCompra();
}

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

document.addEventListener('DOMContentLoaded', mostrarResumenCompra);
