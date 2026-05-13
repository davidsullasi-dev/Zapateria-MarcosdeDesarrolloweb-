document.addEventListener("DOMContentLoaded", function() {

  const registroForm = document.getElementById("registroForm");
  const loginContainer = document.getElementById("loginContainer");
  const loginForm = document.getElementById("loginForm");

  //  NAVBAR
  const navUser = document.getElementById("navUser");
  const userName = document.getElementById("userName");
  const navLogout = document.getElementById("navLogout");
  const logoutBtnNav = document.getElementById("logoutBtnNav");

  // REGISTRO
  registroForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden ❌");
      return;
    }

    localStorage.setItem("usuario", JSON.stringify({ nombre, email, password }));

    alert("Registro exitoso ✅");

    // Mostrar login
    registroForm.classList.add("d-none");
    loginContainer.classList.remove("d-none");
    document.getElementById("tituloRegistro").classList.add("d-none");
  });

  // LOGIN
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const user = JSON.parse(localStorage.getItem("usuario"));

    if (user && user.email === email && user.password === password) {
      localStorage.setItem("sesionActiva", "true");

      alert("Bienvenido " + user.nombre);
      alert("Bienvenido " + user.nombre);

//  OCULTAR TODO EL FORMULARIO
document.getElementById("registro").classList.add("d-none");

      //  MOSTRAR EN NAVBAR
      userName.textContent = "Hola, " + user.nombre;
      navUser.classList.remove("d-none");
      navLogout.classList.remove("d-none");

    } else {
      alert("Datos incorrectos ❌");
    }
  });

  // LOGOUT DESDE NAVBAR
  logoutBtnNav.addEventListener("click", function() {
  localStorage.removeItem("sesionActiva");

  navUser.classList.add("d-none");
  navLogout.classList.add("d-none");

  //  VOLVER A MOSTRAR FORMULARIO
  const formSection = document.getElementById("registro");
  formSection.style.opacity = "0";
formSection.classList.remove("d-none");

setTimeout(() => {
  formSection.style.opacity = "1";
}, 100);

  //  Mostrar registro otra vez
  document.getElementById("registroForm").classList.remove("d-none");
  document.getElementById("loginContainer").classList.add("d-none");

  //  Restaurar título
  document.getElementById("tituloRegistro").classList.remove("d-none");

  alert("Sesión cerrada");
});

  // MANTENER SESIÓN AL RECARGAR
  const user = JSON.parse(localStorage.getItem("usuario"));

  if (localStorage.getItem("sesionActiva") && user) {
    userName.textContent = "Hola, " + user.nombre;
    navUser.classList.remove("d-none");
    navLogout.classList.remove("d-none");
  }

});