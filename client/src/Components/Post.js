import React from "react";
import { Card, Button } from "react-bootstrap";

import { useDispatch } from "react-redux";

import { deletePost } from "../actions/postActions";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  return (
    <Card>
      <Card.Header>
        {post.creator}
        <Button
          onClick={() => {
            dispatch(deletePost(post._id));
          }}
        >
          X
        </Button>
      </Card.Header>
      <Card.Body>
        <Card.Title>{post.category}</Card.Title>
        <Card.Text>{post.content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;
