import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState(null);
  const [popup, setPopup] = useState(null);

  const showPopup = (message, type = "info") => {
    setPopup({ message, type });
    setTimeout(() => setPopup(null), 3000);
  };

  const login = (username, password) => {
    const existingUser = accounts.find(
      (acc) => acc.username === username && acc.password === password
    );
    if (existingUser) {
      setUser({ username });
      showPopup("Login successful ✅", "success");
    } else {
      showPopup("Wrong username or password ❌", "error");
    }
  };

  const signup = (username, password) => {
    const existingUser = accounts.find((acc) => acc.username === username);
    if (existingUser) {
      showPopup("Username already exists ⚠️", "error");
    } else {
      setAccounts([...accounts, { username, password }]);
      setUser({ username });
      showPopup("Account created successfully 🎉", "success");
    }
  };

  const logout = () => {
    setUser(null);
    showPopup("Logged out 👋", "info");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, popup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
