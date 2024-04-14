let tabla=document.getElementById("tablaPreguntas");
const mostrarPreguntas=()=>{
    while(tabla.rows.length>1){
        tabla.deleteRow(1);
    }
    axios.get("http://127.0.0.1:5000/mostrarPreguntas")
    .then(response=>{
        for(let i=0;i<response.data.length;i++){
            let fila=tabla.insertRow(tabla.length);
            columna0=fila.insertCell(0);
            columna0.innerHTML=response.data[i].ID;
            columna1=fila.insertCell(1);
            columna1.innerHTML=response.data[i].Contexto;
            columna2=fila.insertCell(2);
            columna2.innerHTML=response.data[i].Preguntas;
        }
    })
    .catch(error=>{
        console.error("Se produjo un error al mostrar la tabla: \n"+error);
        Swal.fire({
            title:"Se produjo un error",
            icon:"error",
            text:"Se ha producido un error al mostrar la tabla.",
            confirmButtonColor: "#ffc107"
        })
    })
}