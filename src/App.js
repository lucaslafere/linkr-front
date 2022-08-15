import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import TokenContext from "./Contexts/TokenContext";
import UserContext from "./Contexts/UserContext";
import LoginScreen from "./Components/LoginScreen";
import SignUpScreen from "./Components/SignUpScreen";
import FeedScreen from "./Components/TimelineScreen";
import HashtagScreen from "./Components/HashtagScreen";
import SerchUserScreen from "./Components/SearchUserScreen";
import GlobalStyle from "./Styles/globalStyles";

export default function App() {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({
    id: "2",
    username: "Caroline",
    email: "caroline@gmail.com",
    profilePhoto: "https://buffer.com/library/content/images/2022/03/amina.png",
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
            <Route path="/timeline" element={<FeedScreen />} />
            <Route path="/timeline/:id" element={<SerchUserScreen />} />
            <Route path="/hashtag/:hashtag" element={<HashtagScreen />} /> 
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </TokenContext.Provider>
  );
}
