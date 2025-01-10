import { useEffect, useState } from "react";
import { fetchNewsByCategory } from "../services/api.js";

const TopStories = ({ token, addToReadHistory }) => {
  const [topStories, setTopStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTopStories = async () => {
    setLoading(true); // Set loading to true when fetching
    setError(null); // Reset error state before fetching
    try {
      const data = await fetchNewsByCategory("general", token); // Fetching general news

      const uniqueStories = data
        .filter((story, index, self) => {
          // Ensure unique stories and exclude those from removed.com or with missing data
          const isUnique = index === self.findIndex((s) => s.url === story.url);
          const isNotFromRemoved =
            story.url && !story.url.includes("removed.com"); // Exclude removed.com
          const isAvailable =
            story.urlToImage && story.title && story.description; // Ensure availability of key fields

          return isUnique && isNotFromRemoved && isAvailable;
        })
        .slice(0, 12); // Limit the display to 12 items

      setTopStories(uniqueStories);
    } catch (error) {
      console.error("Error fetching top stories:", error);
      setError("Failed to load top stories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopStories(); // Call the function on component mount
  }, [token]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <img src="/Spinning arrows.gif" alt="Loading..." />{" "}
        {/* Replace with your spinner image */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
        <button onClick={getTopStories}>Retry</button> {/* Retry button */}
      </div>
    );
  }

  return (
    <div className="top-stories">
      <h2>Top Stories</h2>
      <div className="articles">
        {topStories.length > 0 ? (
          topStories.map((article, index) => (
            <div key={article.url || index} className="article-card">
              <img
                src={article.urlToImage || "/path/to/fallback-image.jpg"} // Fallback image if no urlToImage
                alt={article.title || "Article image"} // Fallback alt text
              />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => addToReadHistory(article.url)} // Add to read history on click
              >
                Read more
              </a>
            </div>
          ))
        ) : (
          <p>No top stories available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default TopStories;
