const historial=()=>{
    const token=localStorage.getItem('token')
    axios.get("http://127.0.0.1:5000/interfazProtegida",{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    .then(response=>{
        if(response.data.mensaje=="Token valido"){
            window.location.href="http://localhost/DeathofUs/html/historial.html"
        }else if(response.data.mensaje=="Token no existente" || response.data.mensaje=="Token invalido" || response.data.mensaje=="Token expirado"){
            localStorage.removeItem('token');
            localStorage.removeItem("NombreUsuario");
            localStorage.removeItem("ApellidoUsuario");
            localStorage.removeItem("GeneroUsuario");
            localStorage.removeItem("usuarioID");
            Swal.fire({
                title:"Su sesion caduco",
                icon:"error",
                text:"Su sesion ha caducado, por favor ingrese otra vez.",
                allowOutsideClick:false,
                confirmButtonColor: "#ffc107"
            }).then((result)=>{
                if(result.isConfirmed){
                    window.location.replace("http://localhost/DeathofUs/index.html")
                }
            });
        }
    })
    .catch(error=>{
        console.error("Se produjo un error \n"+error);
        Swal.fire({
            title:"Ha ocurrido un error",
            icon:"error",
            text:"Se ha producido un error grave",
            confirmButtonColor: "#ffc107"
        });
    });
}
const historialAdmin=()=>{
    const token=localStorage.getItem('token')
    axios.get("http://127.0.0.1:5000/interfazProtegida",{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    .then(response=>{
        if(response.data.mensaje=="Token valido"){
            window.location.href="http://localhost/DeathofUs/html/historial-admin.html"
        }else if(response.data.mensaje=="Token no existente" || response.data.mensaje=="Token invalido" || response.data.mensaje=="Token expirado"){
            localStorage.removeItem('token');
            localStorage.removeItem("NombreUsuario");
            localStorage.removeItem("ApellidoUsuario");
            localStorage.removeItem("GeneroUsuario");
            localStorage.removeItem("usuarioID");
            Swal.fire({
                title:"Su sesion caduco",
                icon:"error",
                text:"Su sesion ha caducado, por favor ingrese otra vez.",
                allowOutsideClick:false,
                confirmButtonColor: "#ffc107"
            }).then((result)=>{
                if(result.isConfirmed){
                    window.location.replace("http://localhost/DeathofUs/index.html")
                }
            });
        }
    })
    .catch(error=>{
        console.error("Se produjo un error \n"+error);
        Swal.fire({
            title:"Ha ocurrido un error",
            icon:"error",
            text:"Se ha producido un error grave",
            confirmButtonColor: "#ffc107"
        });
    });
}
const chatbot=()=>{
    const token=localStorage.getItem('token')
    axios.get("http://127.0.0.1:5000/interfazProtegida",{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    .then(response=>{
        if(response.data.mensaje=="Token valido"){
            window.location.href="http://localhost/DeathofUs/html/main.html"
        }else if(response.data.mensaje=="Token no existente" || response.data.mensaje=="Token invalido" || response.data.mensaje=="Token expirado"){
            localStorage.removeItem('token');
            localStorage.removeItem("NombreUsuario");
            localStorage.removeItem("ApellidoUsuario"); 
            localStorage.removeItem("GeneroUsuario");
            localStorage.removeItem("usuarioID");
            Swal.fire({
                title:"Su sesion caduco",
                icon:"error",
                text:"Su sesion ha caducado, por favor ingrese otra vez.",
                allowOutsideClick:false,
                confirmButtonColor: "#ffc107"
            }).then((result)=>{
                if(result.isConfirmed){
                    window.location.replace("http://localhost/DeathofUs/index.html")
                }
            });
        }
    })
    .catch(error=>{
        console.error("Se produjo un error \n"+error);
        Swal.fire({
            title:"Ha ocurrido un error",
            icon:"error",
            text:"Se ha producido un error grave",
            confirmButtonColor: "#ffc107"
        });
    });
}
const chatbotAdmin=()=>{
    const token=localStorage.getItem('token')
    axios.get("http://127.0.0.1:5000/interfazProtegida",{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    .then(response=>{
        if(response.data.mensaje=="Token valido"){
            window.location.href="http://localhost/DeathofUs/html/main-admin.html"
        }else if(response.data.mensaje=="Token no existente" || response.data.mensaje=="Token invalido" || response.data.mensaje=="Token expirado"){
            localStorage.removeItem('token');
            localStorage.removeItem("NombreUsuario");
            localStorage.removeItem("ApellidoUsuario");
            localStorage.removeItem("GeneroUsuario");
            localStorage.removeItem("usuarioID");
            Swal.fire({
                title:"Su sesion caduco",
                icon:"error",
                text:"Su sesion ha caducado, por favor ingrese otra vez.",
                allowOutsideClick:false,
                confirmButtonColor: "#ffc107"
            }).then((result)=>{
                if(result.isConfirmed){
                    window.location.replace("http://localhost/DeathofUs/index.html")
                }
            });
        }
    })
    .catch(error=>{
        console.error("Se produjo un error \n"+error);
        Swal.fire({
            title:"Ha ocurrido un error",
            icon:"error",
            text:"Se ha producido un error grave",
            confirmButtonColor: "#ffc107"
        });
    });
}
const usuariosAdmin=()=>{
    const token=localStorage.getItem('token')
    axios.get("http://127.0.0.1:5000/interfazProtegida",{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    .then(response=>{
        if(response.data.mensaje=="Token valido"){
            window.location.href="http://localhost/DeathofUs/html/usuarios-admin.html"
        }else if(response.data.mensaje=="Token no existente" || response.data.mensaje=="Token invalido" || response.data.mensaje=="Token expirado"){
            localStorage.removeItem('token');
            localStorage.removeItem("NombreUsuario");
            localStorage.removeItem("ApellidoUsuario");
            localStorage.removeItem("GeneroUsuario");
            localStorage.removeItem("usuarioID");
            Swal.fire({
                title:"Su sesion caduco",
                icon:"error",
                text:"Su sesion ha caducado, por favor ingrese otra vez.",
                allowOutsideClick:false,
                confirmButtonColor: "#ffc107"
            }).then((result)=>{
                if(result.isConfirmed){
                    window.location.replace("http://localhost/DeathofUs/index.html")
                }
            });
        }
    })
    .catch(error=>{
        console.error("Se produjo un error \n"+error);
        Swal.fire({
            title:"Ha ocurrido un error",
            icon:"error",
            text:"Se ha producido un error grave",
            confirmButtonColor: "#ffc107"
        });
    });
}
const estadisticas=()=>{
    const token=localStorage.getItem('token')
    axios.get("http://127.0.0.1:5000/interfazProtegida",{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    .then(response=>{
        if(response.data.mensaje=="Token valido"){
            window.location.href="http://localhost/DeathofUs/html/estadisticas.html"
        }else if(response.data.mensaje=="Token no existente" || response.data.mensaje=="Token invalido" || response.data.mensaje=="Token expirado"){
            console.log(response.data.mensaje)
            localStorage.removeItem('token');
            localStorage.removeItem("NombreUsuario");
            localStorage.removeItem("ApellidoUsuario");
            localStorage.removeItem("GeneroUsuario");
            localStorage.removeItem("usuarioID");
            Swal.fire({
                title:"Su sesion caduco",
                icon:"error",
                text:"Su sesion ha caducado, por favor ingrese otra vez.",
                allowOutsideClick:false,
                confirmButtonColor: "#ffc107"
            }).then((result)=>{
                if(result.isConfirmed){
                    window.location.replace("http://localhost/DeathofUs/index.html")
                }
            });
        }
    })
    .catch(error=>{
        console.error("Se produjo un error \n"+error);
        Swal.fire({
            title:"Ha ocurrido un error",
            icon:"error",
            text:"Se ha producido un error grave",
            confirmButtonColor: "#ffc107"
        });
    });
}
const preguntasAdmin=()=>{
    const token=localStorage.getItem('token')
    axios.get("http://127.0.0.1:5000/interfazProtegida",{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    .then(response=>{
        if(response.data.mensaje=="Token valido"){
            window.location.href="http://localhost/DeathofUs/html/admin-preguntas.html"
        }else if(response.data.mensaje=="Token no existente" || response.data.mensaje=="Token invalido" || response.data.mensaje=="Token expirado"){
            localStorage.removeItem('token');
            localStorage.removeItem("NombreApellido");
            localStorage.removeItem("ApellidoUsuario");
            localStorage.removeItem("GeneroUsuario");
            localStorage.removeItem("usuarioID");
            Swal.fire({
                title:"Su sesion caduco",
                icon:"error",
                text:"Su sesion ha caducado, por favor ingrese otra vez.",
                allowOutsideClick:false,
                confirmButtonColor: "#ffc107"
            }).then((result)=>{
                if(result.isConfirmed){
                    window.location.replace("http://localhost/DeathofUs/index.html")
                }
            });
        }
    })
    .catch(error=>{
        console.error("Se produjo un error \n"+error);
        Swal.fire({
            title:"Ha ocurrido un error",
            icon:"error",
            text:"Se ha producido un error grave",
            confirmButtonColor: "#ffc107"
        });
    });
}
const cerrarSesion=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem("NombreUsuario");
    localStorage.removeItem("ApellidoUsuario");
    localStorage.removeItem("GeneroUsuario");
    localStorage.removeItem("usuarioID");
    window.location.replace("http://localhost/DeathofUs/index.html");
}
