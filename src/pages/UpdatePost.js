import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "../components/Base";
import userContext from "../context/userContext";
import { getPostById, updatePostById, uploadPostImage } from "../services/post-service";
import { loadAllCategory } from "../services/category-service";
import JoditEditor from "jodit-react";
import { BASE_URL } from "../services/helper";
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
  CardImg,
} from "reactstrap";

function UpdatePost() {
  const { postId } = useParams();

  const object = useContext(userContext);

  const navigate = useNavigate();

  const [post, SetPost] = useState({});

  const [image, SetImage] = useState();

  const [categories, SetCategories] = useState([]);
  const [selectedCategory, SetSelectedCategory] = useState(false);

  const editor = useRef(null);
  const [content, SetContent] = useState("");

  const fieldSet = (event) => {
    SetPost({ ...post, [event.target.name]: event.target.value });
  };

  const contentChanged = (data) => {
    SetPost({ ...post, content: data });
  };

  const handleFileChange = (event) => {
    SetImage(event.target.files[0]);
  };

  const updatePost = (event) => {
    event.preventDefault();
    console.log(image.name,"image")
    post.imageName = image.name;
    console.log(post,"post")
    updatePostById(postId, { ...post, category: { id: post.categoryId } })
      .then((resp) => {
        toast.success("Post Updated Successfully");
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });

      if(image.name!==undefined){
        uploadPostImage(postId,image).then((resp)=>{
          console.log(resp);
        })
      }
  };

  useEffect(() => {
    console.log(postId);

    loadAllCategory()
      .then((resp) => {
        SetCategories(resp);
      })
      .catch((error) => {
        toast.error("Something Wents Wrong!!!");
      });

    getPostById(postId)
      .then((resp) => {
        SetPost({ ...resp, categoryId: resp.category.id });
        if (post?.user?.id === object?.user?.data.id) {
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error("SOmething went wrong while loading post");
      });
  }, []);

  // useEffect(() => {
  //   if (post) {
  //     if (post?.user?.id != object?.user?.data.id) {
  //       console.log("not your post");
  //       toast.error("this is not your post");
  //       navigate("/");
  //     }
  //   }
  // }, [post]);

  const handleChange = (e, fieldName) => {
    console.log("data",e)
    SetPost({
      ...post,
      [fieldName]: e.target.value,
    });
  };

  const updatePostHtml = () => {
    return (
      <Container className="mb-4">
        <Card
          className="shadow-lg border-0"
          style={{
            backgroundColor: "aliceblue",
          }}
        >
          <CardHeader>
            <h2
              style={{
                textAlign: "center",
              }}
            >
              Update Your Post Here!!!
            </h2>

            <CardImg
              src={BASE_URL + "/posts/image/" + post?.id}
              alt="No Image"
              position="top"
              className="p-3"
              style={{ maxWidth: "70%" }}
            />
            <CardBody>
              <Form onSubmit={updatePost}>
                <FormGroup>
                  <div className="my-3">
                    <Label for="title">Post Title</Label>
                    <Input
                      type="text"
                      id="title"
                      placeholder="Enter Here"
                      onChange={() => {
                        handleChange("title");
                      }}
                      name="title"
                      maxLength={"40"}
                      value={post?.title}
                    />
                    <span className="text-muted">Max 40 characters</span>
                  </div>
                </FormGroup>

                <FormGroup>
                  <div className="my-3">
                    <Label for="description">Description</Label>
                    <Input
                      type="text"
                      id="description"
                      placeholder="Enter Here"
                      onChange={(event) => {
                        handleChange(event, "description");
                      }}
                      name="description"
                      maxLength="100"
                      value={post?.description}
                    />
                    <span className="text-muted">Max 100 characters</span>
                  </div>
                </FormGroup>

                <FormGroup>
                  <div className="my-3">
                    <Label for="content">Post Content</Label>
                    <JoditEditor
                      ref={editor}
                      value={post?.content}
                      onChange={(newContent) =>
                        SetPost({ ...post, content: newContent })
                      }
                    />
                  </div>
                </FormGroup>

                <FormGroup>
                  <div className="my-3">
                    <Label for="image">Update Post Banner</Label>
                    <Input type="file" id="image" onChange={handleFileChange} />
                  </div>
                </FormGroup>

                <FormGroup>
                  <div className="my-3">
                    <Label for="category">Category</Label>
                    <Input
                      type="select"
                      id="category"
                      placeholder="Select Here"
                      name="categoryId"
                      onChange={(event) => {
                        handleChange(event, "categoryId");
                      }}
                      value={post?.categoryId}
                    >
                      <option value=''>Select Option</option>
                      {categories.map((category) => {
                        return (
                          <option
                            key={category.id}
                            selected={selectedCategory}
                            value={category.id}
                          >
                            {category.categoryTitle}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </FormGroup>

                <Container className="text-center t mt-4 pt-2">
                  <Button
                    color="primary"
                    className="mb-0 px-5 primary"
                    size="lg"
                    type="submit"
                    // cax"
                  >
                    Update Post
                  </Button>
                  <Button
                    color="danger"
                    className="ms-5 px-5 primary"
                    size="lg"
                    type="reset"
                    // onClick={reset}
                  >
                    Reset content
                  </Button>
                </Container>
              </Form>
            </CardBody>
          </CardHeader>
        </Card>
      </Container>
    );
  };

  return (
    <Base>
      <Row className="m-3">{post && updatePostHtml()}</Row>
    </Base>
  );
}

export default UpdatePost;
