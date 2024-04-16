document.getElementById('questionForm').addEventListener('submit', (event) =>{
  event.preventDefault();
  let pregunta = document.getElementById('question').value;
  const usuarioID=localStorage.getItem("usuarioID");
  document.getElementById('conversation').innerHTML += '<p>Usuario: '+pregunta+'</p>';
  let datos={
    "mensaje":pregunta,
    "ID":usuarioID
  };
  axios.post("http://127.0.0.1:5000/chat",datos)
  .then(response => {
      let respuesta=response.data.respuesta;
      document.getElementById('conversation').innerHTML += '<p>Chatbot: ' +respuesta+ '</p>';
  })
  .catch(error=> {
      Swal.fire({
        title:"Error en la conexión con el chatbot",
        icon:"error",
        text:"Hubo un error solicitando la conexión con el chatbot",
        confirmButtonColor: "#ffc107"
      })
      console.error('Error al procesar el mensaje:', error);
  });

  document.getElementById('question').value = '';
});


