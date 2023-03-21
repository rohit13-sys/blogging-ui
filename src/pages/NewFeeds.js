import { useEffect } from "react";
import { Row ,Col} from "reactstrap";
import Base from "../components/Base";
import Blogs from "../components/Blogs";
import CategorySideMenu from "../components/CategorySideMenu";
import { getAllPosts } from "../services/post-service";

const NewFeeds = () => {
   
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