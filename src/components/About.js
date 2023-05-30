import React, { useState, useEffect } from "react";
import PostsList from "./PostsList";
import UserService from "../services/user.service";
import "../components.css"

const About = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="con">
      <header className="jumbotron">
        Learn Swap 
      </header>
      <div className="container">
      <div className="jumbotron" id="aboutus">
      <h3>Our Goal</h3>
      <p>The goal of Learn Swap is to have students asking questions on school work on Learn Swap, and upperclasmen helping them with their work. We believe that you shouldn't have to wait and fear if you've gotten the answer right.</p>
      </div>
      <div className="jumbotron"> 
      <h3>Our Modo</h3>
      <p>
      Education Never Sleeps.
        </p>
        </div>
      </div>
      <h1>By: James Benerofe</h1>
    </div>
  );
};

export default About;