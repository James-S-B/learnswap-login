import React, { useState, useEffect } from "react";
import AddPost from "./AddPost";
import Post from "./Post";
import PostsList from "./PostsList";
import UserService from "../services/user.service";
import { Routes, Route, Link, useLocation, Router } from "react-router-dom";


const Home = () => {
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
    <Router>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/posts" className="navbar-brand">
        Learn Swap
      </a>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/posts"} className="nav-link">
            Posts
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/add"} className="nav-link">
            Add
          </Link>
        </li>
      </div>
    </nav>

    <div className="container mt-3">
      <Routes>
        <Route path="/" element={<PostsList/>} />
        <Route path="/posts" element={<PostsList/>} />
        <Route path="/add" element={<AddPost/>} />
        <Route path="/posts/:id" element={<Post/>} />
      </Routes>
    </div>
  </Router>
   
  );
};

export default Home;
