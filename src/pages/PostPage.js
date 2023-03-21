import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Base from "../components/Base";
import { createComment, getPostById } from "../services/post-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardText,
  Col,
  Container,
  Input,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { BASE_URL } from "../services/helper";
import { getCurrentUser, isLoggedIn } from "../auth";

const PostPage = () => {
  const { postId } = useParams();

  const [post, SetPost] = useState({});
  const [user, SetUser] = useState({});
  const [comment, SetComment] = useState({
    content: "",
  });

  useEffect(() => {
    getPostById(postId)
      .then((resp) => {
        SetPost(resp);
      })
      .catch((error) => {
        toast.error("Error while Loading Post");
      });
  }, []);

  useEffect(() => {
    SetUser(getCurrentUser());
  },[]);



  const printDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const addCommentToPost = (comment, post) => {

    if (!isLoggedIn()) {
      toast.error('Please Login First!!!')
      return; 
    }
    if (comment.content === '') {
      return;
    }
    createComment(comment, post,user.id).then((resp) => {
      SetPost({
        ...post, comments: [...post.comments, resp]
      })
      SetComment({
        content: ''
      });

      toast.success("Comment Added Successfully!!")
    })
      .catch((error)=>toast.error("Some thing wents wrong while adding Comment!!!"));
  };

  return (
    <Base>
      <Container>
        <div className="mt-4">
          <Link to="/">Home</Link> / {post && <Link to="">{post.title}</Link>}
        </div>
        <Card className="mt-3 mb-5">
          <CardHeader
            style={{
              backgroundColor: "aliceblue",
            }}
          >
            <h1>{post.title}</h1>
            <span className="text-muted">{post?.category?.categoryTitle}</span>
            <div className="mt-3">
              Posted by : <b>{post?.user?.name}</b>
            </div>
            <div>
              Added On : <b>{printDate(post.addedDate)}</b>
            </div>
          </CardHeader>
          <CardImg
            src={BASE_URL + "/posts/image/" + post?.id}
            alt="No Image"
            position="top"
            className="p-3"
            style={{maxWidth:'70%'}}
          />
          <CardBody
            className="mt -3"
            style={{
              backgroundColor: "#FEFCFF",
            }}
          >
            <CardText
              className="primary ms-2"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardBody>
        </Card>

        <Row className="mb-4">
          <Col
            md={{
              size: 9,
              offset: 1,
            }}
          >
            <Card
              style={{
                border: "0px",
              }}
            >
              <CardHeader
                style={{
                  backgroundColor: "ghostwhite",
                }}
              >
                <h3>Comments</h3>
              </CardHeader>
              <ListGroup className="border-0">
                {post?.comments &&
                  post.comments.map((c) => {
                    return (
                      <>
                        <ListGroupItem key={c.id}>
                          {c.content}
                          <div className="text-muted ">
                            Commented By {c.commentUser.name} on {c.addedDate}
                          </div>
                        </ListGroupItem>
                      </>
                    );
                  })}
              </ListGroup>
            </Card>

            <Card className="mt-3 border-0">
              <CardBody>
                <Input
                  type="textarea"
                  placeholder="Enter Comments here"
                  value={comment.content}
                  onChange={(event) =>
                    SetComment({ content: event.target.value })
                  }
                />

                <Button
                  className="mt-2"
                  color="primary"
                  outline
                  onClick={() => addCommentToPost(comment, post)}
                >
                  Submit
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;
