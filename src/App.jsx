import "./App.css";
<<<<<<< HEAD

import Dashboard from "./pages/Dashboard";
import { TooltipProvider } from "./components/ui/tooltip";
=======
import { TooltipProvider } from "./components/ui/tooltip";
import Dashboard from "./pages/Dashboard";
import Doctor from "./pages/Doctor";
>>>>>>> 12866e425801eba76f722e0399f82ee8b1c062aa
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
<<<<<<< HEAD

=======
>>>>>>> 12866e425801eba76f722e0399f82ee8b1c062aa
  );
}

export default App;
