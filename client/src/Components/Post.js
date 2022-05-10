import React, { useEffect, useState } from "react";
import styles from "../mystyle.module.css";

import { Card, Button, CloseButton, Modal, Form } from "react-bootstrap";

import { useDispatch } from "react-redux";

import { deletePost } from "../actions/postActions";

import Logo from "../images/Logo.png";

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [typeSelector, setTypeSelector] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    switch (post.type) {
      case "Vaka":
        setTypeSelector("#fd9a8d");
        break;
      case "Medical içerik":
        setTypeSelector("#fead54");
        break;
      case "Metin":
        setTypeSelector("#808080");
        break;
      default:
        break;
    }
  }, []);

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
            <div>
              <text>{post.creator}</text>
              <span>{post.creator}</span>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Card.Title>
            <article>{post.category}</article>
          </Card.Title>
          <Card.Text>{post.content}</Card.Text>
        </Modal.Body>
        <Modal.Body className={styles.postCommentBody}>
          <div>
            <img src={Logo} className={styles.img} alt="img" />
            <text>{post.creator}</text>
          </div>
          <Modal.Body>
            <Card.Text>{post.content}</Card.Text>
          </Modal.Body>
        </Modal.Body>
        <Modal.Body className={styles.postCommentBody}>
          <div>
            <img src={Logo} className={styles.img} alt="img" />
            <text>{post.creator}</text>
          </div>
          <Modal.Body>
            <Card.Text>{post.content}</Card.Text>
          </Modal.Body>
        </Modal.Body>
        <Modal.Body>
          <Form>
            <Form.Group className="" controlId="exampleForm.ControlInput1">
              <Form.Label>Yorum Yaz</Form.Label>
              <Form.Control type="textarea" placeholder="..." />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            İptal
          </Button>
          <Button variant="primary">Gönder</Button>
        </Modal.Footer>
      </Modal>
      <Card
        onClick={handleShow}
        style={{ borderColor: typeSelector }}
        className={styles.postContent}
      >
        <Card.Header className={styles.header}>
          <div>
            <img src={Logo} className={styles.img} alt="img" />
            <div>
              <text>{post.creator}</text>
              <span>{post.creator}</span>
            </div>
          </div>
          <CloseButton
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          />
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <article>{post.category}</article>
          </Card.Title>
          <Card.Text>{post.content}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Post;
