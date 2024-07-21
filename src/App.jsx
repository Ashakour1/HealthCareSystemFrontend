import "./App.css";
import { TooltipProvider } from "./components/ui/tooltip";
import Dashboard from "./pages/Dashboard";
import Doctor from "./pages/Doctor";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Toaster />

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/doctor" element={<Doctor />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
