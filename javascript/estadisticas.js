const mostrarGraficos=()=>{
    usuariosGrafico()
    contextoGrafico()
}
const usuariosGrafico=()=>{
    axios.get("https://plox1237.github.io/Apiuser/users.json")
    .then(response=>{
        console.log(response.data)
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
        alert("Se ha producido un error");
    });
}
const contextoGrafico=()=>{
    axios.get("https://plox1237.github.io/Apiuser/preguntas.json")
    .then(response=>{
        console.log(response.data)
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
            
        })
    })
}