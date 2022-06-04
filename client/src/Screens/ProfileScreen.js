import React, { useEffect } from "react";
import { Carousel, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostUser } from "../actions/postActions";
import Post from "../Components/Post";
import Logo from "../images/doktor.jpg";
import styles from "../mystyle.module.css";

const ProfileScreen = () => {
  const { fullname, title, profession, _id, image } = useSelector(
    (state) => state.user.userData.user
  );

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPostUser(_id));
  }, [dispatch]);
  // <img src={Logo} alt="Profile Image" />
  return (
    <article className={styles.profileArticle}>
      <Row className={styles.profileContent}>
        <Col className={styles.profileASideContent}>
          <div className={styles.profileCard}>
            <div className={styles.userImgContainer}>
              <img
                src={image ? image : Logo}
                className={styles.img}
                alt="img"
              />
            </div>
            <span className={styles.userHeadingContent}>
              {title}
              {fullname}
              <span>{profession}</span>
            </span>
          </div>
        </Col>
      </Row>
      {!posts.length ? (
        <Spinner animation="border" />
      ) : (
        <Row>
          <Carousel variant="dark">
            {posts.map((post) => (
              <Carousel.Item>
                <div style={{ height: "25em", textAlign: "left" }}>
                  <Carousel.Caption
                    style={{ textAlign: "left" }}
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
      )}
    </article>
  );
};

export default ProfileScreen;
