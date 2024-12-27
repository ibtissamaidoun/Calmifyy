from transformers import pipeline
import shap

# Charger le modèle DistilBERT pour l'analyse des émotions
emotion_classifier = pipeline(
    "text-classification",
    model="bhadresh-savani/distilbert-base-uncased-emotion",
    top_k=None  # Corrigé pour remplacer return_all_scores
)

def predict_wrapper(texts):
    """
    Fonction wrapper pour transformer la sortie du modèle en un format compatible avec SHAP.
    """
    # Vérifiez que l'entrée est une liste de chaînes
    if isinstance(texts, str):
        texts = [texts]  # Convertir une chaîne unique en liste
    elif not isinstance(texts, list):
        raise ValueError("L'entrée doit être de type str ou List[str].")

    # Tokenisation
    tokenized = emotion_classifier.tokenizer(
        texts, padding=True, truncation=True, return_tensors="pt"
    )

    # Sortie du modèle
    outputs = emotion_classifier.model(**tokenized)

    # Retourner les logits sous forme de tableau NumPy
    return outputs.logits.detach().numpy()

# Initialiser l'explainer avec la fonction wrapper
explainer = shap.Explainer(predict_wrapper, emotion_classifier.tokenizer)

def predict_emotions_with_explanation(text):
    """
    Prédit les émotions et génère une explication des prédictions.
    """
    # Vérifier que l'entrée est un texte
    if not isinstance(text, str):
        raise ValueError("Le texte d'entrée doit être une chaîne de caractères.")

    texts = [text]  # Convertir en liste

    # Calcul des prédictions d'émotions
    results = emotion_classifier(texts, top_k=None)
    emotion_scores = {res['label']: res['score'] for res in results[0]}

    # Calcul des valeurs SHAP
    tokenized = emotion_classifier.tokenizer(
        texts, padding=True, truncation=True, return_tensors="pt"
    )
    shap_values = explainer(tokenized)

    # Extraire les mots et leur importance
    words = shap_values.data[0]
    contributions = shap_values.values[0]

    explanation = [
        {"word": word, "importance": contribution}
        for word, contribution in zip(words, contributions)
    ]

    return emotion_scores, explanation

def map_emotions_to_stress(emotion_scores):
    """
    Mappe les scores d'émotions aux niveaux de stress.
    """
    stress_categories = {"High": 0, "Moderate": 0, "Low": 0}

    for emotion, score in emotion_scores.items():
        if emotion in ["sadness", "fear", "anger"]:
            stress_categories["High"] += score
        elif emotion == "joy":
            stress_categories["Low"] += score
        elif emotion in ["surprise", "neutral"]:
            stress_categories["Moderate"] += score

    stress_level = max(stress_categories, key=stress_categories.get)
    return stress_level

