import React, { useEffect } from "react";
import { Carousel, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../actions/postActions";
import Post from "../Components/Post";
import Logo from "../images/Logo.png";
import styles from "../mystyle.module.css";

const ProfileScreen = () => {
  const { fullName, title, profession } = {
    fullName: "Batuhan Gülmez",
    title: "Uzm. Dr.",
    profession: "Kardiyoloji",
    image: "../images/Logo.png",
  };

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  // <img src={Logo} alt="Profile Image" />
  return (
    <article className={styles.profileArticle}>
      <Row className={styles.profileContent}>
        <Col md={4} className={styles.profileASideContent}>
          <div className={styles.profileCard}>
            <div className={styles.userImgContainer}>
              <img src={Logo} className={styles.img} alt="img" />
            </div>
            <span className={styles.userHeadingContent}>
              {title}
              {fullName}
              <span>{profession}</span>
            </span>
          </div>
        </Col>
        <Col md={8} className={styles.profileBSideContent}>
          <Row style={{ width: "100%" }}>
            <Col sd={4}>
              <Link to="/post" className={styles.shareCard}>
                <div className={styles.icon}>1</div>
                <div className={styles.text}>Metin Paylaş</div>
              </Link>
            </Col>
            <Col sd={4}>
              <div className={styles.shareCard}>
                <div className={styles.icon}>2</div>
                <div className={styles.text}>Vaka Paylaş</div>
              </div>
            </Col>
            <Col sd={4}>
              <div className={styles.shareCard}>
                <div className={styles.icon}>3</div>
                <div className={styles.text}>Medikal İçerik Paylaş</div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      {!posts.length ? (
        <Spinner animation="border" />
      ) : (
        <Row>
          <Carousel variant="dark">
            {posts.map((post) => (
              <Carousel.Item>
                <div style={{ height: "250px" }} />
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
              </Carousel.Item>
            ))}
          </Carousel>
        </Row>
      )}
    </article>
  );
};

export default ProfileScreen;
