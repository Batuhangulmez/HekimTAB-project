import React, { useEffect, useState } from "react";
import Post from "../Components/Post";
import "../css_Modules/HomeScreen.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../actions/postActions";

import { Spinner, Row, Col, Container } from "react-bootstrap";

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const posts = useSelector((state) => state.posts);

  return (
    <main className="homeContainer">
      <h1>Posts</h1>
      {!posts.length ? (
        <Spinner animation="border" />
      ) : (
        <Row>
          {posts.map((post) => (
            <Col
              sm={12}
              md={12}
              lg={12}
              xl={12}
              className="m-auto"
              key={post._id}
            >
              <Post post={post} />
            </Col>
          ))}
        </Row>
      )}
    </main>
  );
};

export default HomeScreen;
