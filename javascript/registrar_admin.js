// Función para validar el formulario de registro
const registrarUsuario = (event) => {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los valores de los campos del formulario
    let formulario=document.getElementById("registro-form");
    let nombre = document.getElementById("name").value;
    let apellido = document.getElementById("apellido").value;
    let tipoDoc=document.getElementById("tipoDoc").value;
    let docIdentidad = document.getElementById("ticc").value;
    let correo = document.getElementById("emailInput").value;
    let contraseña = document.getElementById("passw").value;
    let genero;
    let tipoUsuario;

    const revisarRadio=()=>{
        let radios = document.getElementsByName("gender");
        radios.forEach(radio => {
            if(radio.checked){
                genero=radio.value;
            }
        });
        return genero;
    }
    genero=revisarRadio();
    
    const revisarUser=()=>{
        let radios=document.getElementsByName("tipoUser");
        radios.forEach(radio=>{
            if(radio.checked){
                tipoUsuario=radio.value;
            }
        })
        return tipoUsuario;
    }
    tipoUsuario=revisarUser();
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
    if (genero==null) {
        mensajesErrores.push("Por favor, seleccione su género.");
    }

    // Validar el tipo de usuario
    if (tipoUsuario==null) {
        mensajesErrores.push("Por favor, seleccione el tipo de usuario.");
    }

    // Mostrar mensajes de error si existen
    if (mensajesErrores.length > 0) {
        mostrarMensajesError(mensajesErrores);
    } else {
        const datos={
            tipoDoc: tipoDoc,
            docIdentidad: docIdentidad,
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            contraseña: contraseña,
            genero: genero,
            tipoUser: tipoUsuario
        };
        axios.post("http://127.0.0.1:5000/registrarUsuario",datos)
        .then(response=>{
            if(response.data.mensaje=="Registro realizado exitosamente"){
                Swal.fire({
                    title:"Registro realizado correctamente",
                    icon:"success",
                    text:"El registro fue realizado de manera exitosamente.",
                    confirmButtonColor: "#ffc107",
                    allowOutsideClick:false
                }).then((result)=>{
                    if(result.isConfirmed){
                        formulario.reset();
                    }
                });
            }
        })
        .catch(error=>{
            console.log("ERROR SUCEDIDO DURANTE EL REGISTRO: \n"+error);
            Swal.fire({
                title:"Error durante el registro",
                icon:"error",
                text:"Ha sucedido un error durante el proceso de registro del usuario",
                confirmButtonColor: "#ffc107"
            });
        })
    }
}
const regresar=()=>{
    Swal.fire({
        title:"¿Desea salir?",
        icon:"question",
        text:"Los datos introducidos no se guardaran.",
        showDenyButton:true,
        denyButtonText:"No",
        confirmButtonText:"Si",
        confirmButtonColor: "#ffc107"
    }).then((result)=>{
        if(result.isConfirmed){
            window.location.href="usuarios-admin.html"
        }
    })
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


