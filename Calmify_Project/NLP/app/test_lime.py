import logging
from transformers import logging as transformers_logging
from predict import predict_emotions, map_emotions_to_stress
from lime.lime_text import LimeTextExplainer
import numpy as np

# Suppress verbose logs
logging.getLogger("transformers").setLevel(logging.ERROR)
transformers_logging.set_verbosity_error()

# Example text for emotion prediction
text = "I feel overwhelmed and scared about my exams."

# Predict emotions
emotion_scores = predict_emotions(text)
print(f"Scores d'émotions : {emotion_scores}")

# Map emotions to stress
stress_level = map_emotions_to_stress(emotion_scores)
print(f"Niveau de stress estimé : {stress_level}")

# Explain predictions using LIME
explainer = LimeTextExplainer(class_names=["anger", "fear", "joy", "love", "sadness", "surprise"])

# Define a prediction function for LIME
def lime_predict(texts):
    predictions = []
    for txt in texts:
        scores = predict_emotions(txt)
        predictions.append([scores.get(cls, 0.0) for cls in explainer.class_names])
    return np.array(predictions)

# Generate explanation
try:
    explanation = explainer.explain_instance(
        text_instance=text,
        classifier_fn=lime_predict,
        num_features=5
    )

    # Print LIME explanation
    print("\nExplication des prédictions :")
    for word, importance in explanation.as_list():
        print(f"Mot : {word}, Importance : {importance}")
except Exception as e:
    print(f"Erreur lors de l'explication : {e}")
