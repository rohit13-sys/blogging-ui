import { React, useContext, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import {
  Button,
  Card,
  CardHeader,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import Base from "../../components/Base";
import { loginUser } from "../../services/user-service";
import { toast } from "react-toastify";
import { doLogin } from "../../auth";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../../context/userContext";


const Login = () => {
  const navigate = useNavigate();

  const userCtxData = useContext(userContext);
  const [data, setData] = useState({
    username: "",
    password: "",
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

  const [empty, setEmpty] = useState({
    isEmpty: true,
  });

  const submitForm = (event) => {
    event.preventDefault();

    //submit data to server to generate token
    loginUser(data)
      .then((resp) => {
        console.log(resp);

        //save token to local storage got from server
        doLogin(resp, () => {
          console.log("Login detail is saved to localstodage");


          userCtxData.SetUser({
            data: resp.user,
            login:true
          })
          //redirect to dashboard page
          navigate("/user/dashboard");
        });
        toast.success("Login Successfull with user : " + data.username);
        setData({
          username: "",
          password: "",
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          toast.error("Please Fill details correctly");
        } else {
          toast.error(error.response.data);
        }
        setError({
          errors: error,
          isError: false,
        });
      });
  };

  return (
    <Base>
      <MDBContainer fluid className="p-3 my-3 h-custom">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Not Found"
            />
          </MDBCol>

          <MDBCol col="4" md="">
            <Container>
              <Card>
                <CardHeader>
                  <p className="lead fw-normal mb-0 me-3">
                    Sign in with
                    <Button
                      style={{
                        margin: 5,
                      }}
                      color="primary"
                    >
                      <MDBIcon fab icon="facebook" />
                    </Button>
                    <Button
                      style={{
                        margin: 2,
                      }}
                      color="primary"
                    >
                      <MDBIcon fab icon="linkedin" />
                    </Button>
                    <Button
                      style={{
                        margin: 2,
                      }}
                      color="primary"
                    >
                      <MDBIcon fab icon="twitter" />
                    </Button>
                  </p>
                </CardHeader>
              </Card>
            </Container>
            <br />
            <div className="d-flex flex-row align-items-center justify-content-center"></div>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Or</p>
            </div>

            <Form onSubmit={(e) => submitForm(e)}>
              <FormGroup>
                <Label for="username">User Name</Label>
                <Input
                  type="email"
                  placeholder="Enter here"
                  id="username"
                  onChange={(e) => handleChange(e, "username")}
                  value={data.username}
                  invalid={
                    error.errors?.response?.data?.username ? true : false
                  }
                  size="lg"
                />
                <FormFeedback>
                  {error.errors.response?.data?.username}
                </FormFeedback>
              </FormGroup>

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
                  autoComplete="on"
                  bsSize="lg"
                />
                <FormFeedback>
                  {error.errors.response?.data?.password}
                </FormFeedback>
              </FormGroup>

              <div className="d-flex justify-content-between mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Remember me"
                />
                <a href="!#">Forgot password?</a>
              </div>

              <div className="text-center text-md-start mt-4 pt-2">
                <Button
                  color="primary"
                  className="mb-0 px-5 primary"
                  size="lg"
                  type="submit"
                  disabled={empty.isEmpty}
                  // cax"
                >
                  Login
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

                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Don't have an account? <Link to="/signup">SignUp</Link>
                </p>
              </div>
            </Form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Base>
  );
}

export default Login;
