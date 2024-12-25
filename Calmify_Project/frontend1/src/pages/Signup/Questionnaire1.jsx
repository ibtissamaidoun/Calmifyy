// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/Questionnaire1.css";
import axios from 'axios'; // Importation d'axios pour effectuer des requêtes HTTP

const Questionnaire1 = () => {
    const [questions, setQuestions] = useState([]); // State pour les questions retournées par l'API
    const [answers, setAnswers] = useState({}); // State pour stocker les réponses de l'utilisateur

    // Fonction pour récupérer les questions depuis le backend
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/questions');
                setQuestions(response.data); // Stocker les questions reçues dans le state
            } catch (error) {
                console.error("Erreur lors de la récupération des questions :", error);
            }
        };

        fetchQuestions();
    }, []); // Le tableau de dépendances est vide pour que cela s'exécute au chargement seulement

    // Gérer les changements des réponses dans le state
    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    // Options pour chaque question
    const options = [
        { value: '0', label: 'Not at all' },
        { value: '1', label: 'Slightly' },
        { value: '2', label: 'Somewhat' },
        { value: '3', label: 'Fairly' },
        { value: '4', label: 'A lot' },
        { value: '5', label: 'Extremely' }
    ];

    return (
        <div className="questionnaire-container">
            <div className="questionnaire-content">
                <h1>Stress Questionnaire</h1>
                <p className="subtitle">Please answer the following questions :</p>

                {/* Questions dynamiques */}
                <div className="questions-container">
                    {questions.map((question, index) => (
                        <div key={question.id} className="question-block">
                            <p className="question-text">{`${index + 1}. ${question.text}`}</p>
                            <div className="options-container">
                                {options.map((option) => (
                                    <label key={`${question.id}-${option.value}`} className="radio-label">
                                        <input
                                            type="radio"
                                            name={question.id}
                                            value={option.value}
                                            checked={answers[question.id] === option.value}
                                            onChange={() => handleAnswerChange(question.id, option.value)}
                                        />
                                        <span className="radio-text">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Bouton de navigation */}
                <Link to="/Questionnaire2">
                    <button className="next-button">Next</button>
                </Link>
            </div>
        </div>
    );
};

export default Questionnaire1;