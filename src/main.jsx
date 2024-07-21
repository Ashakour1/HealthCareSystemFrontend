import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./hooks/useUser.jsx";
import { TooltipProvider } from "./components/ui/tooltip.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </UserProvider>
  </React.StrictMode>
);
