import React from "react";

const QuestionnaireStep1 = () => {
    return (
        <div>
            <h1>Questionnaire de Stress - Étape 1</h1>
            <form>
                <label>
                    1. Avez-vous des maux de tête ou des migraines ?
                    <select>
                        <option value="0">Pas du tout</option>
                        <option value="1">Faiblement</option>
                        <option value="2">Un peu</option>
                        <option value="3">Assez</option>
                        <option value="4">Beaucoup</option>
                        <option value="5">Extrêmement</option>
                    </select>
                </label>
                <button type="submit">Suivant</button>
            </form>
        </div>
    );
};

export default QuestionnaireStep1;
