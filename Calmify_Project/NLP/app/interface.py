import chainlit as cl
import requests
import json
import os
import logging

SAVE_FILE = "conversations.json"

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def load_conversations():
    if os.path.exists(SAVE_FILE):
        try:
            with open(SAVE_FILE, "r", encoding="utf-8") as file:
                return json.load(file)
        except json.JSONDecodeError:
            logging.error("Erreur lors du chargement des conversations.")
            return []
    return []

def save_conversations(conversations):
    try:
        with open(SAVE_FILE, "w", encoding="utf-8") as file:
            json.dump(conversations, file, indent=4, ensure_ascii=False)
    except Exception as e:
        logging.error(f"Erreur lors de la sauvegarde : {e}")

conversations = load_conversations()

@cl.on_message
async def main(message):
    API_URL = "http://127.0.0.1:5000/chat"

    try:
        logging.info(f"Message reçu : {message.content}")
        response = requests.post(API_URL, json={"text": message.content}, timeout=30)

        if response.status_code == 200:
            data = response.json()
            chatbot_response = data.get("chatbot_response", "Pas de réponse.")
            recommendation = data.get("recommendation", "")

            conversations.append({
                "user_input": message.content,
                "chatbot_response": chatbot_response,
                "recommendation": recommendation
            })
            save_conversations(conversations)

            await cl.Message(content=f"Chatbot: {chatbot_response}").send()
            if recommendation:
                await cl.Message(content=f"Recommandation: {recommendation}").send()
        else:
            logging.error(f"Erreur API : {response.status_code}, détail : {response.text}")
            await cl.Message(content=f"Erreur de l'API : {response.status_code}, détail : {response.text}").send()

    except requests.ConnectionError:
        logging.error("Impossible de se connecter à l'API Flask.")
        await cl.Message(content="Impossible de se connecter à l'API. Assurez-vous que le serveur Flask est en cours d'exécution.").send()
    except requests.Timeout:
        logging.error("Le délai de connexion à l'API a été dépassé.")
        await cl.Message(content="Le délai de connexion à l'API a été dépassé.").send()
    except Exception as e:
        logging.error(f"Erreur lors de l'appel de l'API : {e}")
        await cl.Message(content=f"Erreur lors de l'appel de l'API : {e}").send()