import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { TokenContext } from "./Contexts/TokenContext";
import { UserContext } from "./Contexts/UserContext";

export default function App() {
  const [token, setToken] = useState("");
  const [avatar, setAvatar] = useState("");

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <UserContext.Provider value={{ avatar, setAvatar }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/sign-up" element={<SignUpScreen />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </TokenContext.Provider>
  );
}
