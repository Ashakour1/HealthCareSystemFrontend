import "./App.css";
import Aside from "./components/Aside";
import DashboardHeader from "./components/DashboardHeader";

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
          <Route path="/dashboard" element={< >
        
          <Dashboard/>
          </>} />
          <Route path="/doctors" element={<>
          
          <DashboardHeader/>
          <Doctor/>
          </>} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
