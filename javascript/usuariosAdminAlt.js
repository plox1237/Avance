let tabla=document.getElementById("tablaUsers");
const ConsultarTodo=()=>{
    
    axios.get("http://127.0.0.1:5000/getAllUsers")
    .then(response=>{
        for (let i=0;i<response.data.length;i++){
            let Fila=tabla.insertRow(tabla.length);
            columna0=Fila.insertCell(0);
            columna0.innerHTML=response.data[i].ID;
            columna1=Fila.insertCell(1);
            columna1.innerHTML=response.data[i].Correo;
            columna2=Fila.insertCell(2);
            columna2.innerHTML=response.data[i].Contraseña;
            columna3=Fila.insertCell(3);
            columna3.innerHTML=response.data[i].Tipo_documento;
            columna4=Fila.insertCell(4);
            columna4.innerHTML=response.data[i].No_identificacion;
            columna5=Fila.insertCell(5);
            columna5.innerHTML=response.data[i].Nombre;
            columna6=Fila.insertCell(6);
            columna6.innerHTML=response.data[i].Apellido;
            columna7=Fila.insertCell(7);
            columna7.innerHTML=response.data[i].Genero;
            columna8=Fila.insertCell(8);
            columna8.innerHTML=response.data[i].ID_Rol;
            columna9=Fila.insertCell(9);
            columna9.innerHTML=`<a class="btn btn-warning sm">Modificar</a>`
        }
    })
    .catch(error=>{
        console.log(error)
        Swal.fire({
            title:"Error",
            icon:"error",
            text:"No se pudo cargar la tabla de forma correcta",
            toast:true,
            position:"top"
        })
    })
}
const Buscar=()=>{
    
    axios.get("http://127.0.0.1:5000/getAllUsers")
    .then(response=>{
        for (let i=0;i<response.data.length;i++){
            let Fila=tabla.insertRow(tabla.length);
            columna0=Fila.insertCell(0);
            columna0.innerHTML=response.data[i].ID;
            columna1=Fila.insertCell(1);
            columna1.innerHTML=response.data[i].Correo;
            columna2=Fila.insertCell(2);
            columna2.innerHTML=response.data[i].Contraseña;
            columna3=Fila.insertCell(3);
            columna3.innerHTML=response.data[i].Tipo_documento;
            columna4=Fila.insertCell(4);
            columna4.innerHTML=response.data[i].No_identificacion;
            columna5=Fila.insertCell(5);
            columna5.innerHTML=response.data[i].Nombre;
            columna6=Fila.insertCell(6);
            columna6.innerHTML=response.data[i].Apellido;
            columna7=Fila.insertCell(7);
            columna7.innerHTML=response.data[i].Genero;
            columna8=Fila.insertCell(8);
            columna8.innerHTML=response.data[i].ID_Rol;
            columna9=Fila.insertCell(9);
            columna9.innerHTML=`<a class="btn btn-warning sm">Modificar</a>`
        }
    })
    .catch(error=>{
        console.log(error)
        Swal.fire({
            title:"Error",
            icon:"error",
            text:"No se pudo cargar la tabla de forma correcta",
            toast:true,
            position:"top"
        })
    })
}