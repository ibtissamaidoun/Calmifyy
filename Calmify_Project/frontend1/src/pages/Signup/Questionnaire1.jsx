// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/Questionnaire1.css";

const Questionnaire1 = () => {
    const [answers, setAnswers] = useState({
        headaches: '',
        sleep: '',
        timeManagement: '',
        irritability: '',
        appointments: ''
    });

    const handleAnswerChange = (question, value) => {
        setAnswers(prev => ({
            ...prev,
            [question]: value
        }));
    };

    const questions = [
        {
            id: 'headaches',
            text: 'Avez-vous des maux de tête ou des migraines ?'
        },
        {
            id: 'sleep',
            text: 'Votre sommeil est-il perturbé (réveils, insomnies, hypersomnies) ?'
        },
        {
            id: 'timeManagement',
            text: 'Avez-vous l\'impression de ne jamais avoir le temps de faire les choses ?'
        },
        {
            id: 'irritability',
            text: 'Les autres vous énervent-ils ?'
        },
        {
            id: 'appointments',
            text: 'Oubliez-vous souvent des rendez-vous ?'
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
        <div className="questionnaire-container">
            <div className="questionnaire-content">
                <h1>Questionnaire de Stress</h1>
                <p className="subtitle">Veuillez répondre aux questions suivantes :</p>

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
                <Link to="/Questionnaire2">
                    <button className="next-button">Next</button>
                </Link>
            </div>
        </div>
    );
};

export default Questionnaire1;