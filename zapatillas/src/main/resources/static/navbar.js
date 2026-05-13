document.addEventListener('DOMContentLoaded', () => {

    const nombreSpan = document.getElementById('nombreUsuario');

    if(nombreSpan){

        const email = nombreSpan.dataset.email;

        const nombre = email.split('@')[0];

        nombreSpan.textContent = nombre;
    }

});