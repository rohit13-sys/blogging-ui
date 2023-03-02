import "@fortawesome/fontawesome-free/css/all.min.css";
import { NavLink } from "react-router-dom";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

import { Button, Card, CardHeader, Container } from "reactstrap";
import Base from "../components/Base";

const SignUp = () => {
  return (
    <Base>
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Sample image"
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

            <MDBInput
              wrapperClass="mb-4"
              label="Name"
              id="name"
              type="text"
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="email"
              type="email"
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="password"
              type="password"
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="About"
              id="about"
              type="text"
              size="lg"
            />

            <div className="text-center text-md-start mt-4 pt-2">
              <Button
                color="primary"
                className="mb-0 px-5 primary"
                size="lg"
                tag={NavLink}
                to="/about"
              >
                Register
              </Button>
              <p className="small fw-bold mt-2 pt-1 mb-2">
               Already have an account?{" "}
                <a href="/login" className="link-danger">
                  Login
                </a>
              </p>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Base>
  );
};

export default SignUp;
