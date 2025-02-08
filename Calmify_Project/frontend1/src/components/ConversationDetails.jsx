import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInstance';

const ConversationDetails = () => {
    const { id } = useParams();
    const [conversation, setConversation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const response = await axiosInstance.get(`/conversations/${id}`);
                setConversation(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération de la conversation :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConversation();
    }, [id]);

    if (loading) {
        return <div>Chargement de la conversation...</div>;
    }

    return (
        <div>
            <h2>Conversation ID: {id}</h2>
            <p><strong>Début :</strong> {new Date(conversation.start_time).toLocaleString()}</p>
            <p><strong>Status :</strong> {conversation.status}</p>
            <h3>Messages</h3>
            <div>
                {conversation.messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.role}:</strong> {msg.message}
                        <br />
                        <em>({new Date(msg.timestamp).toLocaleString()})</em>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConversationDetails;
