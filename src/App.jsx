import "./App.css";
<<<<<<< HEAD
import Dashboard from "./pages/Dashboard";
=======
import { TooltipProvider } from "./components/ui/tooltip";
import { Dashboard } from "./pages/Dashboard";
>>>>>>> b91f18292e07d4c3ae9f5f8147e176ea48dfcbfb
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
<<<<<<< HEAD
    <>
      <Toaster />

      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
=======
    <TooltipProvider>
      <>
        {/* <Login /> */}
        <Dashboard />
      </>
    </TooltipProvider>
>>>>>>> b91f18292e07d4c3ae9f5f8147e176ea48dfcbfb
  );
}

export default App;
