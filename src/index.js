import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

// bootstrap-select
import "bootstrap-select/dist/css/bootstrap-select.min.css";
import "bootstrap-select/dist/js/bootstrap-select.min.js";

// components
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
