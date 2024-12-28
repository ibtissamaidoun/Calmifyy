from flask import Flask, request, jsonify
from app.predict import predict_emotions  # Importer la fonction NLP corrigée

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze_text():
    data = request.json
    text = data.get("text", "")

    # Analyse NLP
    result = predict_emotions(text)

    # Retourner les résultats sous forme JSON
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
