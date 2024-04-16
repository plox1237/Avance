const enviarCorreo=()=>{
    const token=localStorage.getItem("token");
    let correo=document.getElementById("correo").value;
    if(correo.trim()===""){
        Swal.fire({
            title:"Espacio vacio",
            icon:"warning",
            text:"El espacio no puede estar vacio. Por favor, introduzca una direccion de correo institucional valida.",
            confirmButtonColor: "#ffc107"
        });
    }else if(!correo.includes("@unibarranquilla.edu.co")){
        Swal.fire({
            title:"Correo invalido",
            icon:"warning",
            text:"La direccion de correo eletronico no es valida. Por favor, introduzca una direccion de correo electronico institucional valido.",
            confirmButtonColor: "#ffc107"
        });
    }else{
        dato={
            "Correo":correo
        };
        axios.post("http://127.0.0.1:5000/enviarCorreo",dato)
        .then(response=>{
            if(response.data.mensaje=="El correo fue enviado exitosamente"){
                Swal.fire({
                    title:"Correo enviado",
                    icon:"success",
                    text:"Se ha enviado un correo a su direccion de correo electronico institucional para cambiar su contraseña.",
                    confirmButtonColor: "#ffc107"
                });
            }else if(response.data.mensaje=="Hubo un error al mandar el mensaje"){
                Swal.fire({
                    title:"Error al enviar el correo",
                    icon:"error",
                    title:"Se ha producido un error al enviar el correo.",
                    confirmButtonColor: "#ffc107"
                });
            }
        })
        .catch(error=>{
            console.error("Se ha producido un error en el momento de enviar el correo \n"+error);
            Swal.fire({
                title:"Error fatal",
                icon:"error",
                text:"Se ha producido un error grave al enviar el correo",
                confirmButtonColor: "#ffc107"
            });
        })  
    }
}