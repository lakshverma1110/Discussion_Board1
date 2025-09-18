import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [popup, setPopup] = useState(null);

  const showPopup = (message, type = "info") => {
    setPopup({ message, type });
    setTimeout(() => setPopup(null), 3000);
  };

  const signup = async (username, email, mobile, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, mobile, password })
      });
      const data = await res.json();
      if (res.ok) {
        setUser({ username });
        localStorage.setItem("user", JSON.stringify({ username }));
        showPopup(data.message, "success");
      } else showPopup(data.message, "error");
    } catch (err) {
      showPopup("Server error ❌", "error");
    }
  };

  const login = async (username, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        setUser({ username });
        localStorage.setItem("user", JSON.stringify({ username }));
        showPopup(data.message, "success");
      } else showPopup(data.message, "error");
    } catch (err) {
      showPopup("Server error ❌", "error");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    showPopup("Logged out 👋", "info");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, popup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
