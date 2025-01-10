import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx"; // Your Navbar component
import Footer from "./components/Footer.jsx"; // Your Footer component
import Home from "./pages/home.jsx"; // Your Home component
import AuthForm from "./components/AuthForm.jsx"; // Import the AuthForm component
import CategoryPage from "./components/Categorypage.jsx"; // Your CategoryPage component

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar will be visible on every page */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />{" "}
          {/* Optional: Keep if needed */}
          <Route path="/login" element={<AuthForm />} />{" "}
          {/* Route for AuthForm */}
          <Route path="/category/:category" element={<CategoryPage />} />{" "}
        </Routes>
      </main>
      <Footer /> {/* Footer will be visible on every page */}
    </Router>
  );
}

export default App;
