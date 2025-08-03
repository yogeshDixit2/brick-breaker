import React from "react";
import ReactDOM from "react-dom/client"; // ✅ note the '/client'
import App from "./App";
import "./index.css"; // Tailwind CSS or your styles

// Create the root and render the App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
