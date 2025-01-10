import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Update with your backend URL if it's different

// Function to fetch news by category
export const fetchNewsByCategory = async (category, token) => {
  try {
    const response = await axios.get(`${API_URL}/news/${category}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

// Function to save article to read history
export const saveToReadHistory = async (articleId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/read-history`,
      { articleId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error saving to read history:", error);
    throw error;
  }
};

// Function to get user read history
export const getReadHistory = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/read-history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching read history:", error);
    throw error;
  }
};

// Function to save article to bookmarks
export const saveToBookmarks = async (articleId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/bookmark`,
      { articleId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error saving to bookmarks:", error);
    throw error;
  }
};

// Function to get user bookmarks
export const getBookmarks = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/bookmarked`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    throw error;
  }
};

// Function to update user theme (light/dark)
export const updateTheme = async (theme, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/theme`,
      { theme },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating theme:", error);
    throw error;
  }
};
