import { useNavigate } from "react-router-dom"
import React, { useState } from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import './SignupPage.css'

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState('');

    
    const auth = getAuth();
    const db = getFirestore();

    const handleSignup = async (e: React.FormEvent <HTMLFormElement>) => {
        e.preventDefault();


        //Validation:
        if (password !== confirmPass){
            setError("Password does not match!");
            return;
        }

        if (password.length < 6){
            setError("Password length must be 6 or greater!");
            return;
        }

        try{
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;

            await setDoc(doc(db, "users", user.uid), {
                email: email,
                createdAt: new Date(),
            });

            console.log("Account created successfully!");
            navigate('/login');
        }
        catch (err: any){
            console.error("Signup error: ", err);
            setError(err.message || "Account creation did not work.  Please try again later!");
        }
    };

    return (
        <div className = "login-container">
            <h2>Signup for DTR Tool</h2>
            <form onSubmit = {handleSignup} className = "login-form">
                <div className = "form-group">
                    <label htmlFor = "email">Email</label>
                    <input
                        type = "email"
                        id = "@email"
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className = "form-group">
                    <label htmlFor = "password">Password</label>
                    <input
                        type = "password"
                        id = "@password"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className = "form-group">
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input
                        type = "password"
                        id = "confirmPassword"
                        value = {confirmPass}
                        onChange = {(e) => setConfirmPass(e.target.value)}
                        required
                    />
                </div>
                <button type = "submit" className = "btn-primary">Signup</button>
                <div>
                    <p>Already have an account?</p>
                    <button className = "btn-primary" onClick={() => navigate('/login')}>Login</button>
                </div>
            </form>
            {error && <p className = "error-message">{error}</p>}
        </div>
    )
}

export default Signup;