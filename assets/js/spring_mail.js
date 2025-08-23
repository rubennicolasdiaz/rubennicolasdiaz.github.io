document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact__form");
    if (!form) {
        console.error("No se encontró el formulario con la clase .contact__form");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Validación HTML5
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const submitBtn = form.querySelector(".form__button");
        submitBtn.disabled = true;
        submitBtn.value = "Enviando...";

        // Construimos el body para Spring Boot
        const body = {
            name: form.querySelector("input[name='name']").value.trim(),
            email: form.querySelector("input[name='email']").value.trim(),
            subject: form.querySelector("input[name='subject']").value.trim(),
            message: form.querySelector("textarea[name='message']").value.trim()
        };

        // Petición POST al backend
        fetch("https://spring-boot-email.onrender.com/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la petición: " + response.status);
            }
            return response.text();
        })
        .then(data => {
            alert("Email enviado correctamente");
            form.reset();
        })
        .catch(err => {
            console.error("Error al enviar:", err);
            alert("Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde.");
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.value = "Enviar mensaje";
        });
    });
});