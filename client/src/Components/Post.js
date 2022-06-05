import React, { useEffect, useState } from "react";
import styles from "../mystyle.module.css";
import { FiMessageSquare } from "react-icons/fi";

import { Card, Button, CloseButton, Modal, Form } from "react-bootstrap";

import { useDispatch } from "react-redux";

import {
  deleteComment,
  deletePost,
  fetchPosts,
  fetchPostUser,
  pushComment,
} from "../actions/postActions";

import Logo from "../images/doktor.jpg";
import KadınDoktor from "../images/doktor kadın.png";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../actions/userActions";

import Moment from "react-moment";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [typeSelector, setTypeSelector] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { fullname, _id, title, profession, image } = JSON.parse(
    localStorage.getItem("user")
  ).user;

  const [comment, setComment] = useState({
    creatorId: "",
    body: "",
    title: "",
    creatorName: "",
    profession: "",
    cretorİmage: "",
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
      profession: profession,
      cretorİmage: image,
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
            <img
              src={post.creatorİmage ? post.creatorİmage : Logo}
              className={styles.img}
              alt="img"
            />
            <div>
              <text>
                {post.creatorTitle}
                {post.creator}
              </text>
              <span>{post.creatorProfession}</span>
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
                <img
                  src={comment.cretorİmage ? comment.cretorİmage : KadınDoktor}
                  className={styles.img}
                  alt="img"
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <text>
                    {comment.title} {comment.creatorName}
                  </text>
                  <span>{comment.profession}</span>
                </div>
              </div>
              {_id == comment.creatorId ? (
                <div>
                  <CloseButton
                    onClick={(e) => {
                      dispatch(deleteComment(post._id, comment._id));
                      handleClose();
                      window.location.reload();
                    }}
                  />
                </div>
              ) : undefined}
            </div>
            <Modal.Body style={{ paddingBottom: "1px" }}>
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
        style={{ borderColor: typeSelector, zIndex: 0 }}
        className={styles.postContent}
      >
        <Card.Header className={styles.header}>
          <div>
            <img
              src={post.creatorİmage ? post.creatorİmage : Logo}
              className={styles.img}
              alt="img"
            />
            <div
              onClick={() => {
                dispatch(fetchPostUser(post.creatorId));
                dispatch(fetchUserInfo(post.creatorId));
                navigate(`/userInfo/:${post.creatorId}`);
              }}
            >
              <text>
                {post.creatorTitle} {post.creator}
              </text>
              <span>{post.creatorProfession}</span>
            </div>
          </div>
          <div>
            {_id == post.creatorId ? (
              <div style={{ zIndex: 1 }}>
                <CloseButton
                  onClick={() => {
                    dispatch(deletePost(post._id));
                  }}
                />
              </div>
            ) : undefined}
          </div>
        </Card.Header>
        <Card.Body onClick={handleShow}>
          <Card.Title
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <article>{post.category}</article>
            <Moment
              style={{ fontSize: "0.7em", color: "gray" }}
              format="YYYY/MM/DD"
            >
              {post.createdAt}
            </Moment>
          </Card.Title>
          <Card.Text>{post.content}</Card.Text>
        </Card.Body>
        {post.image ? (
          <Card.Img
            className={styles.cardimg}
            variant="top"
            src={post.image}
          ></Card.Img>
        ) : undefined}
        <Card.Footer
          style={{
            backgroundColor: "white",
            paddingBottom: "5px",
            paddingTop: "5px",
          }}
        >
          <div onClick={handleShow} className={styles.messageIcon}>
            <FiMessageSquare fontSize="1.4em" />
          </div>
        </Card.Footer>
      </Card>
    </>
  );
};

export default Post;
