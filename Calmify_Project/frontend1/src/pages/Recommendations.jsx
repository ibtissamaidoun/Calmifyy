import { useEffect, useState } from "react";
import axios from "../Utils/axios-instance"; // Assurez-vous que l'import est correct
import "../styles/Recommendations.css";

const Recommendations = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fonction pour récupérer l'utilisateur actuel
    const fetchCurrentUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("User not authenticated");
            }

            const response = await axios.get("http://localhost:8081/api/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data; // Retourne l'objet utilisateur
        } catch (err) {
            console.error("Failed to fetch current user:", err.message);
            throw new Error("Failed to fetch current user");
        }
    };

    // Fonction pour récupérer les recommandations
    const fetchRecommendations = async (userId) => {
        try {
            const response = await axios.get("http://localhost:8081/api/recommendations/generate", {
                params: {
                    nlpAnalysisId: 1, // Exemple, vous pouvez aussi le rendre dynamique
                    userId: userId,
                },
            });
            setVideos(response.data.videos || []);
        } catch (err) {
            console.error("Failed to fetch recommendations:", err.message);
            setError("Failed to fetch recommendations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const initialize = async () => {
            try {
                const user = await fetchCurrentUser(); // Récupérer l'utilisateur
                await fetchRecommendations(user.id); // Utiliser l'ID de l'utilisateur pour obtenir les recommandations
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        initialize();
    }, []);

    if (loading) {
        return <p>Loading recommendations...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="recommendations-container">
            <h2>Video Recommendations</h2>
            <div className="video-list">
                {videos.length > 0 ? (
                    videos.map((video) => (
                        <div key={video.idVR} className="video-card">
                            <h3>{video.title}</h3>
                            <p>{video.description}</p>
                            <a href={video.videoLink} target="_blank" rel="noopener noreferrer">
                                Watch Video
                            </a>
                        </div>
                    ))
                ) : (
                    <p>No recommendations available.</p>
                )}
            </div>
        </div>
    );
};

export default Recommendations;
