import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { category } = useParams(); // Get category from URL
  const [articles, setArticles] = useState([]); // Articles state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch articles by category
  const fetchArticlesByCategory = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token"); // Retrieve token

    if (!token) {
      alert("You are not logged in. Redirecting to the home page.");
      window.location.href = "/"; // Redirect to home page
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/news/${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Filter and set articles
      const uniqueStories = response.data.filter((story, index, self) => {
        const isUnique = index === self.findIndex((s) => s.url === story.url);
        const hasAllData =
          story.url && story.urlToImage && story.title && story.description;
        const isNotFromVideoCardz = !story.url.includes("videocardz.com");

        return isUnique && hasAllData && isNotFromVideoCardz;
      });

      setArticles(uniqueStories); // Update articles state
    } catch (error) {
      console.error("Error fetching articles:", error);

      if (error.response && error.response.status === 401) {
        alert("Your session has expired. Redirecting to the home page.");
        localStorage.removeItem("token"); // Remove expired token
        window.location.href = "/"; // Redirect to home page
      } else {
        setError("Failed to load articles. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Retry fetching articles
  const handleRetry = () => {
    fetchArticlesByCategory();
  };

  // Fetch articles when component mounts or category changes
  useEffect(() => {
    fetchArticlesByCategory();
  }, [category]);

  // Loading state
  if (loading) {
    return (
      <div className="loading-spinner">
        <img src="/Spinning arrows.gif" alt="Loading..." />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-message">
        {error}
        <button onClick={handleRetry}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="cat-title">
        {category.charAt(0).toUpperCase() + category.slice(1)} Articles
      </h1>
      <div className="articles">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={article.url || index} className="article-card">
              <img
                src={article.urlToImage || "/path/to/fallback-image.jpg"}
                alt={article.title || "Article image"}
              />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))
        ) : (
          <p>No articles available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
