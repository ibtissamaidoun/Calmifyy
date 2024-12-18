import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/Questionnaire2.css"; // Assurez-vous de bien référencer le nouveau CSS

const Questionnaire2 = () => {
    const [answers, setAnswers] = useState({
        concentration: '',
        pressure: '',
        support: '',
        overload: '',
        fatigue: ''
    });

    const handleAnswerChange = (question, value) => {
        setAnswers(prev => ({
            ...prev,
            [question]: value
        }));
    };

    const questions = [
        {
            id: 'concentration',
            text: 'Avez-vous des difficultés à vous concentrer sur une tâche ou à rester attentif pendant longtemps ?'
        },
        {
            id: 'pressure',
            text: 'Ressentez-vous une sensation de pression constante, même lorsque vous n’avez rien d’urgent à faire ?'
        },
        {
            id: 'support',
            text: 'Pensez-vous avoir besoin d’un soutien extérieur pour mieux gérer votre stress ?'
        },
        {
            id: 'overload',
            text: 'Subissez-vous une surcharge de travail fréquente ou permanente ?'
        },
        {
            id: 'fatigue',
            text: 'Ressentez-vous souvent une fatigue inexpliquée, même après une nuit complète de sommeil ?'
        }
    ];

    const options = [
        { value: '0', label: '0 : Pas du tout' },
        { value: '1', label: '1 : Faiblement' },
        { value: '2', label: '2 : Un peu' },
        { value: '3', label: '3 : Assez' },
        { value: '4', label: '4 : Beaucoup' },
        { value: '5', label: '5 : Extrêmement' }
    ];

    return (
        <div className="questionnaire-step2-container">
            <div className="questionnaire-step2-content">
                <h1>Questionnaire de Stress</h1>
                <p className="subtitle-step2">Veuillez répondre aux questions suivantes :</p>

                <div className="questions-step2-container">
                    {questions.map((question, index) => (
                        <div key={question.id} className="question-step2-block">
                            <p className="question-step2-text">{`${index + 1}. ${question.text}`}</p>
                            <div className="options-step2-container">
                                {options.map((option) => (
                                    <label key={`${question.id}-${option.value}`} className="radio-step2-label">
                                        <input
                                            type="radio"
                                            name={question.id}
                                            value={option.value}
                                            checked={answers[question.id] === option.value}
                                            onChange={() => handleAnswerChange(question.id, option.value)}
                                        />
                                        <span className="radio-step2-text">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="buttons-step2-container">
                    <Link to="/Questionnaire1">
                    <button className="back-step2-button">Back</button>
                    </Link>
                    <button className="submit-step2-button">S'inscrire</button>
                </div>
            </div>
        </div>
    );
};

export default Questionnaire2;
