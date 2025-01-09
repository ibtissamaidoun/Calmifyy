from transformers import pipeline
import shap

# Charger le modèle DistilBERT pour l'analyse des émotions
emotion_classifier = pipeline("text-classification", model="bhadresh-savani/distilbert-base-uncased-emotion", return_all_scores=True)

# def predict_emotions(text):
#     """
#     Prédit les émotions d'un texte donné.
#     :param text: String (texte de l'utilisateur)
#     :return: Dictionnaire {émotion: score}
#     """
#     results = emotion_classifier(text)
#     # Convertir les résultats en dictionnaire {émotion: score}
#     return {res['label']: res['score'] for res in results}

# Initialiser l'explainer SHAP
explainer = shap.Explainer(emotion_classifier)

def predict_emotions_with_explanation(text):
    """
    Prédit les émotions et génère une explication des prédictions.
    :param text: String (texte de l'utilisateur)
    :return: Tuple (Dictionnaire des scores d'émotions, explications des mots)
    """
    # Étape 1 : Prédire les émotions
    results = emotion_classifier(text)
    emotion_scores = {res['label']: res['score'] for res in results[0]}  # Retourne les scores d'émotions

    # Étape 2 : Visualiser l'explicabilité de la prédiction
    # SHAP explainer retourne les détails de contribution des mots    shap_values = explainer([text])  # SHAP pour une seule phrase
    shap_values = explainer([text])

    return emotion_scores, shap_values


def map_emotions_to_stress(emotion_scores):
    """
    Mappe les scores d'émotions aux niveaux de stress.
    :param emotion_scores: Dictionnaire des scores d'émotions
    :return: Niveau de stress (High, Moderate, Low)
    """
    stress_categories = {"High": 0, "Moderate": 0, "Low": 0}

    for emotion, score in emotion_scores.items():
        if emotion in ["sadness", "fear", "anger"]:
            stress_categories["High"] += score
        elif emotion == "joy":

            stress_categories["Low"] += score
        elif emotion in ["surprise", "neutral"]:
            stress_categories["Moderate"] += score

    # Déterminer le stress dominant
    stress_level = max(stress_categories, key=stress_categories.get)
    return stress_level
