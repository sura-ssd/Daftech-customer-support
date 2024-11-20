import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AuthProvider } from "./Context/AuthContext"
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "./components/DarkModeContext";
import "../src/components/style.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <DarkModeProvider>
        <AuthProvider >
          <App />
      </AuthProvider>
      </DarkModeProvider>
    </React.StrictMode>
  </BrowserRouter>
);
