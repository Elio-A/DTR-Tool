import { useNavigate } from "react-router-dom"
//import { db } from "../../../firebase"
import React, { useState } from "react"
import './LoginPage.css'

const Login: React.FC<{onLogin: () => void}> = ({onLogin}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent <HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await simulateApiCall(email, password)
    
            if (response.success){
                onLogin()
                console.log("Login Successful!")
                navigate("/home")
            }
            else{
                setError('Invalid credentials.  Please try again!')
            }
        }
        catch{
            setError('An error occured when connecting with the API.  Please try again!')
        }
    }

    const handleSignup = async (e: React.MouseEvent <HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Signup button clicked");
        navigate("/signup")
    }

    const simulateApiCall = async (email: string, password: string) => {
        await new Promise(resolve => setTimeout(resolve, 100))
        
        return {success: email.includes('@') && password.length > 0}
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