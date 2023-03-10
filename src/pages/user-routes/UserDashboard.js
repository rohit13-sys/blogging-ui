import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from "reactstrap";
import AddPost from "../../components/AddPost";
import Base from "../../components/Base";

const UserDashboard = () => {
  return (
    <Base>
      <br />
      <AddPost />
    </Base>
  );
};

export default UserDashboard;
