import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import "./Login.css"; // Import the CSS

function Login() {
  const { login, signup } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      signup(username.trim(), email.trim(), mobile.trim(), password);
    } else {
      login(username.trim(), password);
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
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
              type="text"
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
      <p className="toggle-auth" onClick={() => setIsSignup(!isSignup)}>
        {isSignup
          ? "Already have an account? Login"
          : "No account? Sign Up"}
      </p>
    </div>
  );
}

export default Login;
