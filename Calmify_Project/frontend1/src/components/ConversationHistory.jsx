import { useEffect, useState } from "react";
import axiosInstance from "../Utils/axios-instance";

const ConversationHistory = () => {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await axiosInstance.get("/api/conversations");
                setConversations(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des conversations :", error);
            }
        };

        fetchConversations();
    }, []);

    return (
        <div>
            <h2>Historique des Conversations</h2>
            {conversations.map((conv) => (
                <div key={conv.idc}>
                    <p><strong>Début :</strong> {new Date(conv.startTime).toLocaleString()}</p>
                    <p><strong>Fin :</strong> {new Date(conv.endTime).toLocaleString()}</p>
                    <p><strong>Messages :</strong></p>
                    <ul>
                        {JSON.parse(conv.messages).map((msg, index) => (
                            <li key={index}><strong>{msg.role}:</strong> {msg.message}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ConversationHistory;
