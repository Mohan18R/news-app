import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/header";
import WeatherWidget from "./components/WeatherWidget";
import NewsCarousel from "./components/NewsCarousel";
import NewsCards from "./components/newsCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("general");
  const [query, setQuery] = useState(""); // For Search
  const [darkMode, setDarkMode] = useState(false); // For Dark Mode

  const fetchArticles = async (category, searchQuery = "") => {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
      if (searchQuery) {
        url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
      }
      const response = await axios.get(url, {
        headers: {
          "User-Agent": "Mozilla/5.0", // Add this
          "Accept": "application/json",
        },
      });
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };
  

  useEffect(() => {
    fetchArticles(category, query);
  }, [category, query]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Header setCategory={setCategory} setQuery={setQuery} toggleDarkMode={toggleDarkMode} />
      <div className="container mt-4">
        <WeatherWidget />
        <NewsCarousel articles={articles.slice(0, 5)} />
        <h2 className="text-center mt-4">Latest News</h2>
        <NewsCards articles={articles} />
      </div>
    </div>
  );
};

export default App;
