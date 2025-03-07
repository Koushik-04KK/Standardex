
// import { useState, useRef, useEffect } from "react";
// import Navbar from "./Navbar";
// import axios from "axios";
// import bgImage from "../assets/search_bg.png";

// const Search = () => {
//   const [query, setQuery] = useState("");
//   const [listening, setListening] = useState(false);
//   const [results, setResults] = useState([]); // Store search results
//   const [llmResponse, setLlmResponse] = useState(""); // Store LLM response
//   const [loading, setLoading] = useState(false); // Loading state for LLM
//   const recognitionRef = useRef(null);

//   const toggleVoiceSearch = () => {
//     if (listening) {
//       recognitionRef.current.stop();
//       setListening(false);
//     } else {
//       const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//       recognition.lang = "en-US";
//       recognitionRef.current = recognition;

//       recognition.start();
//       setListening(true);

//       recognition.onresult = (event) => {
//         setQuery(event.results[0][0].transcript);
//       };

//       recognition.onerror = (event) => {
//         console.error("Speech recognition error:", event.error);
//         setListening(false);
//       };

//       recognition.onend = () => {
//         setListening(false);
//       };
//     }
//   };

//   // Fetch search results from API when query changes
//   useEffect(() => {
//     if (!query.trim()) return;

//     axios
//       .get("http://127.0.0.1:8000/search", { params: { query } })
//       .then((response) => {
//         setResults(response.data.results || []);
//       })
//       .catch((error) => {
//         console.error("API Error:", error);
//       });
//   }, [query]);

//   // useEffect(() => {
//   //   if (results.length === 0) {
//   //     setLlmResponse(""); // Clear response when there are no results
//   //     return;
//   //   }

//   //   const fetchLLMAnswer = async () => {
//   //     setLoading(true); // Show loading indicator

//   //     const firstResult = results[0]; // Extract first result
//   //     const firstRowContent = firstResult.page_content;
//   //     const pageNumber = firstResult.page_number;
//   //     const pdfName = firstResult.pdf_name;

//   //     try {
//   //       const response = await axios.post(
//   //         "https://api.groq.com/openai/v1/chat/completions",
//   //         {
//   //           model: "llama3-70b-8192",
//   //           messages: [
//   //             {
//   //               role: "system",
//   //               content: "You are an expert assistant that provides highly accurate responses based on the given document context."
//   //             },
//   //             {
//   //               role: "user",
//   //               content: `You are analyzing a document titled "${pdfName}".\n
//   //                 - The relevant content is from **Page ${pageNumber}**.\n
//   //                 - Context: ${firstRowContent}\n
//   //                 - Based on this content, provide a summary and highlight key insights.`
//   //             }
//   //           ]
//   //         },
//   //         {
//   //           headers: {
//   //             "Content-Type": "application/json",
//   //             Authorization: `Bearer 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`
//   //           }
//   //         }
//   //       );

//   //       setLlmResponse(response.data.choices[0].message.content);
//   //     } catch (error) {
//   //       console.error("Error fetching response from LLM:", error);
//   //       setLlmResponse("Sorry, I couldn't process your request.");
//   //     }

//   //     setLoading(false); // Hide loading indicator
//   //   };

//   //   fetchLLMAnswer();
//   // }, [results]);

//   useEffect(() => {
//     if (results.length === 0) {
//       setLlmResponse(""); // Clear response when there are no results
//       return;
//     }
  
//     const fetchLLMAnswer = async () => {
//       setLoading(true); // Show loading indicator
  
//       try {
//         const { page_content, page_number, pdf_name } = results[0]; // Extract first result
  
//         const response = await axios.post(
//           "https://api.groq.com/openai/v1/chat/completions",
//           {
//             model: "llama3-70b-8192",
//             messages: [
//               {
//                 role: "system",
//                 content:
//                   "You are an expert assistant that provides highly accurate responses based on the given document context.",
//               },
//               {
//                 role: "user",
//                 content: `You are analyzing a document titled "${pdf_name}".\n
//                   - The relevant content is from Page ${page_number}.\n
//                   - Context: ${page_content}\n
//                   - Based on this content, provide a summary and highlight key insights.`,
//               },
//             ],
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer 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` // Secure API key handling
//             },
//           }
//         );
  
//         setLlmResponse(response.data.choices[0]?.message?.content || "No response generated.");
//       } catch (error) {
//         console.error("Error fetching response from LLM:", error);
//         setLlmResponse("Sorry, I couldn't process your request.");
//       }
  
//       setLoading(false); // Hide loading indicator
//     };
  
//     fetchLLMAnswer();
//   }, [results]);

//   return (
//     <div className="search-container">
//       <Navbar active="search" />

//       {/* Hero Section */}
//       <div className="search-hero">
//         <h1 className="search-title">StandardDex</h1>
//         <p className="search-description">
//           Simplifies compliance with standards, offering an intelligent search tool for professionals.
//         </p>

//         {/* Search Bar */}
//         <div className="search-bar">
//           <input
//             id="search-input"
//             type="text"
//             placeholder="Search your query here"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="search-input"
//           />
//           <button onClick={toggleVoiceSearch} className={`search-mic ${listening ? "active" : ""}`}>
//             {listening ? "🔴" : "🎤"}
//           </button>
//         </div>
//       </div>

//       {/* Background Image Section */}
//       <div className="search-bg" style={{ backgroundImage: `url(${bgImage})` }}></div>

//       {/* Results Container */}
//       {results.length > 0 && (
//         <div className="results-container">
//           {/* LLM Response Section */}
//           <h2 className="section-title">LLM Response</h2>
//           <div className="llm-box">
//             {loading ? <p className="loading-text">Generating...</p> : <p>{llmResponse}</p>}
//           </div>

//           {/* Search Results Table */}
//           <h2 className="section-title">Responses to your Query</h2>
//           <div className="table-container">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Code</th>
//                   <th>Page Number</th>
//                   <th>Description</th>
//                   <th>HyperLink</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {results.map((res, index) => (
//                   <tr key={index}>
//                     <td>{res.pdf_name}</td>
//                     <td>{res.page_number}</td>
//                     <td>{res.page_content.slice(0, 200)}...</td>
//                     <td>
//                       <a href={res.imagekit_link} target="_blank" rel="noopener noreferrer">
//                         🔗 View Page
//                       </a>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Styles */}
//       <style>
//         {`
//           .results-container {
//             position: relative;
//             width: 80%;
//             margin: auto;
//             background: rgba(255, 255, 255, 0.8);
//             padding: 20px;
//             border-radius: 10px;
//             backdrop-filter: blur(5px);
//             box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
//           }

//           .section-title {
//             color: #4f6ac1;
//             text-align: left;
//             font-size: 1.5rem;
//             font-weight: bold;
//           }

//           .llm-box {
//             width: 90%;
//             margin: 10px auto;
//             padding: 15px;
//             background: #f4f4f4;
//             border-radius: 5px;
//             border: 2px solid #FFB700;
//           }

//           .table-container {
//             width: 90%;
//             margin: auto;
//           }

//           table {
//             width: 100%;
//             border-collapse: collapse;
//             border: 2px solid #FFB700;
//           }

//           th, td {
//             padding: 10px;
//             border-bottom: 1px solid #FFB700;
//             text-align: left;
//           }

//           th {
//             background: #f4f4f4;
//             color: #4f6ac1;
//           }

//           .loading-text {
//             font-style: italic;
//             color: gray;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Search;

import { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import bgImage from "../assets/search_bg.png";

const Search = () => {
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const [results, setResults] = useState([]); // Store search results
  const [llmResponse, setLlmResponse] = useState(""); // Store LLM response
  const [loading, setLoading] = useState(false); // Loading state for LLM
  const recognitionRef = useRef(null);

  const toggleVoiceSearch = () => {
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognitionRef.current = recognition;

      recognition.start();
      setListening(true);

      recognition.onresult = (event) => {
        setQuery(event.results[0][0].transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setListening(false);
      };

      recognition.onend = () => {
        setListening(false);
      };
    }
  };

  // Fetch search results from API when query changes
  useEffect(() => {
    if (!query.trim()) return;

    axios
      .get("https://fastapi-render-cru8.onrender.com/search", { params: { query } })
      .then((response) => {
        setResults(response.data.results || []);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, [query]);

  useEffect(() => {
    if (results.length === 0 || !query.trim()) {
      setLlmResponse("");
      return;
    }

    const fetchLLMAnswer = async () => {
      setLoading(true);

      try {
        const { page_content, page_number, pdf_name } = results[0];

        const response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: "llama3-70b-8192",
            messages: [
              {
                role: "system",
                content: "You are an expert assistant providing highly accurate responses based on user queries and document context.",
              },
              {
                role: "user",
                content: `User query: ${query}\n\nYou are analyzing a document titled "${pdf_name}".\n- The relevant content is from Page ${page_number}.\n- Context: ${page_content}\n- Based on this content and the user query, provide information professionally with 2 lines and emojis and give page numbers for reference.`,
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer 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`,
            },
          }
        );

        setLlmResponse(response.data.choices[0]?.message?.content || "No response generated.");
      } catch (error) {
        console.error("Error fetching response from LLM:", error);
        setLlmResponse("Sorry, I couldn't process your request.");
      }

      setLoading(false);
    };

    fetchLLMAnswer();
  }, [results, query]);


  return (
    <div className="search-container">
      <Navbar active="search" />

      {/* Hero Section */}
      <div className="search-hero">
        <h1 className="search-title"style={{
        fontFamily: "'Sedgwick Ave Display', cursive",
        fontSize: '4rem',
        fontWeight: 500,
      }}>StandardDex</h1>
        <p className="search-description">
          Simplifies compliance with standards, offering an intelligent search tool for professionals.
        </p>

        {/* Search Bar */}
        <div className="search-bar" style={{ position: "relative", display: "flex", alignItems: "center" }}>
      <input
        type="text"
        placeholder="Search your query here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
        style={{
          width: "100%",
          padding: "10px",
          paddingRight: "40px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          fontSize: "16px",
          outline: "none",
        }}
      />
      <button
        onClick={toggleVoiceSearch}
        className="search-mic"
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "5px",
        }}
      >
       <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"   fill={listening ? "red" : "#007AFF"} viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M5 8a1 1 0 0 1 1 1v3a4.006 4.006 0 0 0 4 4h4a4.006 4.006 0 0 0 4-4V9a1 1 0 1 1 2 0v3.001A6.006 6.006 0 0 1 14.001 18H13v2h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-2H9.999A6.006 6.006 0 0 1 4 12.001V9a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
  <path d="M7 6a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4V6Z"/>
</svg>

      </button>
    </div>
      </div>

      {/* Background Image */}
      <div className="search-bg" style={{ backgroundImage: `url(${bgImage})` }}></div>

      {/* Results */}
      {results.length > 0 && (
        <div className="results-container" style={{fontFamily: "'Rubik', sans-serif", marginTop:"20px"}}>
          {/* LLM Response */}
          <h2 className="section-title">LLM Response</h2>
          <div className="llm-box">
            {loading ? <p className="loading-text">Generating...</p> : <p>{llmResponse}</p>}
          </div>

          {/* Search Results Table */}
          <h2 className="section-title">Responses to your Query</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Page Number</th>
                  <th>Description</th>
                  <th>HyperLink</th>
                </tr>
              </thead>
              <tbody>
                {results.map((res, index) => (
                  <tr key={index}>
                    <td>{res.pdf_name}</td>
                    <td>{res.page_number}</td>
                    <td>{res.page_content.slice(0, 200)}...</td>
                    <td>
                      <a href={res.imagekit_link} target="_blank" rel="noopener noreferrer">
                        🔗 View Page
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>
        {`
          .search-hero {
            background: #FFB700;
            color: white;
            text-align: center;
            padding: 40px 0;
          }

          .search-title {
            font-size: 3.5rem;
            font-family: 'Sedgwick Ave', cursive;
            font-weight: bold;
          }

          .search-description {
            font-size: 1.2rem;
            margin-top: 10px;
          }

          .search-bar {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin-top: 20px;
          }

          .search-input {
            padding: 10px;
            font-size: 1rem;
            width: 300px;
            border-radius: 5px;
            border: 2px solid #FFB700;
          }

          .search-mic {
            background: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
          }

          .results-container {
            width: 80%;
            margin: auto;
            background: rgba(255, 255, 255, 0.9);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          }

          .section-title {
            color:#4F6AC1;
            font-size: 1.5rem;
            font-weight: bold;
            text-align: left;
          }

          .llm-box {
            width: 90%;
            margin: 10px auto;
            padding: 15px;
            background: #f4f4f4;
            border-radius: 5px;
            border-left: 5px solid #4F6AC1;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            border: 10px solid #4F6AC1;
          }

          th, td {
            padding: 10px;
            border-bottom: 1px solid #4F6AC1;
            text-align: left;
          }

          th {
            background: #4F6AC1;
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default Search;

