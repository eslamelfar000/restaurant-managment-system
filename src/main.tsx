import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./lang/i18n.ts";

createRoot(document.getElementById("root")!).render(<App />);
