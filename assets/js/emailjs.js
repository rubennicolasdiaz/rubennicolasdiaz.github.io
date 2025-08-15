document.addEventListener("DOMContentLoaded", function () {
    // Inicializar EmailJS (asegurando que la librería ya está cargada)
    
    if (typeof emailjs !== "undefined") {
        emailjs.init("uQlYDcfXVbW_7NCK7"); // tu clave pública
    } else {
        console.error("EmailJS no se ha cargado. Revisa la ruta del script.");
        return;
    }

    const form = document.querySelector(".contact__form");
    if (!form) {
        console.error("No se encontró el formulario con la clase .contact__form");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const submitBtn = form.querySelector(".form__button");
        submitBtn.disabled = true;
        submitBtn.value = "Enviando...";

        // Cambia estos nombres a los que tengas en tu plantilla EmailJS
        let params = {
            from_name: form.querySelector("input[name='name']").value.trim(),
            reply_to: form.querySelector("input[name='email']").value.trim(),
            subject: form.querySelector("input[name='subject']").value.trim(),
            message: form.querySelector("textarea[name='message']").value.trim()
        };

        emailjs.send("service_laskdnasdllaks", "template_vbcxi0p", params)
            .then(() => {
                alert("Email enviado correctamente");
                form.reset();
            })
            .catch(err => {
                console.error("Error al enviar:", err);
                alert("Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde.");
            })
            .finally(() => {
                // Reactivar el botón siempre al final
                submitBtn.disabled = false;
                submitBtn.value = "Enviar mensaje";
            });
    });
});