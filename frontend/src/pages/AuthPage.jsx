import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext";  

const AuthPage = () => {   
  const [currentState, setCurrentState] = useState("Sign Up");   
  const [username, setUsername] = useState("");   
  const [email, setEmail] = useState("");   
  const [password, setPassword] = useState("");    

  const { signUp, signIn } = useAuth();   
  const navigate = useNavigate();    

  const handleSubmit = async (e) => {     
    e.preventDefault();
    console.log('=== FORM SUBMITTED ===');
    console.log('Form data:', { currentState, username, email, password: password ? '***provided***' : 'missing' });

    try {       
      if (currentState === "Sign Up") {
        console.log('Attempting sign up...');
        await signUp(username, email, password); // ✅ Correct order       
        console.log('Sign up successful!');
      } else {
        console.log('Attempting sign in...');         
        await signIn(email, password);
        console.log('Sign in successful!');
      }
      console.log('About to navigate to /home');
      navigate("/home"); // Fixed: was "/chat" before
    } catch (error) {       
      console.error("Auth error:", error.message);       
      alert(`Authentication failed: ${error.message}`);     
    }   
  };    

  return (     
    <div>       
      <form onSubmit={handleSubmit}>         
        <h1>User Authentication</h1>          

        {currentState === "Sign Up" && (           
          <input             
            type="text"             
            placeholder="enter username"             
            value={username}             
            onChange={(e) => setUsername(e.target.value)}             
            required             
            autoComplete="username"           
          />         
        )}          

        <input           
          type="email"           
          placeholder="enter email"           
          value={email}           
          onChange={(e) => setEmail(e.target.value)}           
          required           
          autoComplete="email"         
        />          

        <input           
          type="password"           
          placeholder="enter password"           
          value={password}           
          onChange={(e) => setPassword(e.target.value)}           
          required           
          autoComplete={             
            currentState === "Sign Up" ? "new-password" : "current-password"           
          }         
        />          

        <button type="submit">           
          {currentState === "Sign Up" ? "Create Account" : "Log In"}         
        </button>          

        <br />          

        <button           
          type="button"           
          onClick={() => {             
            setCurrentState(currentState === "Sign Up" ? "Sign In" : "Sign Up");             
            setUsername("");             
            setEmail("");             
            setPassword("");           
          }}         
        >           
          Switch to {currentState === "Sign Up" ? "Sign In" : "Sign Up"}         
        </button>       
      </form>     
    </div>   
  ); 
};  

export default AuthPage;