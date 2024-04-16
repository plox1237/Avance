from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
import nltk
import json
import random
import datetime
import numpy as np
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

# Base de datos
app.config["MYSQL_HOST"]="localhost"
app.config['MYSQL_USER']="root"
app.config['MYSQL_PASSWORD']=''
app.config['MYSQL_DB']='ia'
app.config["MYSQL_PORT"]=3306
mysql=MySQL(app)

# Descargar recursos de NLTK
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('stopwords')

# Lista de palabras vacías (stopwords) en español
stop_words = set(stopwords.words('spanish'))

# Cargar el modelo entrenado
modelo = load_model('modelo.hiper.h5')

# Cargar datos de entrenamiento
with open('datos.json', 'r', encoding='utf-8') as file:
    datos = json.load(file)

# Inicializar lematizador
lemmatizer = WordNetLemmatizer()

def procesar_mensaje(mensaje, datos):
    bolsa_palabras = []
    # Tokenizar y lematizar el mensaje
    tokens = nltk.word_tokenize(mensaje)
    words = [lemmatizer.lemmatize(word.lower()) for word in tokens if word.isalnum() and word.lower() not in stop_words]
    
    # Si la entrada del usuario es una sola palabra, usar keywords directamente
    if len(words) == 1:
        # Obtener palabras clave de las keywords en los datos
        keywords_dict = {intent['tag']: intent.get('keywords', []) for intent in datos['intents']}
        # Calcular similitud de palabras clave
        similarity_scores = {}
        for tag, keywords in keywords_dict.items():
            keyword_count = sum(word in keywords for word in words)
            similarity_scores[tag] = keyword_count
    else:
        filtered_words = [word for word in words if word not in stop_words]
        if filtered_words:
            keywords_dict = {intent['tag']: intent.get('keywords', []) for intent in datos['intents']}
            similarity_scores = {}
            for tag, keywords in keywords_dict.items():
                keyword_count = sum(word in keywords for word in filtered_words)
                similarity_scores[tag] = keyword_count
            if max(similarity_scores.values()) == 0:
                # Procesar patrones
                pattern_scores = {}
                for intent in datos['intents']:
                    for pattern in intent['patterns']:
                        pattern_words = [lemmatizer.lemmatize(word.lower()) for word in nltk.word_tokenize(pattern) if word.isalnum() and word.lower() not in stop_words]
                        pattern_count = sum(word in pattern_words for word in filtered_words)
                        pattern_scores[intent['tag']] = pattern_count
                similarity_scores.update(pattern_scores)
    # Obtener el índice de la etiqueta predicha con mayor similitud
    predicha_tag_index = np.argmax(list(similarity_scores.values()))
    
    return list(similarity_scores.keys())[predicha_tag_index]

def obtener_respuesta(modelo, predicha_tag, intents):
    for intent in intents:
        if intent['tag'] == predicha_tag:
            respuesta = random.choice(intent['responses'])
            return respuesta

@app.route('/chat', methods=['POST'])
def chat():
    mensaje = request.json.get('mensaje', '')
    if not mensaje:
        return jsonify({'respuesta': 'Mensaje vacío'})

    predicha_tag = procesar_mensaje(mensaje, datos)
    respuesta_chatbot = obtener_respuesta(modelo, predicha_tag, datos['intents'])

    if respuesta_chatbot:
        try:
            usuarioID=request.json["ID"]
            fecha_hora=datetime.datetime.now()
            cursor=mysql.connection.cursor()
            cursor.execute("INSERT INTO historial_usuario (ID_Usuario,Texto,Respuesta,Fecha_hora) VALUES (%s,%s,%s,%s)",(usuarioID,mensaje,respuesta_chatbot,fecha_hora))
            mysql.connection.commit()
            cursor.close()
            return jsonify({'respuesta': respuesta_chatbot})
        except Exception as error:
            print("ERROR SUCEDIDO DURANTE EL REGISTRO DEL HISTORIAL: \n",error)
            return jsonify({"mensaje":"Error en el historial"})
    else:
        return jsonify({'respuesta': 'Lo siento, no puedo responder esa pregunta.'})

if __name__ == '__main__':
    app.run(host="127.0.0.1",port=3000,debug=True)
