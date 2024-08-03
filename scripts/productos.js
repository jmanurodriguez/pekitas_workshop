const productos = [
    { nombre: "Desodorante Solido", precio: 2000, imagen: "https://i.ibb.co/CsM13Wr/desodorante-solido-16-11zon.webp" },
    { nombre: "Balsamo Labial", precio: 3000, imagen: "https://i.ibb.co/82nTTrR/balsamo-labial.jpg" },
    { nombre: "Serúm Capilar", precio: 3500, imagen: "https://i.ibb.co/NNCNjyM/nosotros2-25-11zon.webp" },
    { nombre: "Sepillo de Dientes", precio: 3700, imagen: "https://i.ibb.co/41v2mwV/sepillo-32-11zon.webp" },
    { nombre: "Home Spray Sandia", precio: 4000, imagen: "https://i.ibb.co/S6MPbZ9/index-1-17-11zon.webp" },
    { nombre: "Mouse Corporal", precio: 4500, imagen: "https://i.ibb.co/17dCPZc/mouse-corporal-23-11zon.webp" },
    { nombre: "Detergente Solido", precio: 5000, imagen: "https://i.ibb.co/87wkhSM/detergente-solido.webp" },
    { nombre: "Tonico Facial", precio: 5200, imagen: "https://i.ibb.co/whBjt5H/index-4-20-11zon.webp" },
    { nombre: "Jabón Natural", precio: 5500, imagen: "https://i.ibb.co/t48y7GF/jabon-natural1-21-11zon.webp" },
    { nombre: "Jabón Natural Avena", precio: 5500, imagen: "https://i.ibb.co/wrsVWD0/jabon-natural2-22-11zon.webp" },
    { nombre: "Sales de Baño", precio: 7000, imagen: "https://i.ibb.co/SvzmqmF/sales-31-11zon.webp" },
    { nombre: "Vela Aromatica", precio: 7100, imagen: "https://i.ibb.co/zm0hJGX/index-3-19-11zon.webp" },
    { nombre: "Jabón Batido", precio: 8700, imagen: "https://i.ibb.co/7VjXW7b/batido-10-11zon.webp" },
    { nombre: "Post Solar", precio: 9200, imagen: "https://i.ibb.co/98JNp9L/post-solar.webp" },
    { nombre: "Crema Para Peinar de Mango", precio: 10000, imagen: "https://i.ibb.co/hMnP4jD/crema-para-peinar-mango.webp" },
];

// Función para mostrar los productos
const mostrarProductos = () => {
    const contenedorProductos = document.getElementById('productos');
    productos.forEach((producto, index) => {
        const productoCard = document.createElement('div');
        productoCard.className = 'col-md-4 mb-4';
        productoCard.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body text-center">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${index})">Agregar al Carrito</button>
                </div>
            </div>
        `;
        contenedorProductos.appendChild(productoCard);
    });
};

// Función para agregar productos al carrito
const agregarAlCarrito = (index) => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(productos[index]);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: `${productos[index].nombre} ha sido agregado al carrito.`,
        timer: 1500
    });
};

// Llamar a la función para mostrar los productos al cargar la página
document.addEventListener('DOMContentLoaded', mostrarProductos);
