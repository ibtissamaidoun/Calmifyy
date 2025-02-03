import sys
import os
from flask import Flask, request, jsonify
import multiprocessing
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Ajout du répertoire des services au PATH
service_dir = os.path.join(os.path.dirname(__file__), "services")
if service_dir not in sys.path:
    sys.path.append(service_dir)

print("Répertoire des services ajouté au PATH Python :", sys.path)

# Importation des services personnalisés
try:
    from services.emotion_analysis import predict_emotions, map_emotions_to_stress
    print("Services importés avec succès.")
except ImportError as e:
    print(f"Erreur lors de l'importation des services : {e}")
    raise

# Initialisation de Flask
app = Flask(__name__)

# Configuration du modèle Flan-T5
MODEL_NAME = "google/flan-t5-base"  # Modèle léger et rapide
print("Chargement du modèle Flan-T5...")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
print("Modèle Flan-T5 et tokenizer chargés avec succès.")

@app.route('/test', methods=['GET'])
def test():
    print("Endpoint /test appelé")
    return jsonify({"message": "Le serveur fonctionne correctement !"})

@app.route('/chat', methods=['POST'])
def chat():
    try:
        print("Endpoint /chat appelé")
        
        # Vérification et récupération des données JSON
        data = request.get_json()
        if not data or "text" not in data or not isinstance(data["text"], str):
            return jsonify({"error": "Donnée invalide : 'text' doit être une chaîne"}), 400
        
        user_input = data["text"]
        print("Données reçues :", user_input)

        # Étape 1 : Analyse des émotions et du niveau de stress
        try:
            print("Analyse des émotions...")
            emotion_scores = predict_emotions(user_input)
            print("Scores des émotions :", emotion_scores)

            print("Mapping du niveau de stress...")
            stress_level = map_emotions_to_stress(emotion_scores)
            print("Niveau de stress :", stress_level)
        except Exception as e:
            return jsonify({"error": f"Erreur lors de l'analyse des émotions : {e}"}), 500

        # Étape 2 : Génération de la réponse du chatbot avec Flan-T5
        try:
            print("Génération de la réponse du chatbot...")
            input_ids = tokenizer(
                user_input,
                return_tensors="pt",
                padding=True,
                truncation=True,
                max_length=50
            )
            outputs = model.generate(
                input_ids["input_ids"],
                max_length=50,  # Réponses courtes
                temperature=0.7,
                top_p=0.9,
                do_sample=True
            )
            chatbot_response = tokenizer.decode(outputs[0], skip_special_tokens=True)
            print("Réponse du chatbot :", chatbot_response)

        except Exception as e:
            return jsonify({"error": f"Erreur lors de la génération de réponse : {e}"}), 500

        # Génération de la recommandation basée sur le niveau de stress
        recommendation = ""
        if stress_level == "faible":
            recommendation = "Nous vous encourageons avec des messages de motivation. Continuez ainsi ! 😊"
        elif stress_level == "moyen":
            recommendation = "Nous vous recommandons des vidéos de relaxation. Prenez du temps pour vous ! 🧘‍♂"
        elif stress_level == "élevé":
            recommendation = "Votre niveau de stress est élevé. Nous allons organiser une rencontre avec un psychologue. 🏥"

        return jsonify({
            "user_input": user_input,
            "emotions": emotion_scores,
            "stress_level": stress_level,
            "chatbot_response": chatbot_response,
            "recommendation": recommendation
        })

    except Exception as e:
        print(f"Erreur dans l'endpoint /chat : {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    multiprocessing.freeze_support()
    try:
        print("Démarrage du serveur Flask...")
        app.run(host="0.0.0.0", port=5000, debug=False, use_reloader=False)
    except Exception as e:
        print(f"Erreur lors du démarrage du serveur Flask : {e}")