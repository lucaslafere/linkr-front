import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { TokenContext } from "./Contexts/TokenContext";
import { NameContext } from "./Contexts/NameContext";

export default function App() {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <NameContext.Provider value={{ name, setName }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/sign-up" element={<SignUpScreen />} />
          </Routes>
        </BrowserRouter>
      </NameContext.Provider>
    </TokenContext.Provider>
  );
}
