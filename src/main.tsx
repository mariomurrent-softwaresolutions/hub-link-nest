import { createRoot } from "react-dom/client";
import { ConfigProvider } from "./contexts/ConfigContext";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider>
    <App />
  </ConfigProvider>
);
