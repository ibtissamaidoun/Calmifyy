from transformers import pipeline

# Charger le modèle de classification d'émotions
emotion_classifier = pipeline(
    "text-classification",
    model="bhadresh-savani/distilbert-base-uncased-emotion",
    framework="pt"
)

def predict_emotions(text):
    """
    Prévoir les émotions à partir du texte d'entrée.
    """
    # Utiliser le classificateur pour prédire les émotions
    results = emotion_classifier(text)

    # Extraire les étiquettes (émotions) et leurs scores
    emotion_scores = {res['label']: res['score'] for res in results}

    # Mapper les émotions aux niveaux de stress
    stress_level = map_emotions_to_stress(emotion_scores)

    # Retourner les émotions et le niveau de stress
    return {
        "feelings": max(emotion_scores, key=emotion_scores.get),  # Emotion dominante
        "stressLevel": stress_level
    }

def map_emotions_to_stress(emotion_scores):
    """
    Mapper les scores des émotions aux niveaux de stress.
    """
    stress_levels = {"High": 0, "Moderate": 0, "Low": 0}
    for emotion, score in emotion_scores.items():
        if emotion in ["sadness", "fear", "anger"]:
            stress_levels["High"] += score
        elif emotion == "joy":
            stress_levels["Low"] += score
        elif emotion in ["surprise", "neutral"]:
            stress_levels["Moderate"] += score

    # Retourner le niveau de stress avec le score le plus élevé
    return max(stress_levels, key=stress_levels.get)
