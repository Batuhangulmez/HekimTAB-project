import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { login } from "../axiox";
import { useNavigate } from "react-router-dom";

const AuthScreen = ({ setUser }) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);

  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <Container className="authContainer">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            {login ? (
              <Form className="align-content-center mt-3">
                <form
                  className="form"
                  onSubmit={(e) => {
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
                  }}
                >
                  <h2>Giriş Yap</h2>
                  <Form.Group>
                    <Form.Label> Email</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Email Adresi"
                      name="email"
                      onChange={(e) =>
                        setFormData({ ...FormData, email: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Şifre</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Şifre"
                      name="password"
                      onChange={(e) =>
                        setFormData({ ...FormData, password: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Control type="Submit" value="Giriş Yap" />
                  <Form.Group>
                    <Form.Label className="Form.GroupText">
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
                </form>
              </Form>
            ) : (
              <Form className="align-content-center mt-3">
                <h1 className="text-center mb-3">Kayıt ol</h1>

                <Form.Group style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    placeholder="İlk adınız"
                    className="mr-2"
                  ></Form.Control>

                  <Form.Control
                    type="text"
                    placeholder="Soy adınız"
                    className="ml-2"
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email adresinizi girin"
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Şifre</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Şifrenizi girin"
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Şifrenizi doğrulayın</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Şifrenizi doğrulayın"
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
