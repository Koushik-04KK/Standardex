import Navbar from "./Navbar";
import bgImage from "../assets/Frame1.png";

const Home = () => {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <Navbar active="home" />
      <div className="home-content">
        <div className="home-text">
          <h1 className="home-title" style={{ fontFamily: "'Sedgwick Ave Display', cursive" }}>StandardDex</h1>
          <h2 className="home-subtitle" style={{fontFamily: "'Rubik', sans-serif",}}>CODES AND STANDARDS</h2>
          <p className="home-description">
            Navigate codes and standards effortlessly! Get instant answers with precise references,
            page numbers, and direct links—search made simple!
          </p>
          <a href="#" className="home-button" style={{fontFamily: "'Rubik', sans-serif", paddingRight:"20px",paddingLeft:"20px",paddingTop:"10px",paddingBottom:"10px"}}>Get Started</a>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer" style={{fontFamily: "'Rubik', sans-serif",}}>
        <div className="footer-grid">
          {/* Quick Links */}
          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#" style={{color:"white"}}>Home</a></li>
              <li><a href="#" style={{color:"white"}}>Search</a></li>
              <li><a href="#" style={{color:"white"}}>Guide</a></li>
            </ul>
          </div>

          {/* About Us */}
          <div className="footer-about">
            <h3 className="footer-heading">About us</h3>
            <p className="footer-text">
              The platform simplifies compliance with the standards. Our intelligent search tool
              helps professionals quickly find code references, page numbers, and hyperlinks.
            </p>
          </div>

          {/* Contact Us */}
          <div className="footer-contact">
            <h3 className="footer-heading">Contact Us</h3>
            <p className="footer-text">
              <strong>Email:</strong> standardexcode@gmail.com <br />
              <strong>Phone:</strong> +91-9840234563
            </p>
            <p className="footer-highlight">Stay Compliant, Stay Safe.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
