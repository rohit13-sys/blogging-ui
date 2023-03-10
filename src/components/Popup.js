import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader } from "reactstrap";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Base from "../components/Base";
import { getPostById } from "../services/post-service";
import { toast } from "react-toastify";
import {
  CardBody,
  CardFooter,
  CardImg,
  CardText,
  Container,
} from "reactstrap";
const Popup = () => {
  const [modal, setModal] = React.useState(false);

  // Toggle for Modal
    const toggle = () => setModal(!modal);
    
     const { postId } = useParams();

     const [post, SetPost] = useState({});

     useEffect(() => {
       getPostById(postId)
         .then((resp) => {
           SetPost(resp);
         })
         .catch((error) => {
           toast.error("Error while Loading Post");
         });
     }, []);
    
    const printDate = (date) => {
      return new Date(date).toLocaleString();
    };

  return (
    <div
     
    >
      <h4>ReactJS Reactstrap Modal Component</h4>
      <Button color="primary" onClick={toggle}>
        Open Modal
      </Button>
      <Modal isOpen={modal} toggle={toggle} modalTransition={{ timeout: 2000 }}>
        <ModalBody>
          <Container>
            <div className="mt-4">
              <Link to="/">Home</Link> /{" "}
              {post && <Link to="">{post.title}</Link>}
            </div>
            <Card className="mt-3 mb-5">
              <CardHeader
                style={{
                  backgroundColor: "aliceblue",
                }}
              >
                <h1>{post.title}</h1>
                <span className="text-muted">
                  {post?.category?.categoryTitle}
                </span>
                <div className="mt-3">
                  Posted by : <b>{post?.user?.name}</b>
                </div>
                <div>
                  Added On : <b>{printDate(post.addedDate)}</b>
                </div>
              </CardHeader>

              <CardBody className="mt -3">
                <CardText dangerouslySetInnerHTML={{ __html: post.content }} />
              </CardBody>
              <CardFooter>
                <i
                  class="fa fa-comments"
                  aria-hidden="true"
                  style={{
                    size: "lg",
                  }}
                ></i>
              </CardFooter>
            </Card>
          </Container>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Popup;
