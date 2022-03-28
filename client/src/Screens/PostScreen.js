import React, { useEffect, useState } from "react";
import ReactFileBase64 from "react-file-base64";
import { Container, Form, Button } from "react-bootstrap";
import styles from "../mystyle.module.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../actions/postActions";

const PostScreen = () => {
  const { fullname } = useSelector((state) => state.user.userData.user);
  const [postData, setPostData] = useState({
    category: "",
    content: "",
    image: "",
    creator: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setPostData({ ...postData, creator: fullname });
  }, []);

  return (
    <>
      <Container className={styles.postContainer}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();

            dispatch(createPost(postData));

            navigate("/");
          }}
        >
          <Form.Group>
            <h2>Vaka Paylaş</h2>
          </Form.Group>
          <Form.Group className={styles.groupStyle}>
            <Form.Label> Kategori</Form.Label>
            <Form.Control
              type="text"
              placeholder="Kategori yaz"
              name="category"
              onChange={(e) =>
                setPostData({ ...postData, category: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className={styles.groupStyle}>
            <Form.Label>İçerik</Form.Label>
            <Form.Control
              type="text"
              placeholder="..."
              name="content"
              rows="3"
              onChange={(e) =>
                setPostData({ ...postData, content: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className={styles.groupStyle}>
            <ReactFileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setPostData({ ...postData, image: base64 });
              }}
            />
          </Form.Group>
          <Button type="submit" block>
            Paylaş
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default PostScreen;
