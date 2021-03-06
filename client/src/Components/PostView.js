import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import Post from "./Post";

export const PostViewAll = ({ posts }) => {
  return (
    <div>
      {!posts.length ? (
        <Spinner animation="border" />
      ) : (
        <Row>
          {posts.map((post) => (
            <Col
              sm={12}
              md={12}
              lg={12}
              xl={12}
              className="m-auto"
              key={post._id}
            >
              <Post post={post} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export const PostViewSingle = ({ posts, category }) => {
  return (
    <div>
      {!posts.length ? (
        <Spinner animation="border" />
      ) : (
        <Row>
          {posts.reverse().map((post) =>
            post.category !== category ? undefined : (
              <Col
                sm={12}
                md={12}
                lg={12}
                xl={12}
                className="m-auto"
                key={post._id}
              >
                <Post post={post} />
              </Col>
            )
          )}
        </Row>
      )}
    </div>
  );
};

export const PostSingle = ({ posts, category }) => {
  return (
    <div>
      {category == "Hepsi" ? (
        <Row>
          {
            <Col
              sm={12}
              md={12}
              lg={12}
              xl={12}
              className="m-auto"
              key={posts._id}
            >
              <Post post={posts} />
            </Col>
          }
        </Row>
      ) : (
        <Row>
          {posts.category !== category ? undefined : (
            <Col
              sm={12}
              md={12}
              lg={12}
              xl={12}
              className="m-auto"
              key={posts._id}
            >
              <Post post={posts} />
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};
