let tabla=document.getElementById("tablaUsers");
let realizarCambios;
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
            columna9.innerHTML=`<button type="button" class="btn btn-warning mx-1" data-bs-toggle="modal" data-bs-target="#modalModificar" onclick="actualizar(this)"><img src="../img/lapiz.png" widht="20px" height="20px"></button><button type="button" class="btn btn-danger" onclick="eliminarUsuario(this)"><img src="../img/eliminar.png" "width="20px" height="20px"></button>`
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
            columna9.innerHTML=`<button type="button" class="btn btn-warning mx-1" data-bs-toggle="modal" data-bs-target="#modalModificar" onclick="actualizar(this)"><img src="../img/lapiz.png" widht="20px" height="20px"></button><button type="button" class="btn btn-danger" onclick="eliminarUsuario(this)"><img src="../img/eliminar.png" "width="20px" height="20px"></button>`
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
const actualizar=(boton)=>{
    const fila=boton.closest("tr");
    const ID=fila.children[0].textContent;
    const correo=fila.children[1].textContent;
    const tipoDoc=fila.children[2].textContent;
    const docNum=fila.children[3].textContent;
    const nombre=fila.children[4].textContent;
    const apellido=fila.children[5].textContent;
    const genero=fila.children[6].textContent;
    const rol=fila.children[7].textContent;
    let actualRol;
    document.getElementById("name").value=nombre;
    document.getElementById("apellido").value=apellido;
    document.getElementById("generoModificar").value=genero;
    document.getElementById("numDoc").value=docNum;
    document.getElementById("correo").value=correo;
    document.getElementById("rolModificar").value=rol;
    document.getElementById("tipoDocModificar").value=tipoDoc;
    if(rol=="Usuario natural"){
        document.getElementById("rolModificar").value="1";
        actualRol="1";
    }else if(rol=="Administrador"){
        document.getElementById("rolModificar").value="2";
        actualRol="2";
    }
    realizarCambios=()=>{
        let newName=document.getElementById("name").value;
        let newSurname=document.getElementById("apellido").value;
        let newGender=document.getElementById("generoModificar").value;
        let newDoc=document.getElementById("numDoc").value;
        let newEmail=document.getElementById("correo").value;
        let newRol=document.getElementById("rolModificar").value;
        let newTipoDoc=document.getElementById("tipoDocModificar").value;
        if(verificarLetras(newName)){
            if(verificarLetras(newSurname)){
                if(verificarNumeros(newDoc)){
                    let cambios={};
                    if(newName!=nombre){
                        cambios["Nombre"]=newName;
                    }
                    if(newSurname!=apellido){
                        cambios["Apellido"]=newSurname;
                    }
                    if(newGender!=genero){
                        cambios["Genero"]=newGender;
                    }
                    if(newDoc!=docNum){
                        cambios["No_identificacion"]=newDoc;
                    }
                    if(newEmail!=correo){
                        cambios["Correo"]=newEmail;
                    }
                    if(newRol!=actualRol){
                        cambios["ID_Rol"]=newRol;
                    }
                    if(newTipoDoc!=tipoDoc){
                        cambios["Tipo_documento"]=newTipoDoc;
                    }
                    if(Object.entries(cambios).length === 0){
                        Swal.fire({
                            title:"No se realizo ningun cambio",
                            icon:"warning",
                            text:"Debe realizar al menos un cambio para poder alterar los datos del usuario.",
                            confirmButtonColor: "#ffc107"
                        });
                    }else{
                        axios.put(`http://127.0.0.1:5000/updateUsers/${ID}`,cambios)
                        .then(response=>{
                            if(response.data.informacion=="Identificacion ya existente"){
                                Swal.fire({
                                    title:"Identificacion ya existente",
                                    icon:"error",
                                    text:"Ya existe un usuario con ese numero de identificacion.",
                                    confirmButtonColor: "#ffc107"
                                })
                            }else if(response.data.informacion=="Correo ya existente"){
                                Swal.fire({
                                    title:"Correo ya existente",
                                    icon:"error",
                                    text:"Ya existe un usuario con esa direccion de correo electronico.",
                                    confirmButtonColor: "#ffc107"
                                })
                            }else if(response.data.informacion=="Registro actualizado"){
                                Swal.fire({
                                    title:"Registro actualizado exitosamente",
                                    icon:"success",
                                    text:"El usuario ha sido actualizado de manera correcta.",
                                    confirmButtonColor: "#ffc107",
                                    allowOutsideClick:false
                                }).then((result)=>{
                                    if(result.isConfirmed){
                                        window.location.reload();
                                    }
                                }).catch(error=>{
                                    console.log(error);
                                    Swal.fire({
                                        title:"Se produjo un error",
                                        icon:"error",
                                        text:"Se ha producido un error durante la actualizacion de datos del usuario.",
                                        confirmButtonColor: "#ffc107"
                                    });
                                });
                            }
                        });
                    }
                }else{
                    Swal.fire({
                        title:"Error al cambiar el valor",
                        icon:"error",
                        text:"El numero de identificacion no puede llevar letras ni caracteres especiales.",
                        confirmButtonColor: "#ffc107"
                    })
                }
            }else{
                Swal.fire({
                    title:"Error al cambiar el valor",
                    icon:"error",
                    text:"El nombre y apellido no pueden llevar numeros y/o caracteres especiales.",
                    confirmButtonColor: "#ffc107"
                });
            }
        }else{
            Swal.fire({
                title:"Error al cambiar el valor",
                icon:"error",
                text:"El nombre y apellido no pueden llevar numeros y/o caracteres especiales.",
                confirmButtonColor: "#ffc107"
            });
        }      
        }
    }
const verificarLetras=(valor)=>{
    const regex=/^[a-zA-Z\s]*$/;
    if(regex.test(valor)){
        return true;
    }else{
        return false;
    }
}
const verificarNumeros=(valor)=>{
    const regex=/^\d+$/;
    if(regex.test(valor)){
        return true;
    }else{
        return false;
    }
}