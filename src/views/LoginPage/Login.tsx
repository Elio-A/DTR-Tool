import { useNavigate } from "react-router-dom"
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import React, { useState } from "react"
import './LoginPage.css'
import { db } from "../../../firebase"

const Login: React.FC<{onLogin: () => void}> = ({onLogin}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent <HTMLFormElement>) => {
        e.preventDefault();
        try {
            const usersRef = collection(db, "users");
            const qry = query(usersRef, where("email", "==", email), where("password", "==", password))
            const querySnapshot = await getDocs(qry);

            if(!querySnapshot.empty){
                console.log("User logged in successfully!");
                onLogin();
                navigate("/home");
            }
            else{
                setError("Invalid email or password.  Please try again!");
            }
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
            {error && <p className = "error-message">{error}</p>}
        </div>   
    )
}

export default Login