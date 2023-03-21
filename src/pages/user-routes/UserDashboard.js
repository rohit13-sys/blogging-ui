import React, { useEffect,useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Row,
  Col
} from "reactstrap";
import AddPost from "../../components/AddPost";
import Base from "../../components/Base";
import { loadPostByUser } from "../../services/post-service";
import { getCurrentUser } from "../../auth";
import { toast } from "react-toastify";
import { PAGE_SIZE } from "../../services/helper";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../../components/Post";
import AnimatedCard from "../../animated cards/AnimatedCard";

const UserDashboard = () => {

  
  const [postContent, SetPostContent] = useState({
    contents: [],
    totalPages: "",
    pageNumber: "",
    pageSize: "",
    totalElements: "",
    last: false,
  });

  const [currentPage, SetCurrentPage] = useState(0);

  useEffect(() => {
    pageChange(currentPage);
  }, [currentPage]);


   const pageChange = (pageNumber = 0, pageSize = PAGE_SIZE) => {
     loadPostByUser(JSON.stringify(getCurrentUser().id),pageNumber, pageSize)
       .then((resp) => {
         console.log(resp);
         SetPostContent({
           contents: [...postContent.contents, ...resp.contents],
           totalPages: resp.totalPages,
           pageNumber: resp.pageNumber,
           pageSize: resp.pageSize,
           totalElements: resp.totalElements,
           last: resp.last,
         });
         // window.scroll(0, 0);
       })
       .catch((error) => {
         toast.error("Some error occurred whike loading Posts");
       });
  };
  
  const changePageInfinite = () => {
    SetCurrentPage(postContent.pageNumber + 1);
  };

  
  return (
    <Base>
      <br />
      <Row>
        <Col md={12}>
          <AddPost />
        </Col>
      </Row>

      <br />
      <br />

      <Row>
        <Col className="m-5">
          <InfiniteScroll
            dataLength={postContent?.contents?.length}
            next={changePageInfinite}
            hasMore={!postContent?.last}
            loader={<h4>Loading.....</h4>}
            endMessage={
              <h3 style={{ textAlign: "center" }}>Yay! You have seen it all</h3>
            }
            style={{ overflow: "hidden" }}
          >
            <h2 className="ms-5">Blog Counts({postContent.totalElements})</h2>
            <Row className="row-cols-md-3">
              {postContent?.contents.map((post) => (
                // <Post post={post} key={post?.id} />
                <AnimatedCard post={post} key={post?.id} />
              ))}
            </Row>
          </InfiniteScroll>
        </Col>
      </Row>
    </Base>
  );
};

export default UserDashboard;
