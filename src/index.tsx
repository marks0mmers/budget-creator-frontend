import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./views/app";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
                <ToastContainer />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
);
