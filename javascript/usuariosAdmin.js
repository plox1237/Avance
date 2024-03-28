$(document).ready(()=>{
    var dataTable=$('#tablaUsers').DataTable({
        destroy: true,
        language:{
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 a 0 de 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        },
    },
        "ajax":{
            "url":"http://127.0.0.1:5000/getAllUsers",
            "datatype":"JSON",
            "dataSrc":""
        },
        "columns":[
            { "data": "ID" },
            { "data": "Correo"},
            { "data": "Contraseña"},
            { "data": "Tipo_documento"},
            { "data": "No_identificacion"},
            { "data": "Nombre"},
            { "data": "Apellido"},
            { "data": "Genero"},
            { "data": "ID_Rol"},
            {
                "data":null,
                "orderable": false,
                "class": 'text-center  px-1',
                render: function(row){
                    '<a class="btn btn-warning btn-xs">Editar</a>'
                }
            }
        ]
    });
});
const CrearUsuario=()=>{
    
}

/*const consultarTotal=async()=>{
    let tabla=document.getElementById("tablaUsers")
    try{
        const response= await axios.get("http://127.0.0.1:5000/getAllUsers")
        const usuarios=response.data;
        let content=``;
        usuarios.forEach(usuarios=>{
            content+=`
            <tr>
                <td>${usuarios.ID}</td>
                <td>${usuarios.Correo}</td>
                <td>${usuarios.Contraseña}</td>
                <td>${usuarios.Tipo_documento}</td>
                <td>${usuarios.No_identificacion}</td>
                <td>${usuarios.Nombre}</td>
                <td>${usuarios.Apellido}</td>
                <td>${usuarios.Genero}</td>
                <td>${usuarios.ID_Rol}</td>
                <td><button class="btn btn-warning w-25">Modificar</button></td>
            </tr>`
        })
        tabla.innerHTML=content
    }
    catch (error){
        console.log("Error al mostrar la tabla "+error);
        alert("Hubo un error al cargar la tabla");
    };
}*/
