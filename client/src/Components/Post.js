import React, { useEffect, useState } from "react";
import styles from "../mystyle.module.css";

import { Card, Button, CloseButton, Modal, Form } from "react-bootstrap";

import { useDispatch } from "react-redux";

import {
  deleteComment,
  deletePost,
  fetchPosts,
  pushComment,
} from "../actions/postActions";

import Logo from "../images/Logo.png";

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [typeSelector, setTypeSelector] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { fullname, _id, title } = JSON.parse(
    localStorage.getItem("user")
  ).user;

  const [comment, setComment] = useState({
    creatorId: "",
    body: "",
    title: "",
    creatorName: "",
  });

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
    getCommentContent();
  }, []);

  const getCommentContent = async () => {
    setComment({
      creatorId: _id,
      title: title,
      creatorName: fullname,
    });
  };
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
              <text>Uzm. Dr.{post.creator}</text>
              <span>Kardiyoloji</span>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Card.Title>
            <article>{post.category}</article>
          </Card.Title>
          <Card.Text>{post.content}</Card.Text>
        </Modal.Body>
        {post.comments.map((comment) => (
          <Modal.Body className={styles.postCommentBody}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex" }}>
                <img src={Logo} className={styles.img} alt="img" />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <text>
                    {comment.title} {comment.creatorName}
                  </text>
                  <span>Ortodonti</span>
                </div>
              </div>
              {_id == post.creatorId ? (
                <CloseButton
                  onClick={(e) => {
                    dispatch(deleteComment(post._id, comment._id));
                    handleClose();
                    window.location.reload();
                  }}
                />
              ) : undefined}
            </div>
            <Modal.Body>
              <Card.Text>{comment.body}</Card.Text>
            </Modal.Body>
          </Modal.Body>
        ))}

        <Modal.Body>
          <Form
            onSubmit={async (e) => {
              dispatch(pushComment(post._id, comment));
              dispatch(fetchPosts());
            }}
          >
            <Form.Group className="" controlId="exampleForm.ControlInput1">
              <Form.Label>Yorum Yaz</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="..."
                onChange={(e) =>
                  setComment({ ...comment, body: e.target.value })
                }
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                İptal
              </Button>
              <Button variant="primary" type="submit">
                Gönder
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
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
              <text>Uzm. Dr. {post.creator}</text>
              <span>Kardiyoloji</span>
            </div>
          </div>
          {_id == post.creatorId ? (
            <CloseButton
              onClick={() => {
                dispatch(deletePost(post._id));
              }}
            />
          ) : undefined}
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
