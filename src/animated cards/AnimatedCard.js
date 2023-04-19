
import styled from "@emotion/styled/macro";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { BASE_URL } from "../services/helper";
import { Link } from "react-router-dom";
import userContext from "../context/userContext";
import { DoLogout, getCurrentUser, isLoggedIn } from "../auth";
import { deletePostById } from "../services/post-service";
import {toast} from 'react-toastify'


 
 
const DisplayOver = styled.div({
  height: "100%",
  left: "0",
  position: "absolute",
  top: "0",
  width: "100%",
  zIndex: 2,
  transition: "background-color 350ms ease",
  backgroundColor: "transparent",
  padding: "20px 20px 0 20px",
  boxSizing: "border-box",
});

const BigTitle = styled.h2({
  textTransform: "uppercase",
  fontFamily: "Helvetica",
  color: 'white',
  mixBlendMode:'exclusion',
});

const Hover = styled.div({
  opacity: 0,
  transition: "opacity 350ms ease",
});

const SubTitle = styled.h4({
  fontFamily: "Helvetica",
  transform: "translate3d(0,50px,0)",
  transition: "transform 350ms ease",
});

const Paragraph = styled.p({
  transform: "translate3d(0,50px,0)",
  transition: "transform 350ms ease",
});

const CTA = styled.a({
  position: "absolute",
  bottom: "20px",
  left: "20px",
});

const Background = styled.div({
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  color: "white",
  position: "relative",
  width: "500px",
  height: "350px",
  cursor: "pointer",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80')",

  [`:hover ${DisplayOver}`]: {
    backgroundColor: "rgba(0,0,0,.5)",
  },
  [`:hover ${SubTitle}, :hover ${Paragraph}`]: {
    transform: "translate3d(0,0,0)",
  },
  [`:hover ${Hover}`]: {
    opacity: 1,
  },
});

const AnimatedCard = (post) => {

  const userContextData = useContext(userContext);
  const navigate = useNavigate();
  const [user, SetUser] = useState(null);
  const [logged, SetLogged] = useState(null);
  const [imageUrl, SetImageUrl] = useState({
    url: `${BASE_URL}/posts/image/${post?.post?.id}`
  });
  // const navigate = useNavigate();
  
  // SetImageUrl({url: `${BASE_URL}/posts/image/${post?.post?.id}`});


  useEffect(() => {
    SetUser(getCurrentUser());
    SetLogged(isLoggedIn());
  }, []);

  const deletePost = (post) => {
    SetImageUrl({
      url:''
    });
    deletePostById(post?.id)
      .then((resp) => {
        toast.success("Post Deleted Successfully");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error?.response?.status);
        // DoLogout();
        // userContextData.SetUser({
        //   data: {},
        //   login: false,
        // });
        // window.location.reload(true);
        // toast.error("Please Login!!!");
        DoLogout(() => {
          userContextData.SetUser({
            data: "",
            login: false,
          });
          // navigate("/login");
          // window.location.reload(true);
          navigate("/login");
          toast.error("Please Login!!!");

        });
      });
  };

  
  return (
    <>
      <Col md={5} className="m-3">
        <Background
          className="m-3"
          style={{
            backgroundImage: `url('${imageUrl?.url}')`,
          }}
        >
          <DisplayOver>
            <BigTitle style={{mixBlendMode:'exclusion'}}>
              {post?.post?.title}
            </BigTitle>
            <Hover>
              {/* <SubTitle>{post?.post?.description.substring(0, 100)}</SubTitle> */}
              <Paragraph>{post?.post?.description.substring(0, 100)}</Paragraph>
              <CTA>
                <Link
                  className="btn btn-outline-primary ms-3"
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
              </CTA>
            </Hover>
          </DisplayOver>
        </Background>
      </Col>
    </>
  );
}

export default AnimatedCard;
