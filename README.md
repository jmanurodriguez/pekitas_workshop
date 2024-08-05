# Pekitas Ecotienda

Pekitas Ecotienda es una tienda en línea dedicada a ofrecer productos naturales, sostenibles y biodegradables. Este proyecto incluye una interfaz de usuario atractiva y funcionalidades como la visualización de productos, un carrito de compras interactivo y un formulario de contacto.

## Características

- **Visualización de Productos:** Muestra una lista de productos con imágenes, nombres y precios.
- **Carrito de Compras:** Permite a los usuarios agregar productos al carrito, ver el resumen de compra y finalizar la compra.
- **Formulario de Contacto:** Los usuarios pueden enviar consultas a través de un formulario de contacto.
- **Filtrado y Búsqueda de Productos:** Facilita la búsqueda y filtrado de productos por nombre y categorías.

## Estructura del Proyecto

css/
└── styles.css # Estilos CSS para el sitio
scripts/
├── comprar.js # Lógica para el resumen de compra y finalización
├── formulario.js # Validación y envío del formulario de contacto
├── main.js # Configuración inicial y eventos de la página principal
├── productos.js # Carga y visualización de productos
└── utilidades.js # Funciones auxiliares para manejo del carrito y renderización de productos
index.html # Página principal
productos.json # Datos de productos



## Tecnologías Utilizadas

- **HTML5:** Para la estructura y el contenido de la página.
- **CSS3:** Para el diseño y la presentación visual.
- **JavaScript:** Para la lógica del lado del cliente y la interacción dinámica.
- **Bootstrap 5:** Para un diseño responsivo y componentes UI.
- **SweetAlert2:** Para alertas y diálogos modales atractivos.
- **Font Awesome:** Para los iconos.
- **JSON:** Para los datos de los productos.
- **Canva:** Para la creación de banners y elementos visuales.

## Requisitos

- **Navegador Web:** Cualquier navegador moderno (Chrome, Firefox, Edge, Safari).
- **Servidor Local (Opcional):** Para evitar problemas de CORS, se recomienda usar un servidor local como Live Server de VSCode.

## Instalación y Uso

1. **Clonar el Repositorio:**
   ```bash
   git clone https://github.com/jmanurodriguez/pekitas-ecotienda.git
   cd pekitas-ecotienda
