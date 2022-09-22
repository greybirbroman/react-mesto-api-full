import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// const strictMode = process.env.NODE_ENV === 'production'
// root.render(
//   (strictMode && (
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
//   )) || <App />
// );

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
