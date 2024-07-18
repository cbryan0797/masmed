document.getElementById('consultaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los datos del formulario
    const formData = new FormData(this);

    // Convertir los datos a un objeto
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Mostrar los datos en la consola (puedes enviar estos datos a un servidor usando fetch o AJAX)
    console.log(data);

    // Redirigir a la página de confirmación
    window.location.href = 'consultafinal.html';
});