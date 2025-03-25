import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const FacultyDashboard = () => {
  const sections = {
    problem: useRef(null),
    solution: useRef(null),
    portfolio: useRef(null),
    topProfessors: useRef(null),
    topArticles: useRef(null),
    about: useRef(null),
  };

  const navigate = useNavigate();

  const scrollToSection = (section) => {
    sections[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="faculty-dashboard">
      {/* Header Section */}
      <header className="header">
        <div className="logo">🎓 Faculty Profiling</div>
        <nav>
          <input 
            type="text" 
            placeholder="Search faculty or articles..." 
            className="search-bar"
          />
        </nav>
        <button 
          className="create-profile-btn" 
          onClick={() => navigate("/FacultyForm")}
        >
          + Create Profile
        </button>
      </header>

      {/* Navigation Menu */}
      <ul className="menu">
        {Object.keys(sections).map((section) => (
          <li key={section} onClick={() => scrollToSection(section)}>
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </li>
        ))}
      </ul>

      {/* Hero Section - Get Started */}
      <section className="hero">
        <div className="hero-content">
          <h1>Explore Faculty Profiles & Research</h1>
          <p>Discover top professors and their impactful research.</p>
          <button className="cta-button" onClick={() => navigate("/departments")}>
            Get Started
          </button>
        </div>
      </section>

      {/* Problem Section */}
      <section ref={sections.problem} className="box">
        <h2>The Problem</h2>
        <p>Students and researchers often struggle to find the right faculty for guidance and collaboration.</p>
      </section>

      {/* Solution Section */}
      <section ref={sections.solution} className="box">
        <h2>Our Solution</h2>
        <p>We provide a centralized platform to explore faculty profiles, their research, and top contributions.</p>
      </section>

      {/* Portfolio Section */}
      <section ref={sections.portfolio} className="box">
        <h2>Our Work</h2>
        <div className="grid">
          <img src="portfolio1.jpg" alt="Portfolio 1" className="portfolio-img" />
          <img src="portfolio2.jpg" alt="Portfolio 2" className="portfolio-img" />
          <img src="portfolio3.jpg" alt="Portfolio 3" className="portfolio-img" />
        </div>
      </section>

      {/* Top Professors Section */}
      <section ref={sections.topProfessors} className="box">
        <h2>Top Professors</h2>
        <div className="grid">
          {[{ name: "Dr. Alice Johnson", field: "AI & Machine Learning" },
            { name: "Dr. Robert Smith", field: "Quantum Computing" },
            { name: "Dr. Emily Davis", field: "Cybersecurity" },
            { name: "Dr. Michael Brown", field: "Data Science" }].map((professor, index) => (
            <div key={index} className="card">
              <strong>{professor.name}</strong>
              <br />
              {professor.field}
            </div>
          ))}
        </div>
      </section>

      {/* Top Articles Written by Faculty */}
      <section ref={sections.topArticles} className="box">
        <h2>Top Articles Written by Faculty</h2>
        <ul className="article-list">
          {[{ title: "AI Ethics & Bias", author: "Dr. Alice Johnson" },
            { title: "Advancements in Quantum Computing", author: "Dr. Robert Smith" },
            { title: "Cybersecurity Trends in 2025", author: "Dr. Emily Davis" },
            { title: "Big Data & Its Impact", author: "Dr. Michael Brown" }].map((article, index) => (
            <li key={index} className="article-item">
              <strong>{article.title}</strong> - {article.author}
            </li>
          ))}
        </ul>
      </section>

      {/* About Us Section */}
      <section ref={sections.about} className="box">
        <h2>About Us</h2>
        <p>We are dedicated to bridging the gap between students and faculty through an intuitive research platform.</p>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2025 FacultyPro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FacultyDashboard;
