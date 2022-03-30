import React, { useEffect } from "react";
import Post from "../Components/Post";
import styles from "../mystyle.module.css";
import { Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../actions/postActions";

import { Spinner, Row, Col } from "react-bootstrap";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <main className={styles.homeContainer}>
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
