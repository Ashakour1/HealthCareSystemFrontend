import "./App.css";
import { TooltipProvider } from "./components/ui/tooltip";
import { Dashboard } from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  return (
    <TooltipProvider>
      <>
        {/* <Login /> */}
        <Dashboard />
      </>
    </TooltipProvider>
  );
}

export default App;
