import React from "react";
import styles from "../mystyle.module.css";

import { Card, Button, CloseButton } from "react-bootstrap";

import { useDispatch } from "react-redux";

import { deletePost } from "../actions/postActions";

import Logo from "../images/Logo.png";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  return (
    <Card className={styles.postContent}>
      <Card.Header className={styles.header}>
        <div>
          <img src={Logo} className={styles.img} alt="img" />
          <text>{post.creator}</text>
        </div>
        <CloseButton
          onClick={() => {
            dispatch(deletePost(post._id));
          }}
        />
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <span>{post.category}</span>
        </Card.Title>
        <Card.Text>{post.content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;
