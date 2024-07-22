import "./App.css";
import Aside from "./components/Aside";
import DashboardHeader from "./components/DashboardHeader";
import AboutPage from "./pages/AboutPage";
import Appointment from "./pages/Appointment";
import ContactPage from "./pages/ContactPage";
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
          
          <Doctor/>
          </>} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

        </Routes>
      </Router>
    </>

  );
}

export default App;
