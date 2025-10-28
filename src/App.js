import React, { useState, useEffect } from "react";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const getQuote = async () => {
    try {
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          "https://zenquotes.io/api/random"
        )}&t=${Date.now()}`
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const quotes = JSON.parse(data.contents); // Parse the inner JSON

      setQuote(quotes[0].q);
      setAuthor(quotes[0].a);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Failed to fetch quote. Please try again later.");
      setAuthor("");
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "40px",
          borderRadius: "15px",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          maxWidth: "600px",
        }}
      >
        <h1>💬 Random Quote Generator</h1>
        <p style={{ fontSize: "20px", margin: "20px" }}>"{quote}"</p>
        <h4>- {author}</h4>
        <button
          onClick={getQuote}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "10px",
            cursor: "pointer",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            marginTop: "20px",
            transition: "background-color 0.3s ease",
          }}
          onMouseDown={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseUp={(e) => (e.target.style.backgroundColor = "#007BFF")}
        >
          Get New Quote
        </button>
      </div>
    </div>
  );
}

export default App;