import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accounts, setAccounts] = useState(() => {
    const storedAccounts = localStorage.getItem("accounts");
    return storedAccounts ? JSON.parse(storedAccounts) : [];
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [popup, setPopup] = useState(null);

  const showPopup = (message, type = "info") => {
    setPopup({ message, type });
    setTimeout(() => setPopup(null), 3000);
  };

  // ✅ Login
  const login = (username, password) => {
    const existingUser = accounts.find(
      (acc) => acc.username === username && acc.password === password
    );
    if (existingUser) {
      const loggedInUser = { username: existingUser.username };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      showPopup("Login successful ✅", "success");
    } else {
      showPopup("Wrong username or password ❌", "error");
    }
  };

  // ✅ Signup with email, mobile & password validation
  const signup = (username, password, email, mobile) => {
    const existingUser = accounts.find((acc) => acc.username === username);
    if (existingUser) {
      showPopup("Username already exists ⚠️", "error");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      showPopup(
        "Password must be at least 8 characters, include one uppercase and one special character ⚠️",
        "error"
      );
      return;
    }

    const newAccounts = [...accounts, { username, password, email, mobile }];
    setAccounts(newAccounts);
    localStorage.setItem("accounts", JSON.stringify(newAccounts));

    const loggedInUser = { username };
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    showPopup("Account created successfully 🎉", "success");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
