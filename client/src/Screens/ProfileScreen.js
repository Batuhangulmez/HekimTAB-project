import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../images/Logo.png";
import styles from "../mystyle.module.css";

const ProfileScreen = () => {
  const { fullName, title, profession } = {
    fullName: "Batuhan Gülmez",
    title: "Uzm. Dr.",
    profession: "Kardiyoloji",
    image: "../images/Logo.png",
  };
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
    </article>
  );
};

export default ProfileScreen;
