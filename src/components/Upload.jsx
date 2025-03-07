import React, { useState } from "react";

const App = () => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://fastapi-render-cru8.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.pdf_url) {
        setUploadMessage("PDF uploaded successfully!");
      } else {
        setUploadMessage("Upload failed.");
      }
    } catch (error) {
      setUploadMessage("Error uploading file.");
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://fastapi-render-cru8.onrender.com/search?query=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", textAlign: "center" }}>
      <h2>PDF Upload and Search</h2>

      {/* Upload Section */}
      <div style={{ marginBottom: "20px" }}>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} style={{ marginLeft: "10px" }}>Upload PDF</button>
        <p>{uploadMessage}</p>
      </div>

      {/* Search Section */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search PDFs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "5px", width: "300px" }}
        />
        <button onClick={handleSearch} style={{ marginLeft: "10px" }}>Search</button>
      </div>

      {/* Results Display */}
      <div>
        {searchResults.length > 0 ? (
          <ul style={{ textAlign: "left", display: "inline-block" }}>
            {searchResults.map((result, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <strong>{result.pdf_name}</strong> - Page {result.page_number}
                <br />
                <a href={result.imagekit_link} target="_blank" rel="noopener noreferrer">
                  View Page
                </a>
                <p>{result.page_content.slice(0, 100)}...</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
