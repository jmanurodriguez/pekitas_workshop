document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactoForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validar los campos del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        if (!nombre || !apellido || !telefono || !email || !mensaje) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa todos los campos.',
            });
            return;
        }

        if (!validateEmail(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, ingresa un email válido.',
            });
            return;
        }

        // Aquí puedes añadir el código para enviar el formulario usando AJAX o Fetch API

        // Mostrar mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: 'Enviado',
            text: 'Tu mensaje ha sido enviado con éxito.',
        });

        // Resetear el formulario
        form.reset();
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
