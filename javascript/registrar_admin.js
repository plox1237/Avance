// Función para validar el formulario de registro
const registrarUsuario = (event) => {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los valores de los campos del formulario
    let nombre = document.getElementById("name").value;
    let apellido = document.getElementById("apellido").value;
    let tipoDoc=document.getElementById("tipoDoc").value;
    let docIdentidad = document.getElementById("ticc").value;
    let correo = document.getElementById("emailInput").value;
    let contraseña = document.getElementById("passw").value;
    let genero = document.querySelector('input[name="gender"]:checked');
    let tipoUsuario = document.querySelector('input[name="tipoUser"]:checked');

    // Definir expresiones regulares para validar los campos
    const letrasRegex = /^[a-zA-Z]+$/;
    const numerosRegex = /^[0-9]+$/;
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contraseñaRegex = /^(?=.*\d{3})(?=.*[a-zA-Z]{5})(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*[A-Z]).{12,}$/;

    // Arreglo para almacenar los mensajes de error
    let mensajesErrores = [];

    // Validar el nombre
    if (nombre.trim() === "" || !letrasRegex.test(nombre)) {
        mensajesErrores.push("El nombre no puede estar vacío y solo puede contener letras.");
    }

    // Validar el apellido
    if (apellido.trim() === "" || !letrasRegex.test(apellido)) {
        mensajesErrores.push("El apellido no puede estar vacío y solo puede contener letras.");
    }

    // Validar el documento de identidad
    if (!numerosRegex.test(docIdentidad)) {
        mensajesErrores.push("El documento de identidad debe contener solo números.");
    }

    // Validar el correo electrónico
    if (correo.trim() === "" || !correoRegex.test(correo)) {
        mensajesErrores.push("El correo electrónico debe tener un formato válido.");
    }

    // Validar la contraseña
    if (contraseña.trim() === "" || !contraseñaRegex.test(contraseña)) {
        mensajesErrores.push("La contraseña debe tener al menos 12 caracteres, incluyendo al menos 3 números, 5 letras, 1 minúscula, 1 mayúscula y 1 carácter especial.");
    }

    // Validar el género
    if (!genero) {
        mensajesErrores.push("Por favor, seleccione su género.");
    }

    // Validar el tipo de usuario
    if (!tipoUsuario) {
        mensajesErrores.push("Por favor, seleccione el tipo de usuario.");
    }

    // Mostrar mensajes de error si existen
    if (mensajesErrores.length > 0) {
        mostrarMensajesError(mensajesErrores);
    } else {
        axios.post()
        alert("Usuario registrado exitosamente");
    }
}

// Función para mostrar los mensajes de error en el formulario
const mostrarMensajesError = (mensajesErrores) => {
    // Obtener el contenedor de mensajes de error
    let erroresContainer = document.getElementById("errores-container");
    // Limpiar los mensajes de error anteriores
    erroresContainer.innerHTML = "";
    // Crear elementos de lista para cada mensaje de error y agregarlos al contenedor
    mensajesErrores.forEach(mensaje => {
        let errorItem = document.createElement("li");
        errorItem.textContent = mensaje;
        erroresContainer.appendChild(errorItem);
    });
}

// Función para alternar la visibilidad de la contraseña
const togglePassword = () => {
    const passInput = document.getElementById("passw");
    if (passInput.type === "password") {
        passInput.type = "text";
    } else {
        passInput.type = "password";
    }
}

// Agregar evento de clic al botón de registro
document.querySelector("#registro-form button[type='submit']").addEventListener("click", registrarUsuario);
