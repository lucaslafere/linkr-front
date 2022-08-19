import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import TokenContext from "./Contexts/TokenContext";
import UserContext from "./Contexts/UserContext";
import LoginScreen from "./Components/LoginScreen";
import SignUpScreen from "./Components/SignUpScreen";
import FeedScreen from "./Components/TimelineScreen";
import SerchUserScreen from "./Components/SearchUserScreen";
import GlobalStyle from "./Styles/globalStyles";
import HashtagScreen2 from "./Components/HashtagScreen2";


export default function App() {
  const [token, setToken] = useState(localStorage.getItem("MY_TOKEN"));
  const [userData, setUserData] = useState(localStorage.getItem("userInfo"));

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
            <Route path="/hashtag/:hashtag" element={<HashtagScreen2 />} /> 
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </TokenContext.Provider>
  );
}
