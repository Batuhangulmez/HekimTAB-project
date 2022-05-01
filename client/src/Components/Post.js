import React, { useState } from "react";
import styles from "../mystyle.module.css";

import { Card, Button, CloseButton, Modal } from "react-bootstrap";

import { useDispatch } from "react-redux";

import { deletePost } from "../actions/postActions";

import Logo from "../images/Logo.png";

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={styles.postContent}
      >
        <Modal.Header closeButton className={styles.header}>
          <div>
            <img src={Logo} className={styles.img} alt="img" />
            <text>{post.creator}</text>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Card.Title>
            <span>{post.category}</span>
          </Card.Title>
          <Card.Text>{post.content}</Card.Text>
        </Modal.Body>
        <Modal.Body className={styles.postCommetBody}>
          <div>
            <img src={Logo} className={styles.img} alt="img" />
            <text>{post.creator}</text>
          </div>
          <Modal.Body>
            <Card.Text>{post.content}</Card.Text>
          </Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>

      <Card onClick={handleShow} className={styles.postContent}>
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
    </>
  );
};

export default Post;
