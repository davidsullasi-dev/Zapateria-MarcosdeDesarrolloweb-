const productoModal = document.getElementById('productoModal');

productoModal.addEventListener('show.bs.modal', function(event){

    const button = event.relatedTarget;

    const nombre = button.getAttribute('data-nombre');
    const imagen = button.getAttribute('data-imagen');
    const precio = button.getAttribute('data-precio');
    const descripcion = button.getAttribute('data-descripcion');

    document.getElementById('modalNombre').textContent = nombre;

    document.getElementById('modalImagen').src = '/img/' + imagen;

    document.getElementById('modalPrecio').textContent = 'S/ ' + precio;

    document.getElementById('modalDescripcion').textContent = descripcion;
});