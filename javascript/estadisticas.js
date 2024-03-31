const mostrarGraficos=()=>{
    usuariosGrafico()
    contextoGrafico()
    graficoGeneros()
}
const usuariosGrafico=()=>{
    axios.get("http://127.0.0.1:5000/getAllUsers")
    .then(response=>{
        let numAdmin=0;
        let numUsers=0;
        response.data.forEach(usuarios=>{
            if(usuarios.ID_Rol==1){
                numUsers++;
            }else if(usuarios.ID_Rol==2){
                numAdmin++;
            }
        })
        let ctx=document.getElementById("graficoUsers");
        new Chart(ctx,{
            type:'pie',
            data: {
              labels: ['Usuarios',"Administradores"],
              datasets: [{
                label: 'Tipos de usuarios registrados',
                data: [numUsers,numAdmin],
              }]
            },
            options:{
                maintainAspectRatio:false,
                responsive:true
            }
          });
    })
    .catch(error=>{
        console.log("ERROR AL SOLICITAR LOS DATOS "+error);
        Swal.fire({
            title:"Error con el servidor",
            icon:"error",
            text:"No se pudo cargar una o varias graficas, intente refrescar la pagina.",
            toast:true,
            position:"top",
            confirmButtonColor: "#ffc107"
        })
    });
}
const contextoGrafico=()=>{
    axios.get("https://plox1237.github.io/Apiuser/preguntas.json")
    .then(response=>{
        let numCEL=0;
        let numInsc=0;
        let numMatri=0;
        response.data.forEach(preguntas=>{
            if(preguntas.ID_tipoPregunta==1){
                numMatri++;
            }else if(preguntas.ID_tipoPregunta==2){
                numCEL++;
            }else if(preguntas.ID_tipoPregunta==3){
                numInsc++;
            }
        })
        let ctx=document.getElementById("graficoPreguntas");
        new Chart(ctx,{
            type:'bar',
            data: {
              labels: ['Matriculas',"CEL","Inscripciones"],
              datasets: [{
                label: 'Preguntas registradas',
                data: [numMatri,numCEL,numInsc],
                backgroundColor:[
                    'rgba(255, 99, 132, 1.2)',
                    'rgba(54, 162, 235, 1.2)',
                    'rgba(255, 206, 86, 1.2)',
                ],
              }]
            },
            options:{
                maintainAspectRatio:false,
                responsive:true,
                scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
            }
          });
    })
    .catch(error=>{
        console.log(error)
        Swal.fire({
            title:"Error con el servidor",
            icon:"error",
            text:"No se pudo cargar una o varias graficas, intente refrescar la pagina.",
            toast:true,
            position:"top",
            confirmButtonColor: "#ffc107"
        })
    })
}
const graficoGeneros=()=>{
    axios.get("http://127.0.0.1:5000/getAllUsers")
    .then(response=>{
        let hombres=0;
        let mujeres=0;
        response.data.forEach(usuarios=>{
            if (usuarios.Genero=="M"){
                hombres++;
            }else if(usuarios.Genero=="F"){
                mujeres++;
            }
        });
        let ctx=document.getElementById("graficoGenero");
        new Chart(ctx,{
            type:'pie',
            data: {
              labels: ['Hombres',"Mujeres"],
              datasets: [{
                label: 'Usuarios con este genero',
                data: [hombres,mujeres],
              }]
            },
            options:{
                maintainAspectRatio:false,
                responsive:true
            }
          });
    })
    .catch(error=>{
        console.log("ERROR SUCEDIDO AL SOLICITAR LOS DATOS \n"+error)
        Swal.fire({
            title:"Error con el servidor",
            icon:"error",
            text:"No se pudo cargar una o varias graficas, intente refrescar la pagina.",
            toast:true,
            position:"top",
            confirmButtonColor: "#ffc107"
        })
    })
}