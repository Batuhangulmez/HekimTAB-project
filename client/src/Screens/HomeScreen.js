import React, { useEffect, useState } from "react";
import styles from "../mystyle.module.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../actions/postActions";

import { Spinner, Row, Col, Tabs, Tab, Nav } from "react-bootstrap";
import { PostViewAll, PostViewSingle } from "../Components/PostView";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const [currentType, setCurrentType] = useState("Hepsi");
  const [currentCategory, setCurrentCategory] = useState("Hepsi");

  const [postMetin, setPostMetin] = useState([]);
  const [postCase, setPostCase] = useState([]);
  const [postMedical, setPostMedical] = useState([]);

  useEffect(async () => {
    await dispatch(fetchPosts());
    filterPosts(posts);
  }, [dispatch]);

  const filterPosts = (posts) => {
    setPostMetin(
      posts.filter((item) => {
        return item.type === "Metin";
      })
    );
    setPostCase(
      posts.filter((item) => {
        return item.type === "Vaka";
      })
    );
    setPostMedical(
      posts.filter((item) => {
        return item.type === "Medical içerik";
      })
    );
  };
  return (
    <main className={styles.homeContainer}>
      <h1></h1>
      <Tabs
        id="controlled-tab-example"
        activeKey={currentType}
        onSelect={(k) => setCurrentType(k)}
        className=" mb-3 justify-content-center"
      >
        <Tab disabled title="İçerik Türü"></Tab>
        <Tab eventKey="Hepsi" title="Hepsi">
          <Tab.Container
            id="left-tabs-example"
            activeKey={currentCategory}
            onSelect={(k) => setCurrentCategory(k)}
          >
            <Row>
              <Col sm={3}>
                <Nav className={styles.homeCategoryNav}>
                  <Nav.Item disabled className={styles.categoryTitle}>
                    Kategoriler
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link className={styles.NavItem} eventKey="Hepsi">
                      Hepsi
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link
                      className={styles.NavItem}
                      eventKey="Ağız,Çene ve Diş Sağlığı"
                    >
                      Ağız,Çene ve Diş Sağlığı
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link
                      className={styles.NavItem}
                      eventKey="Beslenme ve Diyet"
                    >
                      Beslenme ve Diyet
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link className={styles.NavItem} eventKey="Cildiye">
                      Cildiye
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link
                      className={styles.NavItem}
                      eventKey="Göz Hastalıkları"
                    >
                      Göz Hastalıkları
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link className={styles.NavItem} eventKey="Kardiyoloji">
                      Kardiyoloji
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link className={styles.NavItem} eventKey="Ortodonti">
                      Ortodonti
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="Hepsi">
                    <PostViewAll posts={posts} />
                  </Tab.Pane>
                  <PostViewSingle posts={posts} category={currentCategory} />
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Tab>
        <Tab eventKey="Metin" title="Metin">
          <Tab.Container
            id="left-tabs-example"
            activeKey={currentCategory}
            onSelect={(k) => setCurrentCategory(k)}
          >
            <Row>
              <Col sm={3}>
                <Nav className={styles.homeCategoryNav}>
                  <Nav.Item disabled className={styles.categoryTitle}>
                    Kategoriler
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link className={styles.NavItem} eventKey="Hepsi">
                      Hepsi
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link
                      className={styles.NavItem}
                      eventKey="Ağız,Çene ve Diş Sağlığı"
                    >
                      Ağız,Çene ve Diş Sağlığı
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link
                      className={styles.NavItem}
                      eventKey="Beslenme ve Diyet"
                    >
                      Beslenme ve Diyet
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link className={styles.NavItem} eventKey="Cildiye">
                      Cildiye
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link
                      className={styles.NavItem}
                      eventKey="Göz Hastalıkları"
                    >
                      Göz Hastalıkları
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link className={styles.NavItem} eventKey="Kardiyoloji">
                      Kardiyoloji
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link className={styles.NavItem} eventKey="Ortodonti">
                      Ortodonti
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="Hepsi">
                    <PostViewAll posts={postMetin} />
                  </Tab.Pane>
                  <PostViewSingle
                    posts={postMetin}
                    category={currentCategory}
                  />
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Tab>
        <Tab eventKey="Vaka" title="Vaka">
          <Tab.Container
            id="left-tabs-example"
            activeKey={currentCategory}
            onSelect={(k) => setCurrentCategory(k)}
          >
            <Row>
              <Col sm={3}>
                <Nav className={styles.homeCategoryNav}>
                  <Nav.Item disabled className={styles.categoryTitle}>
                    Kategoriler
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link className={styles.NavItem} eventKey="Hepsi">
                      Hepsi
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link
                      className={styles.NavItem}
                      eventKey="Ağız,Çene ve Diş Sağlığı"
                    >
                      Ağız,Çene ve Diş Sağlığı
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link
                      className={styles.NavItem}
                      eventKey="Beslenme ve Diyet"
                    >
                      Beslenme ve Diyet
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link className={styles.NavItem} eventKey="Cildiye">
                      Cildiye
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link
                      className={styles.NavItem}
                      eventKey="Göz Hastalıkları"
                    >
                      Göz Hastalıkları
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link className={styles.NavItem} eventKey="Kardiyoloji">
                      Kardiyoloji
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link className={styles.NavItem} eventKey="Ortodonti">
                      Ortodonti
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="Hepsi">
                    <PostViewAll posts={postCase} />
                  </Tab.Pane>
                  <PostViewSingle posts={postCase} category={currentCategory} />
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Tab>
        <Tab eventKey="Medical içerik" title="Medical İçerik">
          <Tab.Container
            id="left-tabs-example"
            activeKey={currentCategory}
            onSelect={(k) => setCurrentCategory(k)}
          >
            <Row>
              <Col sm={3}>
                <Nav className={styles.homeCategoryNav}>
                  <Nav.Item disabled className={styles.categoryTitle}>
                    Kategoriler
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link className={styles.NavItem} eventKey="Hepsi">
                      Hepsi
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link
                      className={styles.NavItem}
                      eventKey="Ağız,Çene ve Diş Sağlığı"
                    >
                      Ağız,Çene ve Diş Sağlığı
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link
                      className={styles.NavItem}
                      eventKey="Beslenme ve Diyet"
                    >
                      Beslenme ve Diyet
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link className={styles.NavItem} eventKey="Cildiye">
                      Cildiye
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link
                      className={styles.NavItem}
                      eventKey="Göz Hastalıkları"
                    >
                      Göz Hastalıkları
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link className={styles.NavItem} eventKey="Kardiyoloji">
                      Kardiyoloji
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.NavBorder}>
                    <Nav.Link className={styles.NavItem} eventKey="Ortodonti">
                      Ortodonti
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="Hepsi">
                    <PostViewAll posts={postMedical} />
                  </Tab.Pane>
                  <PostViewSingle
                    posts={postMedical}
                    category={currentCategory}
                  />
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Tab>
      </Tabs>
    </main>
  );
};

export default HomeScreen;
