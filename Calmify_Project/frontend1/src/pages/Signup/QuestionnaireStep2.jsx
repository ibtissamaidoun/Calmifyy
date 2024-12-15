// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import "../../styles/QuestionnaireStep2.css";

const questions = [
    "Avez-vous des difficultés à vous concentrer sur une tâche ou à rester attentif pendant longtemps ?",
    "Ressentez-vous une sensation de pression constante, même lorsque vous n’avez rien d’urgent à faire ?",
    "Pensez-vous avoir besoin d’un soutien extérieur pour mieux gérer votre stress ?",
    "Subissez-vous une surcharge de travail fréquente ou permanente ?",
    "Ressentez-vous souvent une fatigue inexpliquée, même après une nuit complète de sommeil ?"
];

const options = [
    { value: 0, label: "0 : Pas du tout" },
    { value: 1, label: "1 : Faiblement" },
    { value: 2, label: "2 : Un peu" },
    { value: 3, label: "3 : Assez" },
    { value: 4, label: "4 : Beaucoup" },
    { value: 5, label: "5 : Extrêmement" }
];

// eslint-disable-next-line react/prop-types
function Question({ number, question, options, selectedValue, onChange }) {
    return (
        <div className="question-container">
            <p className="question-text">{number}. {question}</p>
            <div className="options-container">
                {/* eslint-disable-next-line react/prop-types */}
                {options.map((option) => (
                    <label key={option.value} className="option-label">
                        <input
                            type="radio"
                            name={`question-${number}`}
                            value={option.value}
                            checked={selectedValue === option.value}
                            onChange={() => onChange(option.value)}
                        />
                        <span className="radio-text">{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

function Questionnaire() {
    const [answers, setAnswers] = useState({});

    const handleAnswerChange = (questionIndex, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionIndex]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Answers:', answers);
        // Handle form submission here
    };

    return (
        <div className="questionnaire-container">
            <div className="questionnaire-content">
                <h1>Questionnaire de Stress</h1>
                <p className="subtitle">Veuillez répondre aux questions suivantes :</p>

                <div className="questions-container">
                    {questions.map((question, index) => (
                        <Question
                            key={index}
                            number={index + 1}
                            question={question}
                            options={options}
                            selectedValue={answers[index]}
                            onChange={(value) => handleAnswerChange(index, value)}
                        />
                    ))}
                </div>

                <button className="next-button" onClick={handleSubmit}>
                    S'inscrire
                </button>
                <button  className="next-button left-button" onClick={handleSubmit}>
                    Back
                </button>
            </div>
        </div>
    );
}

export default Questionnaire;