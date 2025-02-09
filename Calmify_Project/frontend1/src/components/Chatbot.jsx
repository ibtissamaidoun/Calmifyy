// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
// import ChatHistory from "./ChatHistory";
// import ChatInput from "./ChatInput";
import "../styles/Chatbot.css"; // Ajoutez du CSS si nécessaire
import axiosInstance from "../AxiosInstance"; // Utilisez axios-instance configuré pour vos appels API
const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Ajout du message utilisateur
        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);

        try {
            // Appel à l'API backend
            const response = await axiosInstance.post("/chat", { text: input });
            const botResponse = {
                role: "bot",
                content: response.data.chatbot_response || "No response from server.",
            };

            // Mise à jour des messages avec la réponse du bot
            setMessages((prev) => [...prev, botResponse]);
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            // Gestion des erreurs
            const errorMessage = {
                role: "bot",
                content: "Error: Could not connect to the server.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        }

        // Réinitialisation de l'input
        setInput("");
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <div style={{ marginBottom: "20px", background: "#f9f9f9", padding: "10px", borderRadius: "5px" }}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            textAlign: msg.role === "user" ? "right" : "left",
                            margin: "10px 0",
                            padding: "10px",
                            borderRadius: "10px",
                            background: msg.role === "user" ? "#d1e7ff" : "#e8f5e9",
                        }}
                    >
                        <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                    </div>
                ))}
            </div>
            <div style={{ display: "flex" }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage} style={{ padding: "10px", marginLeft: "5px", borderRadius: "5px", background: "#007bff", color: "#fff" }}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
