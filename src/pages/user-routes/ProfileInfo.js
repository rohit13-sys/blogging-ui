import React, { useContext, useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import Base from "../../components/Base";
import { Container } from "reactstrap";
import "./ProfileInfo.css";
import userContext from "../../context/userContext";

export default function ProfileInfo() {
  const obj = useContext(userContext);
  const [user, SetUser] = useState(null);

  useEffect(() => {
    SetUser(obj);
    console.log(obj);
},[user]);

  const userView = () => {
    return (
      <div>
        <MDBContainer className="h-100" style={{ padding: "50px" }}>
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">
              <MDBCard>
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#000", height: "200px" }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Generic placeholder image"
                      className="mb-5 img-thumbnail"
                      fluid
                    />
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <MDBTypography tag="h3">
                      {user?.user?.data?.name}
                    </MDBTypography>
                    <MDBTypography tag="h5">
                      Email : {user?.user?.data?.email}
                    </MDBTypography>
                  </div>
                </div>

                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1"></div>
                </div>
                <MDBCardBody className="text-black p-4">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <MDBCardText className="font-italic mb-1">
                        {user?.user?.data?.about}
                      </MDBCardText>
                    </div>
                    <p className="lead fw-normal mb-1">Roles</p>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <MDBCardText className="font-italic mb-1">
                        {user?.user?.data?.roles?.map((role) => {
                          return (
                              <p key={role?.id}>{role?.name.replace("ROLE_","")}</p>
                          );
                        })}
                        {/* {user?.user?.data} */}
                      </MDBCardText>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
  return (
    <Base>
      {user?.user?.data?.name ? userView() : (
        <Container>
          <h1>Loading User Profile.....</h1>
        </Container>
      )}
    </Base>
  );
}
