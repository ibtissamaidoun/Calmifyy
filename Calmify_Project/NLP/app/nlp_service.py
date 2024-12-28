from flask import Flask, request, jsonify
from utils import predict_emotions, map_emotions_to_stress
from lime.lime_text import LimeTextExplainer
import numpy as np

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze_text():
    data = request.json
    text = data.get("text", "")

    # Prédire les émotions
    emotion_scores = predict_emotions(text)

    # Mapper les émotions au niveau de stress
    stress_level = map_emotions_to_stress(emotion_scores)

    # Expliquez les prédictions avec LIME
    explainer = LimeTextExplainer(class_names=["anger", "fear", "joy", "love", "sadness", "surprise"])

    def lime_predict(texts):
        predictions = []
        for txt in texts:
            scores = predict_emotions(txt)
            class_scores = [scores.get(cls, 0.0) for cls in explainer.class_names]
            predictions.append(class_scores)
        return np.array(predictions)

    try:
        explanation = explainer.explain_instance(
            text_instance=text,
            classifier_fn=lime_predict,
            num_features=5
        )
        explanations = [{"word": word, "importance": importance} for word, importance in explanation.as_list()]
    except Exception as e:
        explanations = {"error": str(e)}

    # Créer une réponse complète
    response = {
        "emotionScores": emotion_scores,
        "stressLevel": stress_level,
        "explanations": explanations
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
