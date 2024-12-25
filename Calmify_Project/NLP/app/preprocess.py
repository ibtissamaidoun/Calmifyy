import re
import pandas as pd
from transformers import AutoTokenizer

# Charger le tokenizer pré-entraîné
TOKENIZER = AutoTokenizer.from_pretrained("bhadresh-savani/distilbert-base-uncased-emotion")

def clean_text(text):
    """
    Nettoie le texte en supprimant les caractères spéciaux et les espaces inutiles.
    """
    # Vérifier si le texte est non null avant nettoyage
    if pd.isnull(text):
        return ""
    text = re.sub(r"[^a-zA-Z0-9\s]", "", text)  # Supprimer les caractères spéciaux
    text = text.lower().strip()  # Mettre en minuscules et supprimer les espaces inutiles
    return text

def tokenize_texts(texts):
    """
    Tokenize une liste de textes en utilisant un tokenizer Hugging Face.
    """
    return TOKENIZER(
        texts,
        padding=True,              # Ajoute un padding pour les séquences plus courtes
        truncation=True,           # Tronque les séquences trop longues
        max_length=128,            # Longueur maximale des séquences
        return_tensors="pt"        # Retourne les données sous forme de tensors PyTorch
    )

def preprocess_dataset(file_path):
    """
    Charge et prétraite le dataset à partir d'un fichier CSV.
    """
    # Charger le dataset
    dataset = pd.read_csv(file_path)

    if "Messages" not in dataset.columns:
        raise ValueError("La colonne 'Messages' est manquante dans le dataset.")

    # Nettoyer les textes
    dataset["Messages"] = dataset["Messages"].apply(clean_text)

    # Tokenizer les messages
    tokens = tokenize_texts(dataset["Messages"].tolist())

    return dataset, tokens

# Ajouter cette partie pour exécuter et afficher les résultats
if __name__ == "__main__":
    file_path = "../data/stress_dataset.csv"  # Assurez-vous que le chemin est correct
    try:
        dataset, tokens = preprocess_dataset(file_path)
        print("Dataset après nettoyage :")
        print(dataset.head())  # Affichez les premières lignes du dataset
        print("\nTokens générés :")
        print(tokens)  # Affichez les tokens générés
    except FileNotFoundError:
        print(f"Erreur : Le fichier '{file_path}' est introuvable.")
    except ValueError as ve:
        print(f"Erreur dans le dataset : {ve}")
