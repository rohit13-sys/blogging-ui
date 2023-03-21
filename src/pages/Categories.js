import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Base from "../components/Base";
import { Row, Col } from "reactstrap";
import CategorySideMenu from "../components/CategorySideMenu";
import { loadPostsByCategory } from "../services/post-service";
import { toast } from "react-toastify";
import Post from "../components/Post";
import { MDBRow } from "mdb-react-ui-kit";
import Blogs from "../components/Blogs";
import InfiniteScroll from "react-infinite-scroll-component";
import { PAGE_SIZE } from "../services/helper";
import AnimatedCard from "../animated cards/AnimatedCard";

function Categories() {
    const { categoryId } = useParams();

    const [postContent, SetPostContent] = useState(null);


  useEffect(() => {
    loadPostsByCategory(categoryId).then((resp) => {
     
      SetPostContent(resp);
      
    }).catch((error) => {
      toast.error('Error Occurred While Loading');
      console.log(error);
     })
   },[categoryId])
     
  
  return (
    <Base>
      <Row>
        <Col md={2} className="border-0">
          <CategorySideMenu />
        </Col>
        <Col>
          <h2
            
          >
            Blog Count({postContent?.length})
          </h2>
          <Row className="row-cols-md-3">
            {postContent?.map((post) => (
              // <Post key={post?.id} post={post} />
              <AnimatedCard key={post?.id} post={post} />
            ))}
          </Row>
        </Col>
      </Row>
    </Base>
  );
}

export default Categories;
