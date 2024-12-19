// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/Questionnaire1.css";

// State for storing user responses
const Questionnaire1 = () => {
    const [answers, setAnswers] = useState({
        headaches: '',
        sleep: '',
        timeManagement: '',
        irritability: '',
        appointments: ''
    });
    // Handle changes to responses
    const handleAnswerChange = (question, value) => {
        setAnswers(prev => ({
            ...prev,
            [question]: value
        }));
    };

    // Questions to display in the questionnaire
    const questions = [
        {
            id: 'headaches',
            text: 'Do you experience headaches or migraines?'
        },
        {
            id: 'sleep',
            text: 'Is your sleep disrupted (waking up, insomnia, hypersomnia)?'
        },
        {
            id: 'timeManagement',
            text: 'Do you feel like you never have enough time to get things done?'
        },
        {
            id: 'irritability',
            text: 'Do other people irritate you?'
        },
        {
            id: 'appointments',
            text: 'Do you often forget appointments?'
        }
    ];


    // Options for each question
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
            {/* Main content area */}
            <div className="questionnaire-content">
                <h1>Stress Questionnaire</h1>
                <p className="subtitle">Please answer the following questions :</p>
                {/* Questions and options */}

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
                {/* Navigation button */}
                <Link to="/Questionnaire2">
                    <button className="next-button">Next</button>
                </Link>
            </div>
        </div>
    );
};

export default Questionnaire1;