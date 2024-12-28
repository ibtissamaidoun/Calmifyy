from utils import predict_emotions, map_emotions_to_stress

# Test des fonctions
if __name__ == "__main__":
    text = "I feel happy about exams."
    scores = predict_emotions(text)
    print(f"Emotion scores: {scores}")
    stress = map_emotions_to_stress(scores)
    print(f"Stress level: {stress}")
