import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import TokenContext from "./Contexts/TokenContext";
import UserContext from "./Contexts/UserContext";
import LoginScreen from "./Components/LoginScreen";
import SignUpScreen from "./Components/SignUpScreen";
import SerchUserScreen from "./Components/SearchUserScreen";
import GlobalStyle from "./Styles/globalStyles";

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
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            {/* Need to refactor Login and SignUp screens to style.js */}
            <Route path="/" element={<LoginScreen />} />
            <Route path="/sign-up" element={<SignUpScreen />} /> 
            <Route path="/timeline/:id" element={<SerchUserScreen />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </TokenContext.Provider>
  );
}
