import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardHeader,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import Base from "../../components/Base";
import {  useState } from "react";
import { signUp } from "../../services/user-service";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {

  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [empty, setEmpty] = useState({
    isEmpty: true,
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
    event.target.value ? (empty.isEmpty = false) : (empty.isEmpty = true);
  };

  const handleReset = (event) => {
    setData({
      username: "",
      password: "",
    });
    empty.isEmpty = true;
  };


  const submitForm = (event) => {
    event.preventDefault();
   
    console.log(data);
    //send user data to server for registration
    signUp(data)
      .then((resp) => {

        //redirect to login screen after registration
        navigate("/login");

        toast.success("User is registered");
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
      })
      .catch((error) => {
        setError({
          errors: error,
          isError: true,
        });
        console.log(error);


        if (error.response.status === 409) {
          toast.error(error.response.data);
        } else {
          toast.error(
            "Form Data is invalid!!! Please Correct all details before submit"
          );
        }

        // const errorMsg = error.response?.data?error.response.data :  "Form Data is invalid!!!";
      });
  };

  return (
    <Base>
      <MDBContainer fluid className="p-3 my-3 h-custom">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Not Found"
            />
          </MDBCol>

          <MDBCol col="4" md="">
            <Container>
              <Card>
                <CardHeader>
                  <h3>Register Yourself</h3>
                </CardHeader>
              </Card>
            </Container>
            <br />

            <Form onSubmit={(e) => submitForm(e)}>
              {/* Name Field */}

              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  placeholder="Enter here"
                  id="name"
                  onChange={(e) => handleChange(e, "name")}
                  value={data.name}
                  invalid={error.errors?.response?.data?.name ? true : false}
                  size="lg"
                />
                <FormFeedback>{error.errors.response?.data?.name}</FormFeedback>
              </FormGroup>

              {/* email Field */}

              <FormGroup>
                <Label for="email">Email Address</Label>
                <Input
                  type="email"
                  placeholder="Enter here"
                  id="email"
                  onChange={(e) => handleChange(e, "email")}
                  value={data.email}
                  invalid={error.errors?.response?.data?.email ? true : false}
                  size="lg"
                />
                <FormFeedback>
                  {error.errors.response?.data?.email}
                </FormFeedback>
              </FormGroup>

              {/* password Field */}

              <FormGroup>
                <Label for="password">Passowrd</Label>
                <Input
                  type="password"
                  placeholder="Enter here"
                  id="password"
                  onChange={(e) => handleChange(e, "password")}
                  value={data.password}
                  invalid={
                    error.errors?.response?.data?.password ? true : false
                  }
                  size="lg"
                />
                <FormFeedback>
                  {error.errors.response?.data?.password}
                </FormFeedback>
              </FormGroup>

              {/* About Field */}

              <FormGroup>
                <Label for="about">About</Label>
                <Input
                  type="textarea"
                  placeholder="Enter here"
                  id="about"
                  onChange={(e) => handleChange(e, "about")}
                  value={data.about}
                  invalid={error.errors?.response?.data?.about ? true : false}
                  size="lg"
                />
                <FormFeedback>
                  {error.errors.response?.data?.about}
                </FormFeedback>
              </FormGroup>
              <br />

              <Button
                type="submit"
                color="primary"
                className="mb-0 px-5 primary"
                size="lg"
                disabled={empty.isEmpty}
                // tag={NavLink}
                // to="/login"
              >
                Register
              </Button>
              <Button
                color="primary"
                className="mb-0 px-5 primary ms-4"
                size="lg"
                type="Reset"
                // cax"
                onClick={(e) => handleReset(e)}
              >
                Reset
              </Button>
            </Form>

            <p className="small fw-bold mt-2 pt-1 mb-2">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Base>
  );
};

export default SignUp;
