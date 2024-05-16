// HomePage.js
import React from "react";
import { Link } from "react-router-dom"; // If using React Router for navigation
import "./HomePage.scss";

function HomePage() {
  return (
    <div className="homepage">
      <header>
        <h1>Welcome to Bengali Copilot</h1>
        <p>Your intelligent assistant for Bengali language tasks</p>
      </header>
      <main>
        <section className="hero">
          <h2>Explore Bengali Copilot</h2>
          <p>
            Unlock the power of AI for Bengali language tasks. From question
            generation to answer generation, Bengali Copilot has you covered.
          </p>
          <Link to="/explore" className="btn">
            Get Started
          </Link>
        </section>
        <section className="features">
          {/* <div className="feature">
            <h3>Text Generation</h3>
            <p>Let Bengali Copilot assist you in generating text for various purposes, whether it's writing stories, essays, or emails.</p>
          </div> */}
          <div className="feature">
            <h3>Language Understanding</h3>
            <p>
              Upload stories or essays to get information on the named entities
              or important words present in the document. Let Bengali Copilot
              assist you in understanding a document.
            </p>
          </div>
          <div className="feature">
            <h3>Question-Answer Generation</h3>
            <p>
              Ask questions, get information in Bengali, and let Bengali Copilot
              provide you with accurate answers and insights.
            </p>
          </div>
          {/* <div className="feature">
            <h3>Translation</h3>
            <p>Easily translate text between Bengali and other languages with Bengali Copilot's translation capabilities.</p>
          </div> */}
        </section>
      </main>
    </div>
  );
}

export default HomePage;
