import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  CardBody,
  Col,
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardHeader,
} from "reactstrap";
const Post = ( post ) => {
  return (
    <>
      <Col size="5">
        <Card
          className="m-3 "
          style={{
            backgroundColor: "aliceblue",
          }}
        >
          <CardImg
            src="https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png"
            alt="..."
            position="top"
            className="p-3"
          />
          <Card className="shadow rounded-0">
            <CardBody>
              <h2>{post.post.title}</h2>

              <CardText>
                {post.post.description.substring(0,100)}
              </CardText>
              <Link
                className="btn btn-outline-secondary"
                to={"/post/" + post.post.id}
              >
                Read More...
              </Link>
            </CardBody>
          </Card>
        </Card>
      </Col>
    </>
  );
};

export default Post;
