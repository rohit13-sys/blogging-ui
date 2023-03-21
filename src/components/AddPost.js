import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
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
} from "reactstrap";
import { doLogout, getCurrentUser } from "../auth";
import { loadAllCategory } from "../services/category-service";
import { addPost, uploadPostImage } from "../services/post-service";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

const AddPost = () => {
  const [categories, SetCategories] = useState([]);

  const editor = useRef(null);
  const [content, SetContent] = useState("");

  const [post, SetPost] = useState({
    title: "",
    content: "",
    description: "",
    categoryId: "",
  });

  const [currentUser, SetCurrentUser] = useState(null);

  const [image, SetImage] = useState();

  useEffect(() => {
    SetCurrentUser(getCurrentUser())
    loadAllCategory()
      .then((resp) => {
        SetCategories(resp);
      })
      .catch((error) => {
        toast.error("Something Wents Wrong!!!");
      });
  }, []);

  // useEffect(() => {
  //   const tokenExp = "";
  //   const currentTime = new Date();
  //   if (localStorage.getItem('data')!= null) {
  //     const token = JSON.parse(localStorage.getItem("data")).token;
  //     const decodedToken = jwtDecode(token);
  //     const exp = decodedToken.exp;
  //     console.log(decodedToken);
  //     console.log(exp);
  //     tokenExp = new Date(0);
  //     tokenExp.setUTCSeconds(exp);
  //     console.log(">>>>>>>>>>>>" + tokenExp.getTime());
  //     console.log();
  //   }
  //   if (tokenExp < currentTime) {
  //     doLogout();
  //   }
  // }, []);

  const fieldSet = (event) => {
    SetPost({ ...post, [event.target.name]: event.target.value });
  };

  const contentChanged = (data) => {
    SetPost({ ...post, content: data });
  };

  const handleFileChange = (event) => {
    SetImage(event.target.files[0]);
  };

  const createPost = (event) => {
    event.preventDefault();

    if (post.title.trim() === "") {
      alert("Please Enter Post Title");
      return;
    } else if (post.content.trim() === "") {
      alert("Please Enter Post Content");
      return;
    } else if (post.id === "") {
      alert("Please Enter Post Category");
      return;
    } else if (post.description.trim() === "") {
      alert("Please Enter Description!!");
    }

    post["userId"] = currentUser.id;

    addPost(post)
      .then((resp) => {
        if (image && image.type != undefined) {
          if (image.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
            uploadPostImage(resp.id, image).then((data) => {});
          } else {
            toast.error("Please upload proper Format Image");
            return;
          }
        }

        toast.success("Post Added Successfully");
      })
      .catch((error) => {
        toast.error("Something Wents Wrong");
      });
  };

  const reset = () => {
    SetPost({
      title: "",
      content: "",
      categoryId: "",
      description: "",
    });
  };
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
            What's on Your Mind ??
          </h2>
          <CardBody>
            <Form onSubmit={createPost}>
              <FormGroup>
                <div className="my-3">
                  <Label for="title">Post Title</Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Enter Here"
                    onChange={fieldSet}
                    name="title"
                    maxLength={"40"}
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
                    onChange={fieldSet}
                    name="description"
                    maxLength="100"
                  />
                  <span className="text-muted">Max 100 characters</span>
                </div>
              </FormGroup>

              <FormGroup>
                <div className="my-3">
                  <Label for="content">Post Content</Label>
                  <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={contentChanged}
                  />
                </div>
              </FormGroup>

              <FormGroup>
                <div className="my-3">
                  <Label for="image">Select Post Banner</Label>
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
                    onChange={fieldSet}
                  >
                    <option defaultChecked value="">
                      Select Option
                    </option>
                    {categories.map((category) => (
                      <option value={category.id} key={category.id}>
                        {category.categoryTitle}
                      </option>
                    ))}
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
                  Create Post
                </Button>
                <Button
                  color="danger"
                  className="ms-5 px-5 primary"
                  size="lg"
                  type="reset"
                  onClick={reset}
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

export default AddPost;
