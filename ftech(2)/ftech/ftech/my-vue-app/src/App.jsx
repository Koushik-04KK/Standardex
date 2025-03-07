
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import Admin from "./components/Admin";
import Upload from "./components/Upload";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/up" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;


// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";

// function App() {
//     const [query, setQuery] = useState("");
//     const [results, setResults] = useState([]);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [uploadMessage, setUploadMessage] = useState("");

//     const searchPDFs = useCallback(() => {
//         if (!query.trim()) return;
        
//         axios.get("https://fastapi-render-cru8.onrender.com/search", { params: { query } })
//             .then(response => {
//                 setResults(response.data.results || []);
//             })
//             .catch(error => {
//                 console.error("API Error:", error);
//             });
//     }, [query]);

//     useEffect(() => {
//         searchPDFs();
//     }, [query, searchPDFs]);

//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };

//     const uploadFile = async () => {
//         if (!selectedFile) {
//             alert("Please select a file.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("file", selectedFile);

//         try {
//             setUploadMessage("Uploading...");
//             const response = await axios.post("https://fastapi-render-cru8.onrender.com/upload", formData);
//             setUploadMessage(response.data.message);
//         } catch (error) {
//             console.error("Upload error:", error);
//             setUploadMessage("Upload failed. Try again.");
//         }
//     };

//     return (
//         <div style={{ textAlign: "center", marginTop: "50px" }}>
//             <h1>📂 PDF Upload & Search (Elastic Cloud)</h1>

//             {/* Upload Section */}
//             <div>
//                 <input type="file" onChange={handleFileChange} accept="application/pdf" />
//                 <button onClick={uploadFile} style={{ marginLeft: "10px" }}>📤 Upload</button>
//                 {uploadMessage && <p>{uploadMessage}</p>}
//             </div>

//             {/* Search Section */}
//             <input 
//                 type="text" 
//                 value={query} 
//                 onChange={(e) => setQuery(e.target.value)} 
//                 placeholder="Enter search query"
//                 style={{ padding: "10px", fontSize: "16px", width: "300px", marginTop: "20px" }}
//             />
//             <button onClick={searchPDFs} style={{ marginLeft: "10px" }}>🔍 Search</button>

//             {/* Search Results */}
//             <div style={{ marginTop: "30px" }}>
//                 {results.length > 0 ? results.map((res, index) => (
//                     <div key={index} style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
//                         <h3>{res.pdf_name} (Page {res.page_number})</h3>
//                         <p>{res.page_content.slice(0, 200)}...</p>
//                         <a href={res.imagekit_link} target="_blank" rel="noopener noreferrer">🔗 View Page</a>
//                     </div>
//                 )) : <p>No results found.</p>}
//             </div>
//         </div>
//     );
// }

// export default App;