import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./views/app";
import { StateProvider } from "./state/store";

ReactDOM.render(
    <React.StrictMode>
        <StateProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StateProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);
