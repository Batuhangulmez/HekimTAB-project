import React, { useEffect } from "react";
import { Carousel, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchPostUser } from "../actions/postActions";
import { fetchUserInfo } from "../actions/userActions";
import Post from "../Components/Post";
import Logo from "../images/Logo.png";
import styles from "../mystyle.module.css";

const UserScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  let params = useParams();
  const getİnfo = async (id) => {
    await dispatch(fetchPostUser(params.id));
    await dispatch(fetchUserInfo(params.id));
  };

  const user = useSelector((state) => state.user.infoUser);

  //const posts = useSelector((state) => state.posts);

  useEffect(async () => {
    getİnfo();
  }, [params.id]);

  return (
    <>
      <div>asdas{!!user.title ? user.title : "b"} </div>
      {/* {!posts.length ? (
        <Spinner animation="border" />
      ) : (
        <article className={styles.profileArticle}>
          <Row className={styles.profileContent}>
            <Col className={styles.profileASideContent}>
              <div className={styles.profileCard}>
                <div className={styles.userImgContainer}>
                  <img src={Logo} className={styles.img} alt="img" />
                </div>
                <span className={styles.userHeadingContent}>
                  {!!user.title ? user.title : "asdasd"}
                  {!!user.fullname ? user.title : "asdasd"}
                  <span>{!!user.profession ? user.title : "asdasd"}</span>
                </span>
              </div>
            </Col>
          </Row>
          <Row>
            <Carousel variant="dark">
              {posts.map((post) => (
                <Carousel.Item>
                  <div style={{ minHeight: "300px" }}>
                    <Carousel.Caption
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      className="m-auto"
                      key={post._id}
                    >
                      <Post post={post} />
                    </Carousel.Caption>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Row>
        </article>
      )} */}
    </>
  );
};

export default UserScreen;
