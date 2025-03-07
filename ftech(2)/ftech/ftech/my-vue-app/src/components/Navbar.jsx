// import { Link } from "react-router-dom";
// import searchIcon from "../assets/icons8-search-128.png";

// const Navbar = ({ active }) => {
//   return (
//     <nav className="navbar">
//       {/* Left Logo/Icon */}
//       <div className="logo">
//         <img src={searchIcon} alt="Search Icon" className="logo-img" />
//       </div>

//       {/* Menu Items */}
//       <div className="menu">
//         <Link to="/" className={`menu-item ${active === "home" ? "active" : ""}`}>Home</Link>
//         <Link to="/search" className={`menu-item ${active === "search" ? "active" : ""}`}>Search</Link>
//         <a href="/admin" className="menu-item">Admin</a>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import { Link } from "react-router-dom"; 
// import searchIcon from "../assets/icons8-search-1281.png";


// const Navbar = ({ active }) => {
//   return (
//     <nav className="navbar">
//       {/* Left Logo/Icon */}
//       <div className="logo">
//         <img src={searchIcon} alt="Search Icon" className="logo-img" />
//       </div>

//       {/* Menu Items */}
//       <div className="menu">
//         <Link to="/" className={`menu-item ${active === "home" ? "active" : ""}`}>Home</Link>
//         <Link to="/search" className={`menu-item ${active === "search" ? "active" : ""}`}>Search</Link>
//         <a href="#" className="menu-item">Guidance</a>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link } from "react-router-dom"; 
import homeSearchIcon from "../assets/icons8-search-128.png"; // Home icon
import defaultSearchIcon from "../assets/icons8-search-1281.png"; // Default icon


const Navbar = ({ active }) => {
  const searchIcon = active === "home" ? homeSearchIcon : defaultSearchIcon;

  return (
    <nav className={`navbar ${active === "home" ? "transparent" : ""}`}>
      {/* Left Logo/Icon */}
      <div className="logo">
        <img src={searchIcon} alt="Search Icon" className="logo-img" />
      </div>

      {/* Menu Items */}
      <div className="menu" style={{fontFamily: "'Rubik', sans-serif",}}>
        <Link to="/" className={`menu-item ${active === "home" ? "active" : ""}`}>Home</Link>
        <Link to="/search" className={`menu-item ${active === "search" ? "active" : ""}`}>Search</Link>
        <a href="/admin" className={`menu-item ${active === "admin" ? "active" : ""}`}>Admin</a>
      </div>
    </nav>
  );
};

export default Navbar;
