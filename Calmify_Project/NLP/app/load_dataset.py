import pandas as pd

# Chemin vers le fichier CSV
DATA_PATH = "../data/stress_dataset.csv"

def load_dataset():
    """Charge et affiche les premières lignes du dataset."""
    try:
        # Charger le dataset avec vérification des colonnes nécessaires
        dataset = pd.read_csv(DATA_PATH)
        if "Messages" not in dataset.columns:
            raise ValueError("La colonne 'Messages' est manquante dans le dataset.")
        print("Dataset chargé avec succès !")
        print(dataset.head())
        return dataset
    except FileNotFoundError:
        print(f"Erreur : le fichier {DATA_PATH} est introuvable.")
        return None
    except ValueError as ve:
        print(f"Erreur dans le dataset : {ve}")
        return None

# Charger et afficher les données
if __name__ == "__main__":
    load_dataset()
