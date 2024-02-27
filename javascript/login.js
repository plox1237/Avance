const iniciarSesion=()=>{
    let correo=document.getElementById("email").value;
    let contraseña=document.getElementById("password").value;
    if(correo.trim()==="" || contraseña.trim()===""){
        alert("Por favor, rellene todos los espacios")
    }else{
        alert("DEATH")
    }
}