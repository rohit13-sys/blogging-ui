import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Base from "../components/Base";
import {
  createComment,
  getPostById,
  storeLikeCounts,
} from "../services/post-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
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
import '../css/likestyles.css';

const PostPage = () => {
  const { postId } = useParams();

  const [post, SetPost] = useState({});
  const [isLoaded, SetIsLoaded] = useState(false);
  const [user, SetUser] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const [activeBtn, setActiveBtn] = useState("none");
  const [comment, SetComment] = useState({
    content: "",
  });

  // Very first time
  useEffect(() => {
    SetIsLoaded(true);
    getPostById(postId)
      .then((resp) => {
        console.log(resp);
        SetPost(resp);
        setLikeCount(resp.likeCounts);
        setDislikeCount(resp.dislikeCounts ? resp.dislikeCounts : 0);
      })
      .catch((error) => {
        toast.error("Error while Loading Post");
      });
  }, []);

  useEffect(() => {
    SetUser(getCurrentUser());
  }, []);

  const printDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const addCommentToPost = (comment, post) => {
    if (!isLoggedIn()) {
      toast.error("Please Login First!!!");
      return;
    }
    if (comment.content === "") {
      return;
    }
    createComment(comment, post, user.id)
      .then((resp) => {
        SetPost({
          ...post,
          comments: [...post.comments, resp],
        });
        SetComment({
          content: "",
        });

        toast.success("Comment Added Successfully!!");
      })
      .catch((error) =>
        toast.error("Some thing wents wrong while adding Comment!!!")
      );
  };
  // Imporant
  useEffect(() => {
    if (isLoaded) {
      console.log("likes : " + likeCount);
      console.log("dislikes : " + dislikeCount);
      if (isLoggedIn()) {
        storeLikeCounts(postId, likeCount, dislikeCount)
          .then((resp) => {
            getPostById(postId)
              .then((resp) => {
                SetPost(resp);
              })
              .catch((error) => {
                toast.error("Error while Loading Post");
              });
          })
          .catch((error) =>
            toast.error("something wrong occurred while like in post")
          );
      }
    }
  }, [likeCount,dislikeCount]);

  // const handleClick = () => {
  //   console.log("hiiii");
  //   if (!isClicked) {
  //     console.log("liked");
  //     SetLikes((like) => like + 1);
  //     setIsClicked(true);
  //   } else {
  //     console.log("unliked");
  //     SetLikes((like) => like - 1);
  //     setIsClicked(false);
  //   }
  // };

  const handleLikeClick = () => {
    if (isLoggedIn()) {
      if (activeBtn === "none") {
        setLikeCount(likeCount + 1);
        setActiveBtn("like");
        return;
      }

      if (activeBtn === "like") {
        setLikeCount(likeCount - 1);
        setActiveBtn("none");
        return;
      }

      if (activeBtn === "dislike") {
        setLikeCount(likeCount + 1);
        setDislikeCount(dislikeCount - 1);
        setActiveBtn("like");
      }
    } else {
      toast.error('please Login first')
    }
  };

  const handleDisikeClick = () => {
    if (isLoggedIn()) {
      if (activeBtn === "none") {
        setDislikeCount(dislikeCount + 1);
        setActiveBtn("dislike");
        return;
      }

      if (activeBtn === "dislike") {
        setDislikeCount(dislikeCount - 1);
        setActiveBtn("none");
        return;
      }

      if (activeBtn === "like") {
        setDislikeCount(dislikeCount + 1);
        setLikeCount(likeCount - 1);
        setActiveBtn("dislike");
      }
    } else {
      toast.error('Please login first');
    }
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
            style={{ maxWidth: "70%" }}
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
          <CardFooter>
            {" "}
            <div className="like-container">
              <div className="btn-container">
                <button
                  className={`likebtn ${
                    activeBtn === "like" ? "like-active" : ""
                  }`}
                  onClick={handleLikeClick}
                >
                  <span className="material-symbols-rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-hand-thumbs-up-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                    </svg>
                  </span>
                  {likeCount}
                </button>

                <button
                  className={`likebtn ${
                    activeBtn === "dislike" ? "dislike-active" : ""
                  }`}
                  onClick={handleDisikeClick}
                >
                  <span className="material-symbols-rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-hand-thumbs-down-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z" />
                    </svg>
                  </span>
                  {dislikeCount}
                </button>
              </div>
            </div>
          </CardFooter>
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
