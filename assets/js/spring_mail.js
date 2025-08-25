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


        // Declaramos la variable Toast y enviamos el mensaje que mostrará. 
        // Con esta variable una vez haya respuestas a la petición HTTP finalizará el toast.
        let toast = showToast("Enviando email. Podría tardar algunos segundos...");

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

            toast.style.opacity = "0";
            toast.addEventListener("transitionend", () => toast.remove());
            
        });
    });
});

function showToast(message) {
    // Crear div
    const toast = document.createElement("div");
    toast.innerText = message;

    // Estilos inline
    Object.assign(toast.style, {
    position: "fixed",          
    top: "50%",                
    left: "50%",                
    transform: "translate(-50%, -50%)", 
    background: "rgba(0,0,0,0.8)",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "6px",
    fontFamily: "sans-serif",
    zIndex: 10000,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    opacity: "0",
    transition: "opacity 0.5s"
});

    document.body.appendChild(toast);

    // Animación de aparición
    requestAnimationFrame(() => {
        toast.style.opacity = "1";
    });

    // Devolver el div para poder manipularlo después en una variable
    return toast;
}