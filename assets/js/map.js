document.addEventListener("DOMContentLoaded", (event) => {
    
    setTimeout(() => {
        document.querySelector("#load-iframe-map").innerHTML = `
         <iframe class="contact__iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d25541.806897087874!2d-2.462525!3d36.849041!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1754830690937!5m2!1ses!2ses"></iframe>
    `;
    }, 500);
});

