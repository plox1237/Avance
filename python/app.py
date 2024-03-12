from flask import Flask,request,jsonify,redirect,send_file,url_for
from flask_cors import CORS, cross_origin
from flask_mysqldb import MySQL

app=Flask(__name__)
CORS(app)

app.config["MYSQL_HOST"]="localhost"
app.config['MYSQL_USER']="root"
app.config['MYSQL_PASSWORD']=''
app.config['MYSQL_DB']='ia'
app.config["MYSQL_PORT"]=3307
mysql=MySQL(app)

#Registrar usuario
@cross_origin()
@app.route("/registrarUsuario",methods=["POST"])
def registrarUsuario():
    datos=request.json
    print("Datos recibidos: \n",datos)
    try:
        if request.method=="POST":
            Nombre=request.json["nombre"]
            Apellido=request.json["apellido"]
            Correo=request.json["correo"]
            tipoDoc=request.json["tipoDoc"]
            docIdentidad=request.json["docIdentidad"]
            Contraseña=request.json["contraseña"]
            Genero=request.json["genero"]
            tipoUser=request.json["tipoUser"]
            cursor=mysql.connection.cursor()
            cursor.execute("INSERT INTO usuario (Correo,Contraseña,Tipo_documento,No_identificacion,Nombre,Apellido,Genero,ID_Rol) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",(Correo,Contraseña,tipoDoc,docIdentidad,Nombre,Apellido,Genero,tipoUser))
            mysql.connection.commit()
            return jsonify({"mensaje":"Registro realizado exitosamente"})
    except Exception as error:
            print("Error durante el registro \n",error)
            return jsonify({
                "mensaje":error
            })

#Iniciar sesion
@cross_origin
@app.route("/iniciarSesion", methods=["GET","POST"])
def login():
     if request.method=="POST":
          try:
               correo=request.json["correo"]
               contraseña=request.json["contraseña"]
               cursor=mysql.connection.cursor()
               cursor.execute("SELECT ID_Rol FROM usuario where Correo=%s AND Contraseña=%s",(correo,contraseña))
               usuario=cursor.fetchone()
               if usuario!=None:
                    ID_Rol=usuario[0]
                    if ID_Rol==1:
                         cursor.close()
                         return jsonify({"mensaje":"Redireccionando","link":"http://localhost/DeathofUs/html/main.html"})
                    elif ID_Rol==2:
                         cursor.close()
                         return jsonify({"mensaje":"Redireccionando","link":"http://localhost/DeathofUs/html/main-admin.html"})
               else:
                    return jsonify({"mensaje":"Usuario no existente"})

          except Exception as error:
            print("Error al iniciar sesion: \n",error)
            return jsonify({
                 "mensaje":error
            })

if __name__=="__main__":
    app.run(host="127.0.0.1",port=5000,debug=True)
