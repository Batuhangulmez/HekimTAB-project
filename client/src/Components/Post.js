import React from "react";
import { Card, Button } from "react-bootstrap";

const Post = ({ post }) => {
  return (
    <Card>
      <Card.Header>
        {post.creator}
        <Button>X</Button>
      </Card.Header>
      <Card.Body>
        <Card.Title>{post.category}</Card.Title>
        <Card.Text>{post.content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;
