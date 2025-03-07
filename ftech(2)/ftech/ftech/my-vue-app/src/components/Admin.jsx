// import { useState } from "react";
// import Navbar from "./Navbar";
// import bgImage from "../assets/search_bg.png";

// const Admin = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     setSelectedFiles(files);
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const files = Array.from(event.dataTransfer.files);
//     setSelectedFiles(files);
//   };

//   return (
//     <div className="admin-container">
//       <Navbar active="admin" />

//       {/* Hero Section */}
//       <div className="search-hero">
//         <h1 className="search-title">StandardDex</h1>
//         <p className="search-description">
//           Simplifies compliance with standards, offering an intelligent search tool for professionals.
//         </p>
//       </div>

//       {/* File Upload Section */}
//       <div 
//         className="upload-container"
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={handleDrop}
//       >
//         <div className="upload-box">
//           <input
//             type="file"
//             multiple
//             id="file-upload"
//             style={{ display: "none" }}
//             onChange={handleFileChange}
//           />
//           <label htmlFor="file-upload" className="upload-label">
//             📄 CHOOSE FILES
//           </label>
//           <p className="upload-text">or drop files here</p>
//         </div>

//         {/* Display Selected Files */}
//         {selectedFiles.length > 0 && (
//           <div className="file-list">
//             <h3>Selected Files:</h3>
//             <ul>
//               {selectedFiles.map((file, index) => (
//                 <li key={index}>{file.name}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>

//       {/* Background Image */}
//       <div className="search-bg" style={{ backgroundImage: `url(${bgImage})` }}></div>

//       {/* Inline Styles */}
//       <style>
//         {`
//           .admin-container {
//             text-align: center;
//             padding: 20px;
//           }

//           .search-hero {
//             margin-bottom: 20px;
//           }

//           .search-title {
//             font-size: 2.5rem;
//             font-weight: bold;
//             color: #4f6ac1;
//           }

//           .search-description {
//             font-size: 1.2rem;
//             color: #333;
//           }

//           .upload-container {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             background: #0097A7;
//             padding: 40px;
//             border-radius: 10px;
//             border: 2px dashed white;
//             width: 70%;
//             margin: auto;
//             cursor: pointer;
//           }

//           .upload-box {
//             text-align: center;
//           }

//           .upload-label {
//             display: inline-block;
//             padding: 10px 20px;
//             background: white;
//             color: #0097A7;
//             font-weight: bold;
//             border-radius: 5px;
//             cursor: pointer;
//           }

//           .upload-text {
//             margin-top: 10px;
//             color: white;
//           }

//           .file-list {
//             margin-top: 20px;
//             background: white;
//             padding: 10px;
//             border-radius: 5px;
//             width: 60%;
//           }

//           .file-list h3 {
//             color: #4f6ac1;
//             margin-bottom: 10px;
//           }

//           .file-list ul {
//             list-style: none;
//             padding: 0;
//           }

//           .file-list li {
//             color: #333;
//             padding: 5px 0;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Admin;
// 

// import { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import bgImage from "../assets/search_bg.png";

// const Admin = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [pdfStats, setPdfStats] = useState({ total_pdfs: 0, total_pages: 0 });
//   const [pdfList, setPdfList] = useState([]);

//   // Fetch statistics (number of PDFs & pages)
//   const fetchStats = async () => {
//     try {
//       const response = await fetch("https://fastapi-render-cru8.onrender.com/stats");
//       const data = await response.json();
//       setPdfStats(data);
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//     }
//   };

//   // Fetch list of PDFs
//   const fetchPdfList = async () => {
//     try {
//       const response = await fetch("https://fastapi-render-cru8.onrender.com/list_pdfs");
//       const data = await response.json();
//       if (data.documents) {
//         setPdfList(data.documents);
//       }
//     } catch (error) {
//       console.error("Error fetching PDF list:", error);
//     }
//   };

//   // Delete a PDF
//   const deletePdf = async (pdfName) => {
//     try {
//       await fetch(`https://fastapi-render-cru8.onrender.com/delete_pdf?pdf_name=${pdfName}`, {
//         method: "DELETE",
//       });
//       fetchStats();
//       fetchPdfList();
//     } catch (error) {
//       console.error("Error deleting PDF:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//     fetchPdfList();
//     const interval = setInterval(() => {
//       fetchStats();
//       fetchPdfList();
//     }, 3000); // Refresh every 3 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="admin-container">
//       <Navbar active="admin" />

//       {/* Hero Section */}
//       <div className="search-hero">
//         <h1 className="search-title">StandardDex</h1>
//         <p className="search-description">
//           Simplifies compliance with standards, offering an intelligent search tool for professionals.
//         </p>
//         </div>

//       {/* Stats Display */}
//       <div className="stats-container">
//         <div className="stats-box">
//         <h2>{new Set(pdfList.map(p => p.pdf_name)).size}</h2>

          

//           <p>Total PDFs</p>
//         </div>
//         <div className="stats-box">
//           <h2>{pdfStats.total_pages}</h2>
//           <p>Total Pages</p>
//         </div>
//       </div>

//       {/* PDF Table */}
//       <div className="table-container">
//         <h2>Uploaded PDFs</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Document Name</th>
//               <th>View Page 1</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pdfList.map((pdf, index) => (
//               <tr key={index}>
//                 <td>{pdf.pdf_name}</td>
//                 <td>
//                   <a href={pdf.page_link} target="_blank" rel="noopener noreferrer">
//                     Open
//                   </a>
//                 </td>
//                 <td>
//                   <button className="delete-btn" onClick={() => deletePdf(pdf.pdf_name)}>
//                     🗑 Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Background Image */}
//       <div className="search-bg" style={{ backgroundImage: `url(${bgImage})` }}></div>

//       {/* Inline Styles */}
//       <style>
//         {`
                   
//           .admin-container {
//             text-align: center;
//             padding: 20px;
//           }

//           .search-hero {
//             margin-bottom: 20px;
//           }

//           .search-title {
//             font-size: 2.5rem;
//             font-weight: bold;
//             color: #4f6ac1;
//           }

//           .search-description {
//             font-size: 1.2rem;
//             color: #333;
//           }

//           .stats-container {
//             display: flex;
//             justify-content: center;
//             gap: 20px;
//             margin: 20px 0;
//           }

//           .stats-box {
//             background: #0097A7;
//             padding: 20px;
//             border-radius: 10px;
//             color: white;
//             font-size: 1.2rem;
//             min-width: 150px;
//           }

//           .table-container {
//             margin-top: 20px;
//             width: 70%;
//             margin: auto;
//           }

//           table {
//             width: 100%;
//             border-collapse: collapse;
//           }

//           th, td {
//             border: 1px solid #ddd;
//             padding: 10px;
//             text-align: left;
//           }

//           th {
//             background: #4f6ac1;
//             color: white;
//           }

//           .delete-btn {
//             background: red;
//             color: white;
//             border: none;
//             padding: 5px 10px;
//             cursor: pointer;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Admin;

// import { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import bgImage from "../assets/search_bg.png";

// const Admin = () => {
//   const [pdfStats, setPdfStats] = useState({ total_pdfs: 0, total_pages: 0 });
//   const [pdfList, setPdfList] = useState([]);

//   // Fetch statistics (number of PDFs & pages)
//   const fetchStats = async () => {
//     try {
//       const response = await fetch("https://fastapi-render-cru8.onrender.com/stats");
//       const data = await response.json();
//       setPdfStats(data);
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//     }
//   };

//   // Fetch list of PDFs
//   const fetchPdfList = async () => {
//     try {
//       const response = await fetch("https://fastapi-render-cru8.onrender.com/list_pdfs");
//       const data = await response.json();
//       if (data.documents) {
//         setPdfList(data.documents);
//       }
//     } catch (error) {
//       console.error("Error fetching PDF list:", error);
//     }
//   };

//   // Delete a PDF
//   const deletePdf = async (pdfName) => {
//     try {
//       await fetch(`https://fastapi-render-cru8.onrender.com/delete_pdf?pdf_name=${pdfName}`, {
//         method: "DELETE",
//       });
//       fetchStats();
//       fetchPdfList();
//     } catch (error) {
//       console.error("Error deleting PDF:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//     fetchPdfList();
//     const interval = setInterval(() => {
//       fetchStats();
//       fetchPdfList();
//     }, 3000); // Refresh every 3 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="admin-container">
//       <Navbar active="admin" />

//       {/* Hero Section */}
//       <div className="search-hero">
//         <h1 className="search-title">StandardDex</h1>
//         <p className="search-description">
//           Simplifies compliance with standards, offering an intelligent search tool for professionals.
//         </p>

//         {/* Search Bar */}
       
//       </div>

//       {/* Stats Display */}
//       <div className="stats-container">
//         <div className="stats-box">
//           <h2>{new Set(pdfList.map((p) => p.pdf_name)).size}</h2>
//           <p>Total PDFs</p>
//         </div>
//         <div className="stats-box">
//           <h2>{pdfStats.total_pages}</h2>
//           <p>Total Pages</p>
//         </div>
//       </div>

//       {/* PDF Table */}
//       <div className="table-container">
//         <h2>Uploaded PDFs</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Document Name</th>
//               <th>View Page 1</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pdfList.map((pdf, index) => (
//               <tr key={index}>
//                 <td>{pdf.pdf_name}</td>
//                 <td>
//                   <a
//                     href={pdf.page_link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Open
//                   </a>
//                 </td>
//                 <td>
//                   <button
//                     className="delete-btn"
//                     onClick={() => deletePdf(pdf.pdf_name)}
//                   >
//                     🗑 Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Background Image */}
//       <div
//         className="search-bg"
//         style={{ backgroundImage: `url(${bgImage})` }}
//       ></div>

//       {/* Inline Styles */}
//       <style>
//         {`
//           .search-hero {
//             background: #FFB700;
//             color: white;
//             text-align: center;
//             padding: 40px 0;
//           }

//           .search-title {
//             font-size: 3.5rem;
//             font-family: 'Sedgwick Ave', cursive;
//             font-weight: bold;
//           }

//           .search-description {
//             font-size: 1.2rem;
//             margin-top: 10px;
//           }
          

//           .stats-container {
//             display: flex;
//             justify-content: center;
//             gap: 20px;
//             margin: 20px 0;
//           }

//           .stats-box {
//             background: #0097A7;
//             padding: 20px;
//             border-radius: 10px;
//             color: white;
//             font-size: 1.2rem;
//             min-width: 150px;
//           }

//           .table-container {
//             margin-top: 20px;
//             width: 70%;
//             margin: auto;
//           }

//           table {
//             width: 100%;
//             border-collapse: collapse;
//           }

//           th, td {
//             border: 1px solid #ddd;
//             padding: 10px;
//             text-align: left;
//           }

//           th {
//             background: #4f6ac1;
//             color: white;
//           }

//           .delete-btn {
//             background: red;
//             color: white;
//             border: none;
//             padding: 5px 10px;
//             cursor: pointer;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Admin;

// import { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import bgImage from "../assets/search_bg.png";

// const Admin = () => {
//   const [pdfStats, setPdfStats] = useState({ total_pdfs: 0, total_pages: 0 });
//   const [pdfList, setPdfList] = useState([]);

//   // Fetch statistics (number of PDFs & pages)
//   const fetchStats = async () => {
//     try {
//       const response = await fetch("https://fastapi-render-cru8.onrender.com/stats");
//       const data = await response.json();
//       setPdfStats(data);
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//     }
//   };

//   // Fetch list of PDFs
//   const fetchPdfList = async () => {
//     try {
//       const response = await fetch("https://fastapi-render-cru8.onrender.com/list_pdfs");
//       const data = await response.json();
//       if (data.documents) {
//         setPdfList(data.documents);
//       }
//     } catch (error) {
//       console.error("Error fetching PDF list:", error);
//     }
//   };

//   // Delete a PDF
//   const deletePdf = async (pdfName) => {
//     try {
//       await fetch(`https://fastapi-render-cru8.onrender.com/delete_pdf?pdf_name=${pdfName}`, {
//         method: "DELETE",
//       });
//       fetchStats();
//       fetchPdfList();
//     } catch (error) {
//       console.error("Error deleting PDF:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//     fetchPdfList();
//     const interval = setInterval(() => {
//       fetchStats();
//       fetchPdfList();
//     }, 3000); // Refresh every 3 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="admin-container">
//       <Navbar active="admin" />

//       {/* Hero Section */}
//       <div className="search-hero">
//         <h1 className="search-title">StandardDex</h1>
//         <p className="search-description">
//           Simplifies compliance with standards, offering an intelligent search tool for professionals.
//         </p>
//       </div>

//       {/* File Upload Section */}
//       <div className="upload-container">
//         <input type="file" className="file-input" accept="application/pdf" />
//         <button className="upload-btn">Upload PDF</button>
//       </div>

//       {/* Stats Display */}
//       <div className="stats-container">
//         <div className="stats-box">
//           <h2>{new Set(pdfList.map((p) => p.pdf_name)).size}</h2>
//           <p>Total PDFs</p>
//         </div>
//         <div className="stats-box">
//           <h2>{pdfStats.total_pages}</h2>
//           <p>Total Pages</p>
//         </div>
//       </div>

//       {/* PDF Table */}
//       <div className="table-container">
//         <h2>Uploaded PDFs</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Document Name</th>
//               <th>View Page 1</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pdfList.map((pdf, index) => (
//               <tr key={index}>
//                 <td>{pdf.pdf_name}</td>
//                 <td>
//                   <a href={pdf.page_link} target="_blank" rel="noopener noreferrer">
//                     Open
//                   </a>
//                 </td>
//                 <td>
//                   <button className="delete-btn" onClick={() => deletePdf(pdf.pdf_name)}>
//                     🗑 Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Background Image */}
//       <div className="search-bg" style={{ backgroundImage: `url(${bgImage})` }}></div>

//       {/* Inline Styles */}
//       <style>
//         {`
//           .search-hero {
//             background: #FFB700;
//             color: white;
//             text-align: center;
//             padding: 40px 0;
//           }

//           .search-title {
//             font-size: 3.5rem;
//             font-family: 'Sedgwick Ave', cursive;
//             font-weight: bold;
//           }

//           .search-description {
//             font-size: 1.2rem;
//             margin-top: 10px;
//           }

//           .upload-container {
//             display: flex;
//             justify-content: center;
//             margin: 20px;
//             gap: 10px;
//           }

//           .file-input {
//             border: 2px dashed #0097A7;
//             padding: 10px;
//             cursor: pointer;
//           }

//           .upload-btn {
//             background: #4CAF50;
//             color: white;
//             border: none;
//             padding: 10px 20px;
//             cursor: pointer;
//             border-radius: 5px;
//           }

//           .stats-container {
//             display: flex;
//             justify-content: center;
//             gap: 20px;
//             margin: 20px 0;
//           }

//           .stats-box {
//             background: #0097A7;
//             padding: 20px;
//             border-radius: 10px;
//             color: white;
//             font-size: 1.2rem;
//             min-width: 150px;
//           }

//           .table-container {
//             margin-top: 20px;
//             width: 70%;
//             margin: auto;
//           }

//           table {
//             width: 100%;
//             border-collapse: collapse;
//           }

//           th, td {
//             border: 1px solid #ddd;
//             padding: 10px;
//             text-align: left;
//           }

//           th {
//             background: #4f6ac1;
//             color: white;
//           }

//           .delete-btn {
//             background: red;
//             color: white;
//             border: none;
//             padding: 5px 10px;
//             cursor: pointer;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Admin;

// import { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import bgImage from "../assets/search_bg.png";

// const Admin = () => {
//   const [pdfStats, setPdfStats] = useState({ total_pdfs: 0, total_pages: 0 });
//   const [pdfList, setPdfList] = useState([]);
//   const [uploadStatus, setUploadStatus] = useState("");

//   const fetchStats = async () => {
//     try {
//       const response = await fetch("https://fastapi-render-cru8.onrender.com/stats");
//       const data = await response.json();
//       setPdfStats(data);
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//     }
//   };

//   const fetchPdfList = async () => {
//     try {
//       const response = await fetch("https://fastapi-render-cru8.onrender.com/list_pdfs");
//       const data = await response.json();
//       if (data.documents) {
//         setPdfList(data.documents);
//       }
//     } catch (error) {
//       console.error("Error fetching PDF list:", error);
//     }
//   };

//   const deletePdf = async (pdfName) => {
//     try {
//       await fetch(`https://fastapi-render-cru8.onrender.com/delete_pdf?pdf_name=${pdfName}`, {
//         method: "DELETE",
//       });
//       fetchStats();
//       fetchPdfList();
//     } catch (error) {
//       console.error("Error deleting PDF:", error);
//     }
//   };

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setUploadStatus("Uploading...");

//     setTimeout(() => {
//       setUploadStatus("Upload Done");
//     }, 10000);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await fetch("https://fastapi-render-cru8.onrender.com/upload", {
//         method: "POST",
//         body: formData,
//       });
//       fetchStats();
//       fetchPdfList();
//     } catch (error) {
//       console.error("Error uploading PDF:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//     fetchPdfList();
//     const interval = setInterval(() => {
//       fetchStats();
//       fetchPdfList();
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="admin-container">
//       <Navbar active="admin" />
//       <div className="search-hero">
//         <h1 className="search-title">StandardDex</h1>
//         <p className="search-description">
//           Simplifies compliance with standards, offering an intelligent search tool for professionals.
//         </p>
//       </div>
//       <div className="upload-container">
//         <input type="file" className="file-input" accept="application/pdf" onChange={handleFileUpload} />
//         <p className="upload-status">{uploadStatus}</p>
//       </div>
//       <div className="stats-container">
//         <div className="stats-box">
//           <h2>{new Set(pdfList.map((p) => p.pdf_name)).size}</h2>
//           <p>Total PDFs</p>
//         </div>
//         <div className="stats-box">
//           <h2>{pdfStats.total_pages}</h2>
//           <p>Total Pages</p>
//         </div>
//       </div>
//       <div className="table-container">
//         <h2>Uploaded PDFs</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Document Name</th>
//               <th>View Page 1</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pdfList.map((pdf, index) => (
//               <tr key={index}>
//                 <td>{pdf.pdf_name}</td>
//                 <td>
//                   <a href={pdf.page_link} target="_blank" rel="noopener noreferrer">
//                     Open
//                   </a>
//                 </td>
//                 <td>
//                   <button className="delete-btn" onClick={() => deletePdf(pdf.pdf_name)}>
//                     🗑 Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="search-bg" style={{ backgroundImage: `url(${bgImage})` }}></div>
//       <style>
//         {`
//           .search-hero {
//             background: #FFB700;
//             color: white;
//             text-align: center;
//             padding: 40px 0;
//           }
//           .search-title {
//             font-size: 3.5rem;
//             font-family: 'Sedgwick Ave', cursive;
//             font-weight: bold;
//           }
//           .search-description {
//             font-size: 1.2rem;
//             margin-top: 10px;
//           }
//           .upload-container {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             margin: 20px;
//           }
//           .file-input {
//             border: 2px dashed #0097A7;
//             padding: 10px;
//             cursor: pointer;
//           }
//           .upload-status {
//             margin-top: 10px;
//             font-size: 1.2rem;
//             font-weight: bold;
//             color: #4CAF50;
//           }
//           .stats-container {
//             display: flex;
//             justify-content: center;
//             gap: 20px;
//             margin: 20px 0;
//           }
//           .stats-box {
//             background: #0097A7;
//             padding: 20px;
//             border-radius: 10px;
//             color: white;
//             font-size: 1.2rem;
//             min-width: 150px;
//           }
//           .table-container {
//             margin-top: 20px;
//             width: 70%;
//             margin: auto;
//           }
//           table {
//             width: 100%;
//             border-collapse: collapse;
//           }
//           th, td {
//             border: 1px solid #ddd;
//             padding: 10px;
//             text-align: left;
//           }
//           th {
//             background: #4f6ac1;
//             color: white;
//           }
//           .delete-btn {
//             background: red;
//             color: white;
//             border: none;
//             padding: 5px 10px;
//             cursor: pointer;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Admin;

// import { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import bgImage from "../assets/search_bg.png";

// const Admin = () => {
//   const [pdfStats, setPdfStats] = useState({ total_pdfs: 0, total_pages: 0 });
//   const [pdfList, setPdfList] = useState([]);
//   const [uploadStatus, setUploadStatus] = useState("");

//   const fetchStats = async () => {
//     try {
//       const response = await fetch("https://fastapi-render-cru8.onrender.com/stats");
//       const data = await response.json();
//       setPdfStats(data);
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//     }
//   };

//   const fetchPdfList = async () => {
//     try {
//       const response = await fetch("https://fastapi-render-cru8.onrender.com/list_pdfs");
//       const data = await response.json();
//       if (data.documents) {
//         setPdfList(data.documents);
//       }
//     } catch (error) {
//       console.error("Error fetching PDF list:", error);
//     }
//   };

//   const deletePdf = async (pdfName) => {
//     try {
//       await fetch(`https://fastapi-render-cru8.onrender.com/delete_pdf?pdf_name=${pdfName}`, {
//         method: "DELETE",
//       });
//       fetchStats();
//       fetchPdfList();
//     } catch (error) {
//       console.error("Error deleting PDF:", error);
//     }
//   };

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setUploadStatus("Uploading...");

//     setTimeout(() => {
//       setUploadStatus("Upload Done");
//     }, 10000);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await fetch("https://fastapi-render-cru8.onrender.com/upload", {
//         method: "POST",
//         body: formData,
//       });
//       fetchStats();
//       fetchPdfList();
//     } catch (error) {
//       console.error("Error uploading PDF:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//     fetchPdfList();
//     const interval = setInterval(() => {
//       fetchStats();
//       fetchPdfList();
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="admin-container">
//       <Navbar active="admin" />
//       <div className="search-hero">
//         <h1 className="search-title">StandardDex</h1>
//         <p className="search-description">
//           Simplifies compliance with standards, offering an intelligent search tool for professionals.
//         </p>
//       </div>
//       <div className="upload-container">
//         <input type="file" className="file-input" accept="application/pdf" onChange={handleFileUpload} />
//         <p className="upload-status">{uploadStatus}</p>
//       </div>
//       <div className="stats-container">
//         <div className="stats-box">
//           <h2>{new Set(pdfList.map((p) => p.pdf_name)).size}</h2>
//           <p>Total PDFs</p>
//         </div>
//         <div className="stats-box">
//           <h2>{pdfStats.total_pages}</h2>
//           <p>Total Pages</p>
//         </div>
//       </div>
//       <div className="table-container">
//         <h2>Uploaded PDFs</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Document Name</th>
//               <th>View Page 1</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pdfList.map((pdf, index) => (
//               <tr key={index}>
//                 <td>{pdf.pdf_name}</td>
//                 <td>
//                   <a href={pdf.page_link} target="_blank" rel="noopener noreferrer">
//                     Open
//                   </a>
//                 </td>
//                 <td>
//                   <button className="delete-btn" onClick={() => deletePdf(pdf.pdf_name)}>
//                     🗑 Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="search-bg" style={{ backgroundImage: `url(${bgImage})` }}></div>

//       <style>
//         {`
//           .search-hero {
//             background: #FFB700;
//             color: white;
//             text-align: center;
//             padding: 40px 0;
//           }
//           .search-title {
//             font-size: 3.5rem;
//             font-family: 'Sedgwick Ave', cursive;
//             font-weight: bold;
//           }
//           .search-description {
//             font-size: 1.2rem;
//             margin-top: 10px;
//           }
//           .upload-container {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             margin: 20px;
//           }
//           .file-input {
//             border: 2px dashed #0097A7;
//             padding: 10px;
//             cursor: pointer;
//             background: #0097A7;
//             height:40px;
//             width:300px;
//           }
//           .upload-status {
//             margin-top: 10px;
//             font-size: 1.2rem;
//             font-weight: bold;
//             color: #4CAF50;
//           }
//           .stats-container {
//             display: flex;
//             justify-content: center;
//             gap: 20px;
//             margin: 20px 0;
//           }
//           .stats-box {
//             background: #0097A7;
//             padding: 20px;
//             border-radius: 10px;
//             color: white;
//             font-size: 1.2rem;
//             min-width: 150px;
//           }
//           .table-container {
//             margin-top: 20px;
//             width: 70%;
//             margin: auto;
//           }
//           table {
//             width: 100%;
//             border-collapse: collapse;
//           }
//           th, td {
//             border: 1px solid #ddd;
//             padding: 10px;
//             text-align: left;
//           }
//           th {
//             background: #4f6ac1;
//             color: white;
//           }
//           .delete-btn {
//             background: red;
//             color: white;
//             border: none;
//             padding: 5px 10px;
//             cursor: pointer;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Admin;

// import { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import bgImage from "../assets/search_bg.png";

// const Admin = () => {
//   const [pdfStats, setPdfStats] = useState({ total_pdfs: 0, total_pages: 0 });
//   const [pdfList, setPdfList] = useState([]);
//   const [uploadStatus, setUploadStatus] = useState("Drop a file or click to upload");
//   const [dragging, setDragging] = useState(false);

//   const fetchStats = async () => {
//     try {
//       const response = await fetch("https://fastapi-render-cru8.onrender.com/stats");
//       const data = await response.json();
//       setPdfStats(data);
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//     }
//   };

//   const fetchPdfList = async () => {
//     try {
//       const response = await fetch("https://fastapi-render-cru8.onrender.com/list_pdfs");
//       const data = await response.json();
//       if (data.documents) {
//         setPdfList(data.documents);
//       }
//     } catch (error) {
//       console.error("Error fetching PDF list:", error);
//     }
//   };

//   const deletePdf = async (pdfName) => {
//     try {
//       await fetch(`https://fastapi-render-cru8.onrender.com/delete_pdf?pdf_name=${pdfName}`, {
//         method: "DELETE",
//       });
//       fetchStats();
//       fetchPdfList();
//     } catch (error) {
//       console.error("Error deleting PDF:", error);
//     }
//   };

//   const handleFileUpload = async (file) => {
//     if (!file) return;
//     setUploadStatus("Uploading...");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await fetch("https://fastapi-render-cru8.onrender.com/upload", {
//         method: "POST",
//         body: formData,
//       });
//       setUploadStatus("Upload Successful!");
//       fetchStats();
//       fetchPdfList();
//     } catch (error) {
//       console.error("Error uploading PDF:", error);
//       setUploadStatus("Upload Failed!");
//     }
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setDragging(false);
//     const file = event.dataTransfer.files[0];
//     handleFileUpload(file);
//   };

//   useEffect(() => {
//     fetchStats();
//     fetchPdfList();
//     const interval = setInterval(() => {
//       fetchStats();
//       fetchPdfList();
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="admin-container">
//       <Navbar active="admin" />
//       <div className="search-hero" style={{ background: "#FFB700", color: "white", textAlign: "center", padding: "40px 0" }}>
//         <h1 style={{ fontSize: "3.5rem", fontFamily: "'Sedgwick Ave', cursive", fontWeight: "bold" }}>StandardDex</h1>
//         <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>Simplifies compliance with standards, offering an intelligent search tool for professionals.</p>
//       </div>
//       <div 
//         className={`upload-container ${dragging ? "dragging" : ""}`}
//         onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
//         onDragLeave={() => setDragging(false)}
//         onDrop={handleDrop}
//         style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "3px dashed #0097A7", padding: "50px", width: "80%", margin: "20px auto", background: "#f9f9f9", textAlign: "center", cursor: "pointer", transition: "0.3s" }}
//       >
//         <p className="upload-status" style={{ marginTop: "10px", fontSize: "1.2rem", fontWeight: "bold", color: "#4CAF50" }}>{uploadStatus}</p>
//         <input
//           type="file"
//           className="file-input"
//           accept="application/pdf"
//           onChange={(e) => handleFileUpload(e.target.files[0])}
//           style={{ opacity: 0, position: "absolute", width: "100%", height: "100%", cursor: "pointer" }}
//         />
//       </div>
//       <div className="stats-container" style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "20px 0" }}>
//         <div className="stats-box" style={{ background: "#0097A7", padding: "20px", borderRadius: "10px", color: "white", fontSize: "1.2rem", minWidth: "150px" }}>
//           <h2>{new Set(pdfList.map((p) => p.pdf_name)).size}</h2>
//           <p>Total PDFs</p>
//         </div>
//         <div className="stats-box" style={{ background: "#0097A7", padding: "20px", borderRadius: "10px", color: "white", fontSize: "1.2rem", minWidth: "150px" }}>
//           <h2>{pdfStats.total_pages}</h2>
//           <p>Total Pages</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;
// import { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import bgImage from "../assets/search_bg.png";

// const Admin = () => {
//   const [pdfStats, setPdfStats] = useState({ total_pdfs: 0, total_pages: 0 });
//   const [pdfList, setPdfList] = useState([]);
//   const [uploadStatus, setUploadStatus] = useState("Drop a file or click to upload");
//   const [dragging, setDragging] = useState(false);

//   const fetchStats = async () => {
//     try {
//       const response = await fetch("https://fastapi-render-cru8.onrender.com/stats");
//       const data = await response.json();
//       setPdfStats(data);
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//     }
//   };

//   const fetchPdfList = async () => {
//     try {
//       const response = await fetch("https://fastapi-render-cru8.onrender.com/list_pdfs");
//       const data = await response.json();
//       if (data.documents) {
//         setPdfList(data.documents);
//       }
//     } catch (error) {
//       console.error("Error fetching PDF list:", error);
//     }
//   };

//   const deletePdf = async (pdfName) => {
//     try {
//       await fetch(`https://fastapi-render-cru8.onrender.com/delete_pdf?pdf_name=${pdfName}`, {
//         method: "DELETE",
//       });
//       fetchStats();
//       fetchPdfList();
//     } catch (error) {
//       console.error("Error deleting PDF:", error);
//     }
//   };

//   const handleFileUpload = async (file) => {
//     if (!file) return;
//     setUploadStatus("Uploading...");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await fetch("https://fastapi-render-cru8.onrender.com/upload", {
//         method: "POST",
//         body: formData,
//       });
//       setUploadStatus("Upload Successful!");
//       fetchStats();
//       fetchPdfList();
//     } catch (error) {
//       console.error("Error uploading PDF:", error);
//       setUploadStatus("Upload Failed!");
//     }
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setDragging(false);
//     const file = event.dataTransfer.files[0];
//     handleFileUpload(file);
//   };

//   useEffect(() => {
//     fetchStats();
//     fetchPdfList();
//     const interval = setInterval(() => {
//       fetchStats();
//       fetchPdfList();
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="admin-container">
//       <Navbar active="admin" />
//       <div className="search-hero" style={{ background: "#FFB700", color: "white", textAlign: "center", padding: "40px 0" }}>
//         <h1 style={{ fontSize: "3.5rem", fontFamily: "'Sedgwick Ave', cursive", fontWeight: "bold" }}>StandardDex</h1>
//         <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>Simplifies compliance with standards, offering an intelligent search tool for professionals.</p>
//       </div>
//       <div 
//         className={`upload-container ${dragging ? "dragging" : ""}`}
//         onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
//         onDragLeave={() => setDragging(false)}
//         onDrop={handleDrop}
//         style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "3px dashed #0097A7", padding: "50px", width: "80%", margin: "20px auto", background: "#f9f9f9", textAlign: "center", cursor: "pointer", transition: "0.3s" }}
//       >
//         <p className="upload-status" style={{ marginTop: "10px", fontSize: "1.2rem", fontWeight: "bold", color: "#4CAF50" }}>{uploadStatus}</p>
//         <input
//           type="file"
//           className="file-input"
//           accept="application/pdf"
//           onChange={(e) => handleFileUpload(e.target.files[0])}
//           style={{ opacity: 0, position: "absolute", width: "100%", height: "100%", cursor: "pointer" }}
//         />
//       </div>
//       <div className="stats-container" style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "20px 0" }}>
//         <div className="stats-box" style={{ background: "#0097A7", padding: "20px", borderRadius: "10px", color: "white", fontSize: "1.2rem", minWidth: "150px" }}>
//           <h2>{new Set(pdfList.map((p) => p.pdf_name)).size}</h2>
//           <p>Total PDFs</p>
//         </div>
//         <div className="stats-box" style={{ background: "#0097A7", padding: "20px", borderRadius: "10px", color: "white", fontSize: "1.2rem", minWidth: "150px" }}>
//           <h2>{pdfStats.total_pages}</h2>
//           <p>Total Pages</p>
//         </div>
//       </div>
//       <div className="table-container" style={{ margin: "20px auto", width: "80%" }}>
//         <h2>Uploaded PDFs</h2>
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr>
//               <th style={{ border: "1px solid #ddd", padding: "10px", background: "#4f6ac1", color: "white" }}>Document Name</th>
//               <th style={{ border: "1px solid #ddd", padding: "10px", background: "#4f6ac1", color: "white" }}>View Page 1</th>
//               <th style={{ border: "1px solid #ddd", padding: "10px", background: "#4f6ac1", color: "white" }}>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pdfList.map((pdf, index) => (
//               <tr key={index}>
//                 <td style={{ border: "1px solid #ddd", padding: "10px" }}>{pdf.pdf_name}</td>
//                 <td style={{ border: "1px solid #ddd", padding: "10px" }}>
//                   <a href={pdf.page_link} target="_blank" rel="noopener noreferrer">Open</a>
//                 </td>
//                 <td style={{ border: "1px solid #ddd", padding: "10px" }}>
//                   <button className="delete-btn" onClick={() => deletePdf(pdf.pdf_name)} style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>🗑 Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Admin;

// import { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import bgImage from "../assets/search_bg.png";

// const Admin = () => {
//   const [pdfStats, setPdfStats] = useState({ total_pdfs: 0, total_pages: 0 });
//   const [pdfList, setPdfList] = useState([]);
//   const [uploadStatus, setUploadStatus] = useState("Drop a file or click to upload");
//   const [dragging, setDragging] = useState(false);

//   const fetchStats = async () => {
//     try {
//       const response = await fetch("https://fastapi-render-cru8.onrender.com/stats");
//       const data = await response.json();
//       setPdfStats(data);
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//     }
//   };

//   const fetchPdfList = async () => {
//     try {
//       const response = await fetch("https://fastapi-render-cru8.onrender.com/list_pdfs");
//       const data = await response.json();
//       if (data.documents) {
//         setPdfList(data.documents);
//       }
//     } catch (error) {
//       console.error("Error fetching PDF list:", error);
//     }
//   };

//   const deletePdf = async (pdfName) => {
//     try {
//       await fetch(`https://fastapi-render-cru8.onrender.com/delete_pdf?pdf_name=${pdfName}`, {
//         method: "DELETE",
//       });
//       fetchStats();
//       fetchPdfList();
//     } catch (error) {
//       console.error("Error deleting PDF:", error);
//     }
//   };

//   const handleFileUpload = async (file) => {
//     if (!file) return;
//     setUploadStatus("Uploading...");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await fetch("https://fastapi-render-cru8.onrender.com/upload", {
//         method: "POST",
//         body: formData,
//       });
//       setUploadStatus("Upload Successful!");
//       fetchStats();
//       fetchPdfList();
//     } catch (error) {
//       console.error("Error uploading PDF:", error);
//       setUploadStatus("Upload Failed!");
//     }
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setDragging(false);
//     const file = event.dataTransfer.files[0];
//     handleFileUpload(file);
//   };

//   useEffect(() => {
//     fetchStats();
//     fetchPdfList();
//     const interval = setInterval(() => {
//       fetchStats();
//       fetchPdfList();
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="admin-container">
//       <Navbar active="admin" />
//       <div className="search-hero" style={{ background: "#FFB700", color: "white", textAlign: "center", padding: "40px 0" }}>
//         <h1 style={{ fontSize: "3.5rem", fontFamily: "'Sedgwick Ave', cursive", fontWeight: "bold" }}>StandardDex</h1>
//         <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>Simplifies compliance with standards, offering an intelligent search tool for professionals.</p>
//       </div>
//       <div 
//         className={`upload-container ${dragging ? "dragging" : ""}`}
//         onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
//         onDragLeave={() => setDragging(false)}
//         onDrop={handleDrop}
//         style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "3px dashed #0097A7", padding: "50px", width: "80%", margin: "20px auto", background: "#f9f9f9", textAlign: "center", cursor: "pointer", transition: "0.3s" }}
//       >
//         <p className="upload-status" style={{ marginTop: "10px", fontSize: "1.2rem", fontWeight: "bold", color: "#4CAF50" }}>{uploadStatus}</p>
//         <input
//           type="file"
//           className="file-input"
//           accept="application/pdf"
//           onChange={(e) => handleFileUpload(e.target.files[0])}
//           style={{ opacity: 0, position: "absolute", width: "100%", height: "100%", cursor: "pointer" }}
//         />
//       </div>
//       <div className="stats-container" style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "20px 0" }}>
//         <div className="stats-box" style={{ background: "#0097A7", padding: "20px", borderRadius: "10px", color: "white", fontSize: "1.2rem", minWidth: "150px" }}>
//           <h2>{new Set(pdfList.map((p) => p.pdf_name)).size}</h2>
//           <p>Total PDFs</p>
//         </div>
//         <div className="stats-box" style={{ background: "#0097A7", padding: "20px", borderRadius: "10px", color: "white", fontSize: "1.2rem", minWidth: "150px" }}>
//           <h2>{pdfStats.total_pages}</h2>
//           <p>Total Pages</p>
//         </div>
//       </div>
//       <div className="table-container" style={{ margin: "20px auto", width: "80%" }}>
//         <h2>Uploaded PDFs</h2>
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr>
//               <th style={{ border: "1px solid #ddd", padding: "10px", background: "#4f6ac1", color: "white" }}>Document Name</th>
//               <th style={{ border: "1px solid #ddd", padding: "10px", background: "#4f6ac1", color: "white" }}>View Page 1</th>
//               <th style={{ border: "1px solid #ddd", padding: "10px", background: "#4f6ac1", color: "white" }}>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pdfList.map((pdf, index) => (
//               <tr key={index}>
//                 <td style={{ border: "1px solid #ddd", padding: "10px" }}>{pdf.pdf_name}</td>
//                 <td style={{ border: "1px solid #ddd", padding: "10px" }}>
//                   <a href={pdf.page_link} target="_blank" rel="noopener noreferrer">Open</a>
//                 </td>
//                 <td style={{ border: "1px solid #ddd", padding: "10px" }}>
//                   <button className="delete-btn" onClick={() => deletePdf(pdf.pdf_name)} style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>🗑 Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Admin;

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import bgImage from "../assets/search_bg.png";

const Admin = () => {
  const [pdfStats, setPdfStats] = useState({ total_pdfs: 0, total_pages: 0 });
  const [pdfList, setPdfList] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("Drop a file or click to upload");
  const [dragging, setDragging] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await fetch("https://fastapi-render-cru8.onrender.com/stats");
      const data = await response.json();
      setPdfStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchPdfList = async () => {
    try {
      const response = await fetch("https://fastapi-render-cru8.onrender.com/list_pdfs");
      const data = await response.json();
      if (data.documents) {
        setPdfList(data.documents);
      }
    } catch (error) {
      console.error("Error fetching PDF list:", error);
    }
  };

  const deletePdf = async (pdfName) => {
    try {
      await fetch(`https://fastapi-render-cru8.onrender.com/delete_pdf?pdf_name=${pdfName}`, {
        method: "DELETE",
      });
      fetchStats();
      fetchPdfList();
    } catch (error) {
      console.error("Error deleting PDF:", error);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploadStatus("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await fetch("https://fastapi-render-cru8.onrender.com/upload", {
        method: "POST",
        body: formData,
      });
      setUploadStatus("Upload Successful!");
      fetchStats();
      fetchPdfList();
    } catch (error) {
      console.error("Error uploading PDF:", error);
      setUploadStatus("Upload Failed!");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    handleFileUpload(file);
  };

  useEffect(() => {
    fetchStats();
    fetchPdfList();
    const interval = setInterval(() => {
      fetchStats();
      fetchPdfList();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="admin-container">
      <Navbar active="admin" />
      <div className="search-hero" style={{ background: "#FFB700", color: "white", textAlign: "center", padding: "40px 0" }}>
        <h1 style={{
        fontFamily: "'Sedgwick Ave Display', cursive",
        fontSize: '4rem',
        fontWeight: 500,
      }}>StandardDex</h1>
        <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>Simplifies compliance with standards, offering an intelligent search tool for professionals.</p>
      </div>
      <div 
        className={`upload-container ${dragging ? "dragging" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          border: "3px dashed #0097A7", 
          padding: "50px", 
          width: "80%", 
          margin: "20px auto", 
          background: "#f9f9f9", 
          textAlign: "center", 
          transition: "0.3s",
          fontFamily: "'Rubik', sans-serif", 
        }}
      >
        <p className="upload-status" style={{ marginTop: "10px", fontSize: "1.2rem", fontWeight: "bold", color: "#4CAF50" }}>
          {uploadStatus}
        </p>
        <input
          type="file"
          className="file-input"
          accept="application/pdf"
          onChange={(e) => handleFileUpload(e.target.files[0])}
          style={{ 
            opacity: 0, 
            position: "absolute", 
            width: "100%", 
            height: "100%", 
            cursor: "pointer" 
          }}
        />
      </div>
      <div>
      <div className="stats-container" style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "20px 0",fontFamily: "'Rubik', sans-serif", }}>
        <div className="stats-box" style={{ background: "#4F6AC1", padding: "20px", borderRadius: "10px", color: "white", fontSize: "1.2rem", minWidth: "150px" }}>
          <h2>{new Set(pdfList.map((p) => p.pdf_name)).size}</h2>
          <p>Total PDFs</p>
        </div>
        <div className="stats-box" style={{ background: "#4F6AC1", padding: "20px", borderRadius: "10px", color: "white", fontSize: "1.2rem", minWidth: "150px" }}>
          <h2>{pdfStats.total_pages}</h2>
          <p>Total Pages</p>
        </div>
      </div>
      </div>
      
      <div className="table-container" style={{ margin: "20px auto", width: "80%",fontFamily: "'Rubik', sans-serif",color:"#4F6AC1"}}>
        <h2>Uploaded PDFs</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "10px", background: "#4f6ac1", color: "white" }}>Document Name</th>
              <th style={{ border: "1px solid #ddd", padding: "10px", background: "#4f6ac1", color: "white" }}>View</th>
              <th style={{ border: "1px solid #ddd", padding: "10px", background: "#4f6ac1", color: "white" }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {pdfList.map((pdf, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>{pdf.pdf_name}</td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  <a href={pdf.page_link} target="_blank" rel="noopener noreferrer">Open</a>
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  <button 
                    className="delete-btn" 
                    onClick={() => deletePdf(pdf.pdf_name)} 
                    style={{ 
                      background: "red", 
                      color: "white", 
                      border: "none", 
                      padding: "5px 10px", 
                      cursor: "pointer" 
                    }}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
