document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactoForm');
    console.log('Formulario de contacto cargado');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

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
            console.log('Error: Campos incompletos en el formulario');
            return;
        }

        if (!validateEmail(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, ingresa un email válido.',
            });
            console.log('Error: Email inválido ingresado');
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Enviado',
            text: 'Tu mensaje ha sido enviado con éxito.',
        });
        console.log('Formulario enviado con éxito');

        form.reset();
    });

    // ---- Función para validar el email ----
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
