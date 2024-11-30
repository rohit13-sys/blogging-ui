import { useEffect, useState } from "react";
import { getAllPosts, loadPostsByCategory } from "../services/post-service";
import Post from "./Post";
import {Row} from "reactstrap";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import { toast } from "react-toastify";
import { PAGE_SIZE } from "../services/helper";
import InfiniteScroll from "react-infinite-scroll-component";
import AnimatedCard from "../animated cards/AnimatedCard";

const Blogs = () => {
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

  useEffect(() => {
    pageChange(currentPage);
  },[])
  const pageChange = (pageNumber = 0, pageSize = PAGE_SIZE) => {
    if (pageNumber < postContent.pageNumber && postContent.pageNumber == 0) {
      return;
    }
    if (pageNumber > postContent?.pageNumber && postContent?.last) {
      return;
    }
      getAllPosts(pageNumber, pageSize)
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
          toast.error("Some error occurred while loading Posts");
        });
    }

    

  const changePageInfinite = () => {
    SetCurrentPage(postContent?.pageNumber + 1);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={postContent?.contents?.length}
        next={changePageInfinite}
        hasMore={!postContent?.last}
        loader={<h4>Loading.....</h4>}
        endMessage={
          <h3 style={{ textAlign: "center" }}>Yay! You have seen it all</h3>
        }
        
      >
        <h2 className="m-4 mb-4">Blog Counts({postContent?.totalElements})</h2>
        <Row className="row-cols-md-3">
          {postContent?.contents?.map(post => 
            // <Post post={post} key={post?.id} />
            <AnimatedCard post={post} key={ post?.id} />
          )}
        </Row>
      </InfiniteScroll>

      {/* <Container className="text-center mt-3">
        <Pagination size="lg">
          <PaginationItem
            onClick={() => pageChange(postContent.pageNumber-1)}
            disabled={postContent?.pageNumber == 0}
          >
            <PaginationLink previous disabled={postContent?.pageNumber == 0}>
              Previous
            </PaginationLink>
          </PaginationItem>
          {[...Array(postContent?.totalPages)].map((item, index) => (
            <PaginationItem
              onClick={() => pageChange(index, PAGE_SIZE)}
              key={index}
              active={index == postContent?.pageNumber}
            >
              <PaginationLink>{index + 1}</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem
            onClick={() =>
              pageChange(postContent.pageNumber+1)
            }
            disabled={postContent?.last}
          >
            <PaginationLink next>Next</PaginationLink>
          </PaginationItem>
        </Pagination>
      </Container> */}
    </>
  );
};

export default Blogs;
