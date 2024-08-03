// carritoManager.js
const carritoManager = (() => {
    const getCarrito = () => {
        try {
            return JSON.parse(localStorage.getItem('carrito')) || [];
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            return [];
        }
    };

    const setCarrito = (carrito) => {
        try {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        } catch (error) {
            console.error('Error al guardar el carrito:', error);
        }
    };

    const agregarProducto = (producto) => {
        const carrito = getCarrito();
        carrito.push(producto);
        setCarrito(carrito);
    };

    const eliminarProducto = (index) => {
        const carrito = getCarrito();
        carrito.splice(index, 1);
        setCarrito(carrito);
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const obtenerTotal = () => {
        const carrito = getCarrito();
        return carrito.reduce((total, producto) => total + producto.precio, 0);
    };

    return {
        getCarrito,
        agregarProducto,
        eliminarProducto,
        vaciarCarrito,
        obtenerTotal,
    };
})();
