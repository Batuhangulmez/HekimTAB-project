import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { signUp, Login } from "../actions/userActions";

import { useNavigate } from "react-router-dom";
import Message from "../Components/Message.js";

const myStyle = {
  rowStyle: "justify-content-center",
  formStyle: "align-content-center mt-3",
  controlStyle: "mb-2",
  h2Style: "text-center mb-3",
};

const AuthScreen = () => {
  const userState = useSelector((state) => state.user);
  const { error } = userState;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginform, setLoginform] = useState({
    email: "",
    password: "",
  });
  const [login, setLogin] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Container className="authContainer">
        <Row className={myStyle.rowStyle}>
          <Col xs={12} md={6}>
            {login ? (
              <Form
                className={myStyle.formStyle}
                onSubmit={(e) => {
                  e.preventDefault();

                  dispatch(Login(loginform));
                }}
              >
                {/* onSubmit={(e) => {
                    e.preventDefault();

                    login(FormData)
                      .then((res) => {
                        localStorage.setItem(
                          "user",
                          JSON.stringify(res.data.user)
                        );
                        setUser(res.data.user);
                        navigate("/");
                      })
                      .catch((err) => {
                        console.log(err.response.data.message);
                      });
                  }} */}

                <h2 className={myStyle.h2Style}>Giriş Yap</h2>
                {error && <Message>{error}</Message>}
                <Form.Group>
                  <Form.Label> Email</Form.Label>
                  <Form.Control
                    className={myStyle.controlStyle}
                    type="email"
                    placeholder="Email Adresi"
                    name="email"
                    onChange={(e) =>
                      setLoginform({ ...loginform, email: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Şifre</Form.Label>
                  <Form.Control
                    className={myStyle.controlStyle}
                    type="password"
                    placeholder="Şifre"
                    name="password"
                    onChange={(e) =>
                      setLoginform({ ...loginform, password: e.target.value })
                    }
                  />
                </Form.Group>
                <Button block type="submit">
                  giriş yap
                </Button>
                <Form.Group>
                  <Form.Label>
                    Henüz bir hesabın yok mu ?{" "}
                    <span
                      style={{ fontWeight: "bold", cursor: "pointer" }}
                      onClick={(e) => setLogin(!login)}
                    >
                      {" "}
                      Hesap oluştur
                    </span>
                  </Form.Label>
                </Form.Group>
              </Form>
            ) : (
              <Form
                className={myStyle.controlStyle}
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(signUp(form));
                }}
              >
                <h2 className={myStyle.h2Style}>Kayıt ol</h2>
                {error && <Message>{error}</Message>}

                <Form.Group style={{ display: "flex" }}>
                  <Form.Control
                    className="m-2"
                    type="text"
                    placeholder="İlk adınız"
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                  ></Form.Control>

                  <Form.Control
                    className="m-2"
                    type="text"
                    placeholder="Soy adınız"
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className={myStyle.controlStyle}
                    type="email"
                    placeholder="Email adresinizi girin"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Şifre</Form.Label>
                  <Form.Control
                    className={myStyle.controlStyle}
                    type="password"
                    placeholder="Şifrenizi girin"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Şifrenizi doğrulayın</Form.Label>
                  <Form.Control
                    className={myStyle.controlStyle}
                    type="password"
                    placeholder="Şifrenizi doğrulayın"
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>

                <Button block type="submit">
                  Kayıt ol
                </Button>

                <Form.Text as="large" className="text-center mt-2">
                  Zaten bir hesabınız var mı?{" "}
                  <span
                    onClick={(e) => setLogin(!false)}
                    style={{ fontWeight: "bold", cursor: "pointer" }}
                  >
                    Giriş yapın
                  </span>
                </Form.Text>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AuthScreen;
