import { useEffect, useState } from "react";
import { getAllPosts } from "../services/post-service";
import Post from "./Post";
import { MDBRow } from "mdb-react-ui-kit";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import { toast } from "react-toastify";

const Blogs = () => {
  var typedObj;
  const [postContent, SetPostContent] = useState({
    contents: [],
    totalPages: "",
    pageNumber: "",
    pageSize: "",
    totalElements: "",
    last: false,
  });

  useEffect(() => {
    // getAllPosts(0, 8)
    //   .then((resp) => {
    //     SetPostContent(resp);
    //     console.log(postContent);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     toast.error("Some error occurred whike loading Posts");
    //   });
      pageChange()
  }, []);

    const pageChange = (pageNumber = 0, pageSize = 8) => {
         if (pageNumber < postContent.pageNumber && postContent.pageNumber==0) {
           return;
         }
        if (pageNumber > postContent.pageNumber && postContent.last) {
            return;
        }
    getAllPosts(pageNumber, pageSize)
      .then((resp) => {
        SetPostContent(resp);
        window.scroll(0, 0);
      })
      .catch((error) => {
        toast.error("Some error occurred whike loading Posts");
      });
  };

  return (
    <>
      <MDBRow className="row-cols-1 row-cols-md-4 g-4">
        {postContent?.contents.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </MDBRow>

      <Container className="text-center mt-3">
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
              onClick={() => pageChange(index, 8)}
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
      </Container>
    </>
  );
};

export default Blogs;
