from predict import predict_emotions_with_explanation, map_emotions_to_stress
import shap

if __name__ == "__main__":
    # Exemple de texte utilisateur
    user_input = "I feel overwhelmed and scared about my exams."

    # Étape 1 : Prédire les émotions avec explicabilité SHAP
    emotion_scores, shap_values = predict_emotions_with_explanation(user_input)
    print(f"Scores d'émotions : {emotion_scores}")

    # Étape 2 : Mapper les émotions au stress
    stress_level = map_emotions_to_stress(emotion_scores)
    print(f"Niveau de stress estimé : {stress_level}")

    # Étape 3 : Afficher les explications SHAP sur la console et sauvegarder sous forme HTML
    print("\nVisualisation des mots les plus importants pour les prédictions :")

    # Créer une visualisation interactive
    visualization = shap.plots.text(shap_values)

    # Sauvegarder cette visualisation dans un fichier HTML
    with open("shap_visualization.html", "w", encoding="utf-8") as out_file:
        out_file.write(visualization.data)  # `.data` contient le HTML généré

    print("Visualisation SHAP sauvegardée dans le fichier : shap_visualization.html")
