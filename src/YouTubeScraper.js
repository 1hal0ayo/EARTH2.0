YouTubeScraper.js
// src/YouTubeScraper.js
import React, { useState } from "react";
import axios from "axios";

const YouTubeScraper = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [processing, setProcessing] = useState(false);

  const searchYouTube = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/youtube/${query}`);
      setResults(response.data.items);
    } catch (error) {
      console.error("Error fetching YouTube data:", error);
    }
  };

  const handleProcessWithOpenAI = async (text) => {
    setProcessing(true);
    try {
      const response = await axios.post("http://localhost:8000/process-openai", { prompt: text });
      alert(`Processed with OpenAI: ${response.data.result}`);
    } catch (error) {
      console.error("Error processing with OpenAI:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search YouTube"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchYouTube}>Search</button>

      <div>
        {results.map((video) => (
          <div key={video.id.videoId}>
            <h3>{video.snippet.title}</h3>
            <p>{video.snippet.description}</p>
            <button onClick={() => handleProcessWithOpenAI(video.snippet.description)}>
              Process with OpenAI
            </button>
          </div>
        ))}
      </div>
      {processing && <p>Processing with OpenAI...</p>}
    </div>
  );
};

export default YouTubeScraper;
