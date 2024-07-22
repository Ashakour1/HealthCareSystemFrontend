import "./App.css";
import Aside from "./components/Aside";
import DashboardHeader from "./components/DashboardHeader";
import Header from "./components/Header";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

import Dashboard from "./pages/Dashboard";
import Doctor from "./pages/Doctor";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Toaster />

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <LandingPage />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <>
                <Dashboard />
              </>
            }
          />
          <Route
            path="/doctors"
            element={
              <>
                <Doctor />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Header />
                <AboutPage />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Header />
                <ContactPage />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
