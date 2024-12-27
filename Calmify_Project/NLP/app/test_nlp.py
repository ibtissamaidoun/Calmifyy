# from predict import predict_emotions_with_explanation, map_emotions_to_stress

# if __name__ == "__main__":
#     # Exemple de texte utilisateur
#     user_input = ["I feel overwhelmed and scared about my exams."]

#     # Prédictions avec explications
#     try:
#         emotion_scores, explanation = predict_emotions_with_explanation(user_input)
#         print(f"Scores d'émotions : {emotion_scores}")

#         # Mapper les émotions au niveau de stress
#         stress_level = map_emotions_to_stress(emotion_scores)
#         print(f"Niveau de stress estimé : {stress_level}")

#         # Afficher les explications SHAP
#         print("\nExplication des prédictions :")
#         for exp in explanation:
#             print(f"Mot : {exp['word']}, Importance : {exp['importance']}")
#     except ValueError as e:
#         print(f"Erreur : {e}")
from predict import predict_emotions_with_explanation, map_emotions_to_stress
if __name__ == "_main_":
    # Exemple de texte utilisateur
    user_input = "I feel overwhelmed and scared about my exams."  # Doit être une chaîne

    # Vérifiez si l'entrée est bien une chaîne ou une liste
    print(f"Debug: Valeur de l'entrée : {user_input}")
    print(f"Debug: Type de l'entrée : {type(user_input)}")

    if not isinstance(user_input, str):
        raise ValueError("L'entrée doit être de type 'str'.")

    try:
        # Étape 1 : Prédire les émotions avec explications
        emotion_scores, explanation = predict_emotions_with_explanation(user_input)
        print(f"Scores d'émotions : {emotion_scores}")

        # Étape 2 : Mapper les émotions au stress
        stress_level = map_emotions_to_stress(emotion_scores)
        print(f"Niveau de stress estimé : {stress_level}")

        # Étape 3 : Afficher les explications SHAP
        print("\nExplication des prédictions :")
        for exp in explanation:
            print(f"Mot : {exp['word']}, Importance : {exp['importance']}")
    except Exception as e:
        print(f"Une erreur s'est produite : {e}")
