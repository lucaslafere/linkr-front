import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import TokenContext from "./Contexts/TokenContext";
import UserContext from "./Contexts/UserContext";
import LoginScreen from "./Components/LoginScreen";
import SignUpScreen from "./Components/SignUpScreen";

export default function App() {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    email: "",
    profilePhoto: ""
  });

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            {/* Need to refactor Login and SignUp screens to style.js */}
            <Route path="/" element={<LoginScreen />} />
            <Route path="/sign-up" element={<SignUpScreen />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </TokenContext.Provider>
  );
}
