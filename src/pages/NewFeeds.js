import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Row ,Col} from "reactstrap";
import { DoLogout, isTokenValid } from "../auth";
import Base from "../components/Base";
import Blogs from "../components/Blogs";
import CategorySideMenu from "../components/CategorySideMenu";
import userContext from "../context/userContext";
import { getAllPosts } from "../services/post-service";

const NewFeeds = () => {

  const userContextData = useContext(userContext);
  const [user, SetUser] = useState(null);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('data')).token;
    console.log(token);
    isTokenValid(token).then((result) => {
      
    }).catch((err) => {
      DoLogout(() => {
        userContextData.SetUser({
          data: "",
          login: false,
        });
        
        window.location.reload(true);
      
      });
    });
  },[])
   
    return (
      <Base style={{ overflow: "hidden" }}>
        <Row>
          <Col md={2} className="border-0">
            <CategorySideMenu />
          </Col>
          <Col md={10}>
            <Blogs />
          </Col>
        </Row>
      </Base>
    );
}

export default NewFeeds;