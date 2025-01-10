import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import TopStories from "../components/TopStories.jsx"; // Import TopStories component
import Footer from "../components/Footer.jsx"; // Import Footer component
import AuthForm from "../components/AuthForm.jsx"; // Import AuthForm component

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const token = localStorage.getItem("token"); // Get token from local storage
  const [isAuthFormVisible, setIsAuthFormVisible] = useState(false); // State to manage AuthForm visibility

  // Function to handle login button click
  const handleLogin = () => {
    setIsAuthFormVisible(true); // Show the AuthForm overlay
  };

  // Function to close the AuthForm overlay
  const closeAuthForm = () => {
    setIsAuthFormVisible(false);
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`); // Navigate to the CategoryPage with the selected category
  };

  return (
    <div>
      <main>
        {/* Category Buttons */}
        <div className="category-buttons">
          <button onClick={() => handleCategoryClick("business")}>
            Business
          </button>
          <button onClick={() => handleCategoryClick("entertainment")}>
            Entertainment
          </button>
          <button onClick={() => handleCategoryClick("health")}>Health</button>
          <button onClick={() => handleCategoryClick("science")}>
            Science
          </button>
          <button onClick={() => handleCategoryClick("sports")}>Sports</button>
          <button onClick={() => handleCategoryClick("technology")}>
            Technology
          </button>
        </div>

        {/* Render TopStories regardless of token existence */}
        <TopStories token={token} />

        {/* Show overlay message if user is not logged in */}
        {!token && (
          <div className="overlay">
            <div className="overlay-message">
              <p>Please log in to view news</p>
              <button className="login-button" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        )}

        {/* Render AuthForm as an overlay */}
        {isAuthFormVisible && (
          <div className="overlay">
            <div className="overlay-content">
              <span className="close" onClick={closeAuthForm}>
                &times;
              </span>
              <AuthForm onClose={closeAuthForm} />{" "}
              {/* Pass closeAuthForm as onClose */}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
