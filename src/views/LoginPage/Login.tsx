import { useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react"
import { db } from "../../../firebase"
import './LoginPage.css'

const Login: React.FC<{onLogin: () => void}> = ({onLogin}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent <HTMLFormElement>) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                //Signed in:
                const user = userCredential.user;
                onLogin();
                console.log("Logged in successfully!");
                navigate("/home");
                console.log("Navigating to hom now");
            })
            .catch((error) => {
                setError("Invalid Credentials.  Please try again!");
                console.error("Login error: ", error);
            });
        }
        catch(err){
            setError('An error occured during login.  Please try again later!');
            console.error("Login error: ", err);
        }
    };

    const handleSignup = async (e: React.MouseEvent <HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Signup button clicked");
        navigate("/signup")
    }

    return(
        <div className = "login-container">
            <h2>Login To DTR Tool</h2>
            <form onSubmit = {handleLogin} className = "login-form">
                <div className = "form-group">
                    <label htmlFor = "email">Email</label>
                    <input
                        type = "email"
                        id = "email"
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className = "form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type = "password"
                        id = "pass"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type = "submit" className = "btn-primary">Login</button>
                <div className = "form-group">
                    <p>Don't have an account yet?</p>
                    <button className = "btn-primary" onClick = {handleSignup}>Signup</button>
                </div>
            </form>
        </div>   
    )
}

export default Login