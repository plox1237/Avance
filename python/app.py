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
    if request.method=="POST":
     Nombre=request.json["nombre"]
     Apellido=request.json["apellido"]
     Correo=request.json["correo"]
     tipoDoc=request.json["tipoDoc"]
     docIdentidad=request.json["docIdentidad"]
     Contraseña=request.json["contraseña"]
     Genero=request.json["genero"]
     tipoUser=request.json["tipoUser"]
     try:
          cursor=mysql.connection.cursor()
          cursor.execute("SELECT No_identificacion,Correo FROM usuario WHERE Correo=%s OR No_identificacion=%s",(Correo,docIdentidad))
          busqueda=cursor.fetchone()
          if busqueda==None:
               try:
                    cursor.execute("INSERT INTO usuario (Correo,Contraseña,Tipo_documento,No_identificacion,Nombre,Apellido,Genero,ID_Rol) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",(Correo,Contraseña,tipoDoc,docIdentidad,Nombre,Apellido,Genero,tipoUser))
                    mysql.connection.commit()
                    return jsonify({"mensaje":"Registro realizado exitosamente"})
               except Exception as err:
                    print("Error durante el registro: \n",error)
                    return jsonify({"mensaje":err})
          else:
               print("Coincidencia encontrada")
               return jsonify({"mensaje":"Usuario ya existente"})
     except Exception as error:
               print("Error durante la consulta \n",error)
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
#Consultar usuarios
@cross_origin
@app.route("/getAllUsers",methods=["GET"])
def eliminar():
     if request.method=="GET":
          try:
               cursor=mysql.connection.cursor()
               cursor.execute("SELECT * FROM usuario")
               resultado=cursor.fetchall()
               cursor.close()
               tabla=[]
               contenido={}
               for fila in resultado:
                    contenido={
                         "ID":fila[0],
                         "Correo":fila[1],
                         "Contraseña":fila[2],
                         "Tipo_documento":fila[3],
                         "No_identificacion":fila[4],
                         "Nombre":fila[5],
                         "Apellido":fila[6],
                         "Genero":fila[7],
                         "ID_Rol":fila[8]
                    }
                    tabla.append(contenido)
                    contenido={}
               return jsonify(tabla)
          except Exception as error:
               print("Error al obtener los usuarios \n",error)
               return jsonify({"mensaje":error})

#Contar usuarios         
@cross_origin()
@app.route('/getCountUsers',methods=['GET'])
def getcount():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT COUNT(*) as Total from usuario')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'total': result[0]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Buscar usuarios#
@cross_origin()
@app.route("/Busqueda",methods=["GET","POST"])
def BuscarValor():
    try:
        Categoria=request.json["Categoria"]
        Valor=request.json["Busqueda"]
        ValorBuscar=f'%{Valor}%'
        print(Categoria)
        print(ValorBuscar)
        cursor=mysql.connection.cursor()
        cursor.execute("SELECT * FROM usuario WHERE {} LIKE %s".format(Categoria),(ValorBuscar,))
        resultado=cursor.fetchall()
        cursor.close()
        tabla=[]
        contenido={}
        for fila in resultado:
            contenido={
                "ID":fila[0],
                "Correo":fila[1],
                "Contraseña":fila[2],
                "Tipo_documento":fila[3],
                "No_identificacion":fila[4],
                "Nombre":fila[5],
                "Apellido":fila[6],
                "Genero":fila[7],
                "ID_Rol":fila[8]
                }
            tabla.append(contenido)
            contenido={}
        return jsonify(tabla)
    except Exception as error:
        print("ERROR SUCEDIDO EN LA BUSQUEDA \n",error)
        return jsonify({"mensaje":"Error durante la busqueda"})


#Eliminar por ID
@cross_origin()
@app.route('/eliminarID/<id>', methods = ['DELETE'])
def eliminarIdUser(id):
    try:
        Id=int(id)
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM usuario WHERE ID=%s',(Id,))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro eliminado"}) 
    except Exception as e:
        print("EL ERROR ES: ",e)
        return jsonify({"informacion":"Hubo un error"})
    
#Consultar usuario por ID    
@cross_origin()
@app.route('/getAllByIdUsers/<id>',methods=['GET'])
def getAllById(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM usuario WHERE id = %s', (id))
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {"ID":result[0],
                         "Correo":result[1],
                         "Contraseña":result[2],
                         "Tipo_documento":result[3],
                         "No_identificacion":result[4],
                         "Nombre":result[5],
                         "Apellido":result[6],
                         "Genero":result[7],
                         "ID_Rol":result[8]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Actualizar usuario por ID#
@cross_origin()
@app.route('/updateUsers/<id>', methods=['PUT'])
def update_user(id):
    try:
        Nombre=request.json["nombre"]
        Apellido=request.json["apellido"]
        Correo=request.json["correo"]
        tipoDoc=request.json["tipoDoc"]
        docIdentidad=request.json["docIdentidad"]
        Contraseña=request.json["contraseña"]
        Genero=request.json["genero"]
        tipoUser=request.json["tipoUser"]
        cur = mysql.connection.cursor()
        cur.execute("""UPDATE usuario SET Correo=%s,Contraseña=%s,Tipo_documento=%s,No_identificacion=%s,Nombre=%s,Apellido=%s,Genero=%s,ID_Rol=%s WHERE id = %s""", (Correo,Contraseña,tipoDoc,docIdentidad,Nombre,Apellido,Genero,tipoUser, id))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro actualizado"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

######################################################ROL TABLA##############################################################
    
#Consultar todos los roles#    
@cross_origin()
@app.route('/getAllRoles', methods=['GET'])
def getAll():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM rol')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'ID': result[0], 'Nombre': result[1], 'Descripcion': result[2]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Añadir rol#
@cross_origin()
@app.route('/añadirRol', methods=['POST'])
def añadirRol():
    try:
        if request.method == 'POST':
            Nombre=request.json['nombreRol']
            Descripcion = request.json['descripcion']
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO rol (Nombre, Descripcion) VALUES (%s,%s)", (Nombre, Descripcion))
            mysql.connection.commit()
            return jsonify({"informacion":"Registro exitoso"})
        
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Contar roles#
@cross_origin()
@app.route('/contarRoles',methods=['GET'])
def contarRoles():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT COUNT(*) as Total from rol')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'total': result[0]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Consultar rol por ID#
@cross_origin()
@app.route('/consultarRol/<id>',methods=['GET'])
def consultarRol(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM rol WHERE id = %s', (id))
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'ID': result[0], 'Nombre': result[1], 'Descripcion': result[2]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    
#Actualizar informacion de rol#
@cross_origin()
@app.route('/updateRol/<id>', methods=['PUT'])
def updateRol(id):
    try:
        Nombre = request.json['nombreRol']
        Descripcion = request.json['descripcion']
        cur = mysql.connection.cursor()
        cur.execute("""UPDATE rol SET Nombre = %s,Descripcion = %s WHERE id = %s""", (Nombre, Descripcion, id))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro actualizado"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Eliminar rol#    
@cross_origin()
@app.route('/eliminarRolID/<id>', methods = ['DELETE'])
def eliminarIdRol(id):
    try:
        Id=int(id)
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM rol WHERE ID=%s',(Id,))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro eliminado"}) 
    except Exception as e:
        print("EL ERROR ES: ",e)
        return jsonify({"informacion":"Hubo un error"})

################################################TABLA TIPO DE PREGUNTA##############################################

#Mostrar todos los tipos de pregunta#
@cross_origin()
@app.route('/getTipoPreguntas', methods=['GET'])
def getTipoPre():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM tipo_pregunta')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'ID': result[0], 'Nombre': result[1], 'Descripcion': result[2]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Añadir nuevo tipo de pregunta#
@cross_origin()
@app.route('/añadirTipoPregunta', methods=['POST'])
def añadirTipoPregunta():
    try:
        if request.method == 'POST':
            Nombre=request.json['nomtipPre']
            Descripcion = request.json['descripcion']
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO tipo_pregunta (Nombre, Descripcion) VALUES (%s,%s)", (Nombre, Descripcion))
            mysql.connection.commit()
            return jsonify({"informacion":"Registro exitoso"})
        
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Contar tipos de pregunta#
@cross_origin()
@app.route('/contTipPre',methods=['GET'])
def contTipPre():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT COUNT(*) as Total from tipo_pregunta')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'total': result[0]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Consultar tipo de pregunta por ID#
@cross_origin()
@app.route('/consultarTipPre/<id>',methods=['GET'])
def consultTipPre(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM tipo_pregunta WHERE id = %s', (id))
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'ID': result[0], 'Nombre': result[1], 'Descripcion': result[2]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Actualizar tipo de pregunta por ID#
@cross_origin()
@app.route('/updateTipPre/<id>', methods=['PUT'])
def updateTipPre(id):
    try:
        Nombre = request.json['nombreTipo']
        Descripcion = request.json['descripcion']
        cur = mysql.connection.cursor()
        cur.execute("""UPDATE tipo_pregunta SET Nombre = %s,Descripcion = %s WHERE id = %s""", (Nombre, Descripcion, id))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro actualizado"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Eliminar tipo de pregunta#    
@cross_origin()
@app.route('/eliminarTipPre/<id>', methods = ['DELETE'])
def eliminarTipPre(id):
    try:
        Id=int(id)
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM tipo_pregunta WHERE ID=%s',(Id,))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro eliminado"}) 
    except Exception as e:
        print("EL ERROR ES: ",e)
        return jsonify({"informacion":"Hubo un error"})

#######################################################TABLA DE PREGUNTAS#####################################################

#Mostrar todas las preguntas#
@cross_origin()
@app.route('/getQuestions', methods=['GET'])
def getQuestions():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM pregunta')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'ID': result[0], 'ID_tipoPregunta': result[1], 'Pregunta': result[2]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Añadir nueva pregunta
@cross_origin()
@app.route('/añadirPregunta', methods=['POST'])
def añadirPregunta():
    try:
        if request.method == 'POST':
            tipoPregunta=request.json['ID_tipoPregunta']
            Pregunta= request.json['Pregunta']
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO pregunta (ID_tipoPregunta, Pregunta) VALUES (%s,%s)", (tipoPregunta, Pregunta))
            mysql.connection.commit()
            return jsonify({"informacion":"Registro exitoso"})
        
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Contar preguntas#
@cross_origin()
@app.route('/countQuestions',methods=['GET'])
def countQuestions():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT COUNT(*) as Total from pregunta')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'total': result[0]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Consultar pregunta por ID#
@cross_origin()
@app.route('/getQuestionID/<id>',methods=['GET'])
def getQuestionID(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM pregunta WHERE id = %s', (id))
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'ID': result[0], 'ID_tipoPregunta': result[1], 'Pregunta': result[2]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Actualizar pregunta por ID#
@cross_origin()
@app.route('/updateQuestion/<id>', methods=['PUT'])
def updateQuestion(id):
    try:
        tipoPregunta=request.json['ID_tipoPregunta']
        Pregunta= request.json['Pregunta']
        cur = mysql.connection.cursor()
        cur.execute("""UPDATE pregunta SET ID_tipoPregunta = %s,Pregunta = %s WHERE id = %s""", (tipoPregunta, Pregunta, id))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro actualizado"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Eliminar pregunta por ID#
@cross_origin()
@app.route('/deleteQuestion/<id>', methods = ['DELETE'])
def deleteQuestion(id):
    try:
        Id=int(id)
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM pregunta WHERE ID=%s',(Id,))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro eliminado"}) 
    except Exception as e:
        print("EL ERROR ES: ",e)
        return jsonify({"informacion":"Hubo un error"})

#######################################################TABLA DE RESPUESTAS####################################################

#Consultar todas las respuestas#
@cross_origin()
@app.route('/getAnswers', methods=['GET'])
def getAnswers():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM respuestas')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'ID': result[0], 'Respuesta': result[1], 'ID_Pregunta': result[2]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Añadir nueva pregunta
@cross_origin()
@app.route('/añadirRespuesta', methods=['POST'])
def añadirRespuesta():
    try:
        if request.method == 'POST':
            Respuesta=request.json['Respuesta']
            Pregunta= request.json['Pregunta']
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO respuestas (Respuesta, ID_Pregunta) VALUES (%s,%s)", (Respuesta, Pregunta))
            mysql.connection.commit()
            return jsonify({"informacion":"Registro exitoso"})
        
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    
#Contar respuestas#
@cross_origin()
@app.route('/countAnswers',methods=['GET'])
def countAnswers():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT COUNT(*) as Total from respuestas')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'total': result[0]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Consultar respuesta por ID
@cross_origin()
@app.route('/getAnswersID/<id>',methods=['GET'])
def getAnswersID(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM respuestas WHERE id = %s', (id))
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'ID': result[0], 'Respuesta': result[1], 'ID_tipoPregunta': result[2]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Actualizar respuesta por ID#
@cross_origin()
@app.route('/updateAnswer/<id>', methods=['PUT'])
def updateAnswer(id):
    try:
        Respuesta=request.json['Respuesta']
        Pregunta= request.json['Pregunta']
        cur = mysql.connection.cursor()
        cur.execute("""UPDATE respuestas SET Respuesta = %s,ID_Pregunta = %s WHERE id = %s""", (Respuesta, Pregunta, id))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro actualizado"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#Eliminar respuesta por ID#
@cross_origin()
@app.route('/deleteAnswer/<id>', methods = ['DELETE'])
def deleteAnswer(id):
    try:
        Id=int(id)
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM respuestas WHERE ID=%s',(Id,))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro eliminado"}) 
    except Exception as e:
        print("EL ERROR ES: ",e)
        return jsonify({"informacion":"Hubo un error"})
    
#####################################################TABLA DE CONVERSACION####################################################

#Consultar todas las respuestas#
@cross_origin()
@app.route('/getConversations', methods=['GET'])
def getConversations():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM conversacion')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'ID': result[0], 'ID_Usuario': result[1], 'ID_Pregunta': result[2],"Fecha_hora":result[3]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

if __name__=="__main__":
    app.run(host="127.0.0.1",port=5000,debug=True)
