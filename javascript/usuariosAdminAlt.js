let tabla=document.getElementById("tablaUsers");
const ConsultarTodo=()=>{
    while(tabla.rows.length>1){
        tabla.deleteRow(1);
    }
    axios.get("http://127.0.0.1:5000/getAllUsers")
    .then(response=>{
        for (let i=0;i<response.data.length;i++){
            let Fila=tabla.insertRow(tabla.length);
            columna0=Fila.insertCell(0);
            columna0.innerHTML=response.data[i].ID;
            columna1=Fila.insertCell(1);
            columna1.innerHTML=response.data[i].Correo;
            columna3=Fila.insertCell(2);
            columna3.innerHTML=response.data[i].Tipo_documento;
            columna4=Fila.insertCell(3);
            columna4.innerHTML=response.data[i].No_identificacion;
            columna5=Fila.insertCell(4);
            columna5.innerHTML=response.data[i].Nombre;
            columna6=Fila.insertCell(5);
            columna6.innerHTML=response.data[i].Apellido;
            columna7=Fila.insertCell(6);
            columna7.innerHTML=response.data[i].Genero;
            if(response.data[i].ID_Rol==1){
                columna8=Fila.insertCell(7);
                columna8.innerHTML="Usuario natural";
            }else if(response.data[i].ID_Rol==2){
                columna8=Fila.insertCell(7);
                columna8.innerHTML="Administrador";
            }
            columna9=Fila.insertCell(8);
            columna9.innerHTML=`<a class="btn btn-warning mx-1"><img src="../img/lapiz.png" widht="20px" height="20px"></a><a class="btn btn-danger" onclick="eliminarUsuario(this)"><img src="../img/eliminar.png" "width="20px" height="20px"></a>`
        }
    })
    .catch(error=>{
        console.log(error)
        Swal.fire({
            title:"Error con el servidor",
            icon:"error",
            text:"No se pudo cargar la tabla de forma correcta, intente refrescar la pagina.",
            toast:true,
            position:"top",
            confirmButtonColor: "#ffc107"
        })
    })
}
const Buscar=()=>{
    while(tabla.rows.length>1){
        tabla.deleteRow(1);
    }
    categoria=document.getElementById("tipoBusqueda").value;
    valorBusqueda=document.getElementById("busquedaInput").value;
    let datos={
        Categoria:categoria,
        Busqueda:valorBusqueda
    }
    if(categoria=="ID_Rol2"){
        datos={
            Categoria:"ID_Rol",
            Busqueda:"2"
        }
    }else if(categoria=="ID_Rol1"){
        datos={
            Categoria:"ID_Rol",
            Busqueda:"1"
        }
    }else if(categoria=="GeneroM"){
        datos={
            Categoria:"Genero",
            Busqueda:"M"
        }
    }else if(categoria=="GeneroF"){
        datos={
            Categoria:"Genero",
            Busqueda:"F"
            }
        }
    axios.post("http://127.0.0.1:5000/Busqueda",datos)
    .then(response=>{
        for (let i=0;i<response.data.length;i++){
            let Fila=tabla.insertRow(tabla.length);
            columna0=Fila.insertCell(0);
            columna0.innerHTML=response.data[i].ID;
            columna1=Fila.insertCell(1);
            columna1.innerHTML=response.data[i].Correo;
            columna3=Fila.insertCell(2);
            columna3.innerHTML=response.data[i].Tipo_documento;
            columna4=Fila.insertCell(3);
            columna4.innerHTML=response.data[i].No_identificacion;
            columna5=Fila.insertCell(4);
            columna5.innerHTML=response.data[i].Nombre;
            columna6=Fila.insertCell(5);
            columna6.innerHTML=response.data[i].Apellido;
            columna7=Fila.insertCell(6);
            columna7.innerHTML=response.data[i].Genero;
            if(response.data[i].ID_Rol==1){
                columna8=Fila.insertCell(7);
                columna8.innerHTML="Usuario natural";
            }else if(response.data[i].ID_Rol==2){
                columna8=Fila.insertCell(7);
                columna8.innerHTML="Administrador";
            }
            columna9=Fila.insertCell(8);
            columna9.innerHTML=`<a class="btn btn-warning mx-1"><img src="../img/lapiz.png" widht="20px" height="20px"></a><a class="btn btn-danger" onclick="eliminarUsuario(this)"><img src="../img/eliminar.png" "width="20px" height="20px"></a>`
        }
    })
    .catch(error=>{
        console.log(error)
        Swal.fire({
            title:"Error con el servidor",
            icon:"error",
            text:"No se pudo cargar la tabla de forma correcta, intente refrescar la pagina.",
            toast:true,
            position:"top",
            confirmButtonColor: "#ffc107"
        })
    })
}
const eliminarUsuario=(boton)=>{
    const fila=boton.closest("tr");
    const ID_Victima=fila.children[0].textContent;
    console.log(ID_Victima);
    Swal.fire({
        title:"¿Eliminar usuario?",
        icon:"warning",
        text:"¿Esta seguro que desea eliminar este usuario del sistema? Esta accion no se puede deshacer.",
        showDenyButton:true,
        denyButtonText:"Cancelar",
        confirmButtonText:"Eliminar",
        confirmButtonColor: "#ffc107"
    }).then((result)=>{
        if(result.isConfirmed){
            axios.delete(`http://127.0.0.1:5000/eliminarID/${ID_Victima}`)
            .then(response=>{
                if(response.data.informacion=="Registro eliminado"){
                    Swal.fire({
                        title:"Usuario eliminado",
                        icon:"success",
                        text:"El usuario fue eliminado exitosamente.",
                        confirmButtonColor: "#ffc107"
                    });
                    fila.parentNode.removeChild(fila);
                }else if(response.data.informacion=="Hubo un error"){
                    Swal.fire({
                        title:"Error durante el proceso",
                        icon:"error",
                        text:"Se produjo un error durante la eliminacion del usuario.",
                        confirmButtonColor: "#ffc107"
                    });
                }
            })
            .catch(error=>{
                console.log("Error durante la eliminacion: \n"+error)
                Swal.fire({
                    title:"Error durante el proceso",
                    icon:"error",
                    text:"Se produjo un error durante la eliminacion del usuario.",
                    confirmButtonColor: "#ffc107"
                });
            });
        }
    })
}
