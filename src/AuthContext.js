import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accounts, setAccounts] = useState(() => {
    // Load from localStorage if available
    const storedAccounts = localStorage.getItem("accounts");
    return storedAccounts ? JSON.parse(storedAccounts) : [];
  });

  const [user, setUser] = useState(() => {
    // Load logged in user if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

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
      const loggedInUser = { username };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
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
      const newAccounts = [...accounts, { username, password }];
      setAccounts(newAccounts);
      localStorage.setItem("accounts", JSON.stringify(newAccounts));

      const loggedInUser = { username };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      showPopup("Account created successfully 🎉", "success");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    showPopup("Logged out 👋", "info");
  };

  // Keep accounts in localStorage when updated
  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, popup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
