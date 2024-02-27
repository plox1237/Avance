const registrarUsuario=()=>{

    let nombre=document.getElementById("name").value;
    let apellido=document.getElementById("apellido").value;
    let docIdentidad=document.getElementById("ticc").value;
    let correo=document.getElementById("emailInput").value;
    let contraseña=document.getElementById("passw").value;
    let genero;

    const revisarRadio=()=>{
        let radios=document.getElementsByName("gender");
        radios.forEach(radio =>{
            if(radio.checked){
                genero=radio.value;
            }
        });
        return genero;
    }
    genero=revisarRadio();

    if(nombre.trim()==="" || apellido.trim()==="" || docIdentidad.trim()==="" || correo.trim()==="" || contraseña.trim()==="" || genero==null){
        alert("Por favor, complete todos los campos")
        return;
    }else{
        alert("DEATH")
    }
}
/*document.addEventListener("DOMContentLoaded",()=>{
    const mysql=require("mysql");
    const conexion=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"2236789",
        database:"pagina_ia"
    });
    conexion.connect((err)=>{
        if(err){
            console.error("Error de conexion",err);
            return;
        }
        console.log("Conexion con la base de datos MySQL creada");
    });
    const boton=document.getElementById("botonRegistrar");
    boton.addEventListener("click",()=>{
        registrarUsuario();
    });
});

const registrarUsuario=()=>{

    let nombre=document.getElementById("name").value;
    let apellido=document.getElementById("apellido").value;
    let docIdentidad=document.getElementById("ticc").value;
    let correo=document.getElementById("emailInput").value;
    let contraseña=document.getElementById("passw").value;
    let genero;

    const revisarRadio=()=>{
        let radios=document.getElementsByName("gender");
        radios.forEach(radio =>{
            if(radio.checked){
                genero=radio.value;
            }
        });
        return genero;
    }
    genero=revisarRadio();

    if(nombre.trim()==="" || apellido.trim()==="" || docIdentidad.trim()==="" || correo.trim()==="" || contraseña.trim()==="" || genero==null){
        alert("Por favor, complete todos los campos")
        return;
    }else{
        const newUser={
            doc_usuario:docIdentidad,
            nombre_usuario:nombre,
            apellido_usuario:apellido,
            correo_usuario:correo,
            passw_usuario:contraseña,
            genero_usuario:genero,
            tipo_usuario:"User"
        }
        conexion.query("INSERT INTO usuarios SET ?",newUser,(error)=>{
            if(error){
                console.error("Error al registrar el usuario ",error);
                alert("Hubo un error al ingresar el usuario")
                return;
            }
            alert("Usuario registrado correctamente");
        })
    conexion.end();
    }
}*/
