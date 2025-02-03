import logging
from transformers import logging as transformers_logging
from predict import predict_emotions, map_emotions_to_stress
from lime.lime_text import LimeTextExplainer
import numpy as np

# Suppress verbose logs
logging.getLogger("transformers").setLevel(logging.ERROR)
transformers_logging.set_verbosity_error()

# Texte d'exemple pour la prédiction des émotions
text = "I feel overwhelmed and scared about my exams."

# Prédire les émotions
emotion_scores = predict_emotions(text)
print(f"Scores d'émotions : {emotion_scores}")

# Mapper les émotions au niveau de stress
stress_level = map_emotions_to_stress(emotion_scores)
print(f"Niveau de stress estimé : {stress_level}")

# Expliquez les prédictions avec LIME
explainer = LimeTextExplainer(class_names=["anger", "fear", "joy", "love", "sadness", "surprise"])

# Définir une fonction de prédiction pour LIME
def lime_predict(texts):
    """
    Prend en entrée une liste de textes et retourne un tableau
    de scores pour chaque classe d'émotions (par texte).
    """
    predictions = []
    for txt in texts:
        scores = predict_emotions(txt)
        # Créer une liste ordonnée de scores pour chaque classe
        class_scores = [scores.get(cls, 0.0) for cls in explainer.class_names]
        predictions.append(class_scores)
    return np.array(predictions)

# Générer une explication
try:
    explanation = explainer.explain_instance(
        text_instance=text,
        classifier_fn=lime_predict,
        num_features=5
    )

    # Imprimer l'explication de LIME
    print("\nExplication des prédictions :")
    for word, importance in explanation.as_list():
        print(f"Mot : {word}, Importance : {importance}")
except Exception as e:
    print(f"Erreur lors de l'explication : {e}")