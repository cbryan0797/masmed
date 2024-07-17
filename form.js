// Formulario de pago
document.addEventListener("DOMContentLoaded", function() {
    var pagarBtn = document.getElementById("submitBtn");

    pagarBtn.addEventListener("click", function(event) {
        event.preventDefault();
        var mensajePopup = document.createElement("div");
        mensajePopup.innerHTML = "Pedido realizado con éxito! Revise su correo para el seguimiento.";
        mensajePopup.classList.add("popup");
        document.body.appendChild(mensajePopup);
        setTimeout(function() {
            window.location.href = "index.html";
        }, 3000);
    });
});