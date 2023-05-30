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
    <div className="container">
      <header className="jumbotron">
        Learn Swap 
      </header>
      <h3>Our Goal</h3>
      <h1>By: James Benerofe</h1>
    </div>
  );
};

export default About;