// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
//
// function App() {
//   const [count, setCount] = useState(0)
//
//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }
// export default App
// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import "./App.css"
import './index.css'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup.jsx";
import Login from "./pages/Login.jsx";
import Questionnaire1 from "./pages/Signup/Questionnaire1.jsx";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Questionnaire2 from "./pages/Signup/Questionnaire2.jsx";
const App = () => {
    const [questionnaireData, setQuestionnaireData] = useState({});
    return (
        <Router>
            <Routes>
                {/*<Route path="/" element={<Login />} />*/}
<<<<<<< HEAD
                <Route path="/Questions" element={<Questionnaire1 />} />
                <Route path="/Questionnaire2" element={<Questionnaire2 />} />
=======
                <Route path="/Questionnaire1" element={<Questionnaire1 setQuestionnaireData={setQuestionnaireData}/>} />
                <Route path="/Questionnaire2" element={<Questionnaire2 questionnaireData={questionnaireData} />} />
>>>>>>> e0a139ad9882165184ccd37c24081085a309601b
                <Route path="/Signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

            </Routes>
        </Router>
                    );
                };

export default App;