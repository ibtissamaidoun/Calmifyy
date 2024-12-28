
from transformers import pipeline

# Load the emotion classifier model using PyTorch
emotion_classifier = pipeline(
    "text-classification", 
    model="bhadresh-savani/distilbert-base-uncased-emotion", 
    framework="pt"
)

def predict_emotions(text):
    """
    Predict emotions from the input text.
    """
    results = emotion_classifier(text)
    return {res['label']: res['score'] for res in results}

def map_emotions_to_stress(emotion_scores):
    """
    Map emotion scores to stress levels.
    """
    stress_levels = {"High": 0, "Moderate": 0, "Low": 0}
    for emotion, score in emotion_scores.items():
        if emotion in ["sadness", "fear", "anger"]:
            stress_levels["High"] += score
        elif emotion == "joy":
            stress_levels["Low"] += score
        elif emotion in ["surprise", "neutral"]:
            stress_levels["Moderate"] += score
    return max(stress_levels, key=stress_levels.get)
