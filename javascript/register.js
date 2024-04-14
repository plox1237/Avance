const registrarUsuario=(event)=>{
    event.preventDefault();

    let formulario=document.getElementById("formRegister")
    let nombre=document.getElementById("name").value;
    let apellido=document.getElementById("apellido").value;
    let docIdentidad=document.getElementById("doc").value;
    let correo=document.getElementById("emailInput").value;
    let contraseña = document.getElementById("passw").value;
    let genero;
    let tipoDoc=document.getElementById("tipoDoc").value;

    const revisarRadio = () => {
        let radios = document.getElementsByName("gender");
        radios.forEach(radio => {
            if (radio.checked) {
                genero = radio.value;
            }
        });
        return genero;
    }
    genero = revisarRadio();

    const letrasRegex = /^[a-zA-Z]+$/;
    const numerosRegex = /^[0-9]+$/;
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contraseñaRegex = /^(?=.*\d{3})(?=.*[a-zA-Z]{5})(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*[A-Z]).{12,}$/;

    let mensajesErrores = [];

    if (nombre.trim() === "" || !letrasRegex.test(nombre)) {
        mensajesErrores.push("El nombre no puede estar vacío y solo puede contener letras.");
    }

    if (apellido.trim() === "" || !letrasRegex.test(apellido)) {
        mensajesErrores.push("El apellido no puede estar vacío y solo puede contener letras.");
    }

    if (!numerosRegex.test(docIdentidad)) {
        mensajesErrores.push("El documento de identidad debe contener solo números.");
    }

    if (correo.trim() === "" || !correoRegex.test(correo) || !correo.includes("unibarranquilla.edu.co")) {
        mensajesErrores.push("El correo electrónico institucional debe tener un formato válido.");
    }

    if (contraseña.trim() === "" || !contraseñaRegex.test(contraseña)) {
        mensajesErrores.push("La contraseña debe tener al menos 12 caracteres, incluyendo al menos 3 números, 5 letras, 1 minúscula, 1 mayúscula y 1 carácter especial.");
    }

    if (genero == null) {
        mensajesErrores.push("Por favor, seleccione su género.");
    }

    const erroresContainer = document.getElementById("errores-container");
    erroresContainer.innerHTML = ""; // Limpiar los mensajes de errores anteriores

    if (mensajesErrores.length > 0) {
        mensajesErrores.forEach(mensaje => {
            const errorItem = document.createElement("li");
            errorItem.textContent = mensaje;
            erroresContainer.appendChild(errorItem);
        });
    } else {
        const datos={
            tipoDoc: tipoDoc,
            docIdentidad: docIdentidad,
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            contraseña: contraseña,
            genero: genero,
            tipoUser: "1"
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
            }else if(response.data.mensaje=="Usuario ya existente"){
                Swal.fire({
                    title:"Error durante el registro",
                    icon:"error",
                    text:"Ya existe un usuario con ese correo y/o numero de identificacion.",
                    confirmButtonColor: "#ffc107"
                });
            }
        })
        .catch(error=>{
            console.error("ERROR AL REGISTRAR "+error);
            alert("Hubo un error al registrar el usuario")
        })
    }
}

const togglePassword = () => {
    const passInput = document.getElementById("passw");
    if (passInput.type === "password") {
        passInput.type = "text";
    } else {
        passInput.type = "password";
    }
}



