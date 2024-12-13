// eslint-disable-next-line no-unused-vars
import React from "react";
import "../../styles/Signup.css";
const Signup = () => {
    console.log("Signup component is rendered!");
    return (

        <div>
            <h1>Inscription</h1>
            <form>
                <input type="text" placeholder="Nom et Prénom" required />
                <input type="email" placeholder="Adresse e-mail" required />
                <input type="password" placeholder="Mot de passe" required />
                <button type="submit">inscrire</button>
            </form>
        </div>
    );
};

export default Signup;
