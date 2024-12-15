import React, { useState } from 'react';
import '../../styles/QuestionnaireStep1.css';

const questions = [
    "Avez-vous des maux de tête ou des migraines ?",
    "Votre sommeil est-il perturbé (réveils, insomnies, hypersomnies) ?",
    "Avez-vous l'impression de ne jamais avoir le temps de faire les choses ?",
    "Les autres vous énervent-ils ?",
    "Oubliez-vous souvent des rendez-vous ?"
];

const options = [
    { value: 0, label: "0 : Pas du tout" },
    { value: 1, label: "1 : Faiblement" },
    { value: 2, label: "2 : Un peu" },
    { value: 3, label: "3 : Assez" },
    { value: 4, label: "4 : Beaucoup" },
    { value: 5, label: "5 : Extrêmement" }
];

function Question({ number, question, options, selectedValue, onChange }) {
    return (
        <div className="question-container">
            <p className="question-text">{number}. {question}</p>
            <div className="options-container">
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

                <div className="button-container">
                    <button className="next-button">Next --> </button>
                </div>
            </div>
        </div>
    );
}

export default Questionnaire;