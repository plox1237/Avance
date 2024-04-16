let tabla=document.getElementById("tablaConversacion");
const consultarHistorial=()=>{
    const usuarioID=localStorage.getItem("usuarioID");
    console.log(usuarioID);
    datos={
        "usuarioID":usuarioID
    }
    axios.post("http://127.0.0.1:5000/consultarHistorial",datos)
    .then(response=>{
        for(let i=0;i<response.data.length;i++){
            let Fila=tabla.insertRow(tabla.length);
            columna0=Fila.insertCell(0);
            columna0.innerHTML=response.data[i].Texto;
            columna1=Fila.insertCell(1);
            columna1.innerHTML=response.data[i].Respuesta;
            columna2=Fila.insertCell(2);
            columna2.innerHTML=response.data[i].Fecha_hora;
        }
    })
    .catch(error=>{
        console.error("SE HA PRODUCIDO ERROR AL CONSULTAR EL HISTORIAL \n"+error);
        Swal.fire({
            title:"Error al cargar el historial",
            icon:"error",
            text:"Se ha producido un error al momento de cargar su historial.",
            confirmButtonColor: "#ffc107"
        });
    })
}