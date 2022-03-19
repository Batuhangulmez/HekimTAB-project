import React, { useState } from "react";
import ReactFileBase64 from "react-file-base64";
import { Container, Form, Button } from "react-bootstrap";
import styles from "../mystyle.module.css";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPost } from "../actions/postActions";

const PostScreen = () => {
  const [postData, setPostData] = useState({
    category: "",
    content: "",
    image: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();

          dispatch(createPost(postData));

          navigate("/");
        }}
      >
        <Form.Group>
          <h1>Vaka Paylaş</h1>
        </Form.Group>
        <Form.Group>
          <Form.Label> Kategori</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Kategori yaz"
            name="category"
            onChange={(e) =>
              setPostData({ ...postData, category: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group>
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

        <Form.Group>
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
    </>
  );
};

export default PostScreen;
