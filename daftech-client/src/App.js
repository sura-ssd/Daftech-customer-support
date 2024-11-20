import "bootstrap/dist/css/bootstrap.min.css";

import Register from "./Pages/Register";
import Home from "./Pages/Home";
import LoginForm from "./Pages/Login";
import SimpleFAQ from "./Pages/SimpleFAQ";
import "aos/dist/aos.css";
import { Routes, Route } from "react-router-dom";
import { DarkModeContext } from "../src/components/DarkModeContext";
import "../src/components/style.css";
import { useContext } from "react";

function App() {
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  const handleDarkModeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="LoginForm" element={<LoginForm />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/SimpleFAQ" element={<SimpleFAQ />} />
        </Routes>
    
    </div>
  );
}

export default App;
