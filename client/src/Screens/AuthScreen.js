import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { signUp, Login } from "../actions/userActions";

import Message from "../Components/Message.js";

import Logo from "../images/Logo.png";
import styles from "../mystyle.module.css";

const myStyle = {
  groupStyle: "flex ",
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

  const dispatch = useDispatch();

  return (
    <>
      <Container className={styles.authContainer}>
        <div className={styles.logoContainer}>
          <img src={Logo} alt=" Logo" className={styles.Logo} />
        </div>
        <Row className={styles.rowStyle}>
          <Col xs={12} md={6}>
            {login ? (
              <Form
                className={styles.formStyle}
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

                <h2>Giriş Yap</h2>
                {error && <Message>{error}</Message>}
                <Form.Group className={styles.groupStyle}>
                  <Form.Label> Email</Form.Label>
                  <Form.Control
                    className={styles.controlStyle}
                    type="email"
                    placeholder="Email Adresi"
                    name="email"
                    onChange={(e) =>
                      setLoginform({ ...loginform, email: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className={styles.groupStyle}>
                  <Form.Label>Şifre</Form.Label>
                  <Form.Control
                    className={styles.controlStyle}
                    type="password"
                    placeholder="Şifre"
                    name="password"
                    onChange={(e) =>
                      setLoginform({ ...loginform, password: e.target.value })
                    }
                  />
                </Form.Group>
                <Button className="button" type="submit">
                  giriş yap
                </Button>
                <Form.Group className={styles.lastGroupStyle}>
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
                className={styles.formStyle}
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(signUp(form));
                }}
              >
                <h2 className={styles.h2Style}>Kayıt ol</h2>
                {error && <Message>{error}</Message>}

                <Form.Group style={{ display: "flex" }}>
                  <Form.Control
                    className={styles.controlStyle}
                    type="text"
                    placeholder="İlk adınız"
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                  ></Form.Control>

                  <Form.Control
                    className={styles.controlStyle}
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
                    className={styles.controlStyle}
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
                    className={styles.controlStyle}
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
                    className={styles.controlStyle}
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
                <Form.Group className={styles.lastGroupStyle}>
                  <Form.Label>
                    Zaten bir hesabınız var mı?{" "}
                    <span
                      onClick={(e) => setLogin(!false)}
                      style={{ fontWeight: "bold", cursor: "pointer" }}
                    >
                      Giriş yapın
                    </span>
                  </Form.Label>
                </Form.Group>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AuthScreen;
