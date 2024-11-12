import React from "react";
import { createRoot } from "react-dom/client"; // Import `createRoot` from `react-dom/client`

// import './index.css'; // Not sure if needed.
import App from "./App";
import ConfigProvider from "./ConfigContext"; // Import your ConfigProvider

// const root = ReactDOM.createRoot(document.getElementById('root'));
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
