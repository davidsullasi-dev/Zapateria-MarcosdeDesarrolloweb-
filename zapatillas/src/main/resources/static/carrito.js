// ==================== CARRITO DE COMPRAS ====================
// Sistema de carrito con localStorage y máximo 5 unidades por producto
// Código limpio y comentado para facilitar el mantenimiento y comprensión

document.addEventListener('DOMContentLoaded', () => {

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const botones = document.querySelectorAll('.agregar-carrito');

    // =========================
    // AGREGAR PRODUCTOS
    // =========================

    botones.forEach(btn => {

        btn.addEventListener('click', () => {

            const producto = {

                id: btn.dataset.id,
                nombre: btn.dataset.nombre,
                precio: parseFloat(btn.dataset.precio)

            };

            carrito.push(producto);

            localStorage.setItem('carrito', JSON.stringify(carrito));

            actualizarBadge();

            renderCarrito();

            alert(producto.nombre + ' agregado al carrito');

        });

    });

    // =========================
    // ACTUALIZAR CONTADOR
    // =========================

    function actualizarBadge(){

        const badge = document.getElementById('cart-badge');

        if(!badge) return;

        badge.textContent = carrito.length;

        badge.classList.toggle('d-none', carrito.length === 0);
    }

    // =========================
    // RENDER CARRITO
    // =========================

    function renderCarrito(){

        const container = document.getElementById('cart-items-container');

        const totalDiv = document.getElementById('cart-total');

        const empty = document.getElementById('cart-empty');

        if(!container) return;

        container.innerHTML = '';

        // CARRITO VACÍO
        if(carrito.length === 0){

            empty.style.display = 'block';

            totalDiv.textContent = 'Total: S/ 0';

            return;
        }

        empty.style.display = 'none';

        let total = 0;

        carrito.forEach((producto, index) => {

            total += producto.precio;

            const item = document.createElement('div');

            item.className =
                'd-flex justify-content-between align-items-center border-bottom py-2';

            item.innerHTML = `

                <div>

                    <h6 class="mb-0">${producto.nombre}</h6>

                    <small class="text-muted">
                        S/ ${producto.precio}
                    </small>

                </div>

                <button class="btn btn-danger btn-sm eliminar-item"
                        data-index="${index}">

                    <i class="bi bi-trash"></i>

                </button>
            `;

            container.appendChild(item);
        });

        totalDiv.textContent = 'Total: S/ ' + total;

        // =========================
        // ELIMINAR PRODUCTOS
        // =========================

        const eliminarBtns =
            document.querySelectorAll('.eliminar-item');

        eliminarBtns.forEach(btn => {

            btn.addEventListener('click', () => {

                const index = btn.dataset.index;

                carrito.splice(index, 1);

                localStorage.setItem(
                    'carrito',
                    JSON.stringify(carrito)
                );

                actualizarBadge();

                renderCarrito();

            });

        });

    }

    // =========================
    // INICIALIZAR
    // =========================

    actualizarBadge();

    renderCarrito();

});