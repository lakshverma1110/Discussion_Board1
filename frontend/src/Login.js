import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import "./Login.css";

export default function Login() {
  const { login, signup, popup } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      signup(username, password, email, mobile);
    } else {
      login(username, password);
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      {popup && <div className={`popup ${popup.type}`}>{popup.message}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {isSignup && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </>
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
      </form>
      <p>
        {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
        <span className="toggle-link" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Login" : "Sign Up"}
        </span>
      </p>
    </div>
  );
}
