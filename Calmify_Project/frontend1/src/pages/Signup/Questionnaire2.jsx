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
            text: 'Do you have difficulty concentrating on a task or staying focused for a long time?'
        },
        {
            id: 'pressure',
            text: 'Do you feel a constant sense of pressure, even when you have nothing urgent to do?'
        },
        {
            id: 'support',
            text: 'Do you think you need external support to better manage your stress?'
        },
        {
            id: 'overload',
            text: 'Do you often experience frequent or permanent work overload?'
        },
        {
            id: 'fatigue',
            text: 'Do you often feel unexplained fatigue, even after a full night’s sleep?'
        }
    ];


    const options = [
        { value: '0', label: 'Not at all' },
        { value: '1', label: 'Slightly' },
        { value: '2', label: 'Somewhat' },
        { value: '3', label: 'Fairly' },
        { value: '4', label: 'A lot' },
        { value: '5', label: 'Extremely' }
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
