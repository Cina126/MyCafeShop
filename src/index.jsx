import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter , HashRouter } from "react-router-dom";
import App from "./Frontend/App";
const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>
);

