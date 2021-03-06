import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ReactFileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    profession: "",
    title: "",
    image: "",
  });

  const [loginform, setLoginform] = useState({
    email: "",
    password: "",
  });
  const [login, setLogin] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginSubmit = async (id) => {
    await dispatch(Login(loginform));
  };
  const signUpSubmit = async () => {
    await dispatch(signUp(form));
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [userState]);

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
                  loginSubmit();
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
                  signUpSubmit();
                }}
              >
                <h2 className={styles.h2Style}>Kayıt ol</h2>
                {error && <Message>{error}</Message>}
                <Form.Group
                  style={{
                    display: "flex",
                    marginBottom: "12px",
                  }}
                >
                  <Form.Group style={{ flex: 1 }}>
                    <Form.Label> Uzmanlık Alanı</Form.Label>
                    <Form.Select
                      onChange={(e) =>
                        setForm({ ...form, profession: e.target.value })
                      }
                      name="profession"
                    >
                      <option>Kategori Seçiniz</option>
                      <option value="Ağız,Çene ve Diş Sağlığı">
                        Ağız,Çene ve Diş Sağlığı
                      </option>
                      <option value="Beslenme ve Diyet">
                        Beslenme ve Diyet
                      </option>
                      <option value="Cildiye">Cildiye</option>
                      <option value="Göz Hastalıkları">Göz Hastalıkları</option>
                      <option value="Kardiyoloji">Kardiyoloji</option>
                      <option value="Ortodonti">Ortodonti</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group style={{ flex: 1 }}>
                    <Form.Label>Ünvan</Form.Label>
                    <Form.Select
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      name="title"
                    >
                      <option>Kategori Seçiniz</option>
                      <option value="Prof. Dr.">Prof. Dr. </option>
                      <option value="Doç. Dr.">Doç. Dr.</option>
                      <option value="Dr. Öğr. Üyesi">Dr. Öğr. Üyesi</option>
                      <option value="Yrd. Doç.">Yrd. Doç.</option>
                      <option value="Op. Dr.">Op. Dr.</option>
                      <option value="Uzm. Dr.">Uzm. Dr.</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Stajyer Dr.">Stajyer Dr.</option>
                    </Form.Select>
                  </Form.Group>
                </Form.Group>

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
                <Form.Group
                  style={{ marginBottom: "12px" }}
                  className={styles.groupStyle}
                >
                  <Form.Label>Profil Fotoğrafı</Form.Label>
                  <div>
                    <ReactFileBase64
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) => {
                        setForm({ ...form, image: base64 });
                      }}
                    />
                  </div>
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
