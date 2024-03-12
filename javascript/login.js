const iniciarSesion=(event)=>{
    event.preventDefault();

    let correo=document.getElementById("email").value;
    let contraseña=document.getElementById("passw").value;
    if(correo.trim()==="" || contraseña.trim()===""){
        alert("Por favor, rellene todos los espacios")
    }else{
        const datos ={
            correo:correo,
            contraseña:contraseña
        };
        axios.post("http://127.0.0.1:5000/iniciarSesion",datos)
        .then(response=>{
            if (response.data.mensaje=="Usuario no existente"){
                alert("Correo o/y contraseña incorrectos");
            }else{
                url=response.data.link;
                window.location.replace(url)
            }
        })
        .catch(error=>{
            console.error("ERROR AL INICIAR SESION: "+error);
            alert("Error al iniciar sesion")
        })
    }
}
const togglePassword=()=>{
    const passInput=document.getElementById("passw");
    if(passInput.type==="password") {
        passInput.type="text";
    }else{
        passInput.type="password";
    }
}