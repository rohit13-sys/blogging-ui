import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
import { DoLogout, getCurrentUser, isLoggedIn } from "../auth";
import { BASE_URL } from "../services/helper";
import { deletePostById } from "../services/post-service";
import { Navigate } from "react-router-dom";
import userContext from "../context/userContext";
import { MDBRipple } from "mdb-react-ui-kit";

const Post = (post) => {
  const userContextData = useContext(userContext);
  const [user, SetUser] = useState(null);
  const [logged, SetLogged] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    SetUser(getCurrentUser());
    SetLogged(isLoggedIn());
  }, []);

  const deletePost = (post) => {
    deletePostById(post?.id)
      .then((resp) => {
        toast.success("Post Deleted Successfully");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error.response.status);
        DoLogout();
        userContextData.SetUSer({
          data: {},
          login: false,
        });
        window.location.reload(true);
        toast.error("Please Login!!!");
      });
  };


  // const updatePost = (post) => {
  //   deletePostById(post?.id)
  //     .then((resp) => {
  //       toast.success("Post Deleted Successfully");
  //       window.location.reload(true);
  //     })
  //     .catch((error) => {
  //       console.log(error.response.status);
  //       doLogout();
  //       userContextData.SetUSer({
  //         data: {},
  //         login: false,
  //       });
  //       window.location.reload(true);
  //       toast.error("Please Login!!!");
  //     });
  // };

  return (
    <>
      <Col md={4}>
        <Card
          className="m-3 hover-shadow"
          style={{
            backgroundColor: "aliceblue",
          }}
        >
          <CardImg
            src={BASE_URL + "/posts/image/" + post?.post?.id}
            alt="No Image"
            position="top"
            className="p-3 "
          />

          <Card className="shadow rounded-0">
            <CardBody>
              
               {post?.post?.title}
              

              <CardText>{post?.post?.description.substring(0, 100)}</CardText>
              <Link
                className="btn btn-outline-secondary"
                to={"/post/" + post?.post?.id}
              >
                Read More...
              </Link>

              {userContextData?.user?.login ? (
                user?.id == post?.post?.user.id ? (
                  <Link
                    className="btn btn-outline-danger ms-3"
                    onClick={() => deletePost(post?.post)}
                  >
                    Delete
                  </Link>
                ) : (
                  ""
                )
              ) : (
                ""
              )}

              {userContextData?.user?.login ? (
                user?.id == post?.post?.user.id ? (
                  <Link
                    className="btn btn-outline-warning m-3"
                    to={`/user/updatepost/${post?.post?.id}`}
                    // onClick={() => updatePost(post?.post)}
                  >
                    Update
                  </Link>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </CardBody>
          </Card>
        </Card>
      </Col>
    </>
  );
};

export default Post;
