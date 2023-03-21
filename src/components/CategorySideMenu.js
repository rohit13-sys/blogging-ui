import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ListGroup, ListGroupItem } from "reactstrap";
import { loadAllCategory } from "../services/category-service";

function CategorySideMenu() {
  const [categories, SetCategories] = useState(null);

  useEffect(() => {
    loadAllCategory()
      .then((resp) => {
          SetCategories(resp);
      })
      .catch((error) => {
        toast.error("error while loading category");
      });
  }, []);
  return (
    <div style={{ position: "fixed" }}>
      <h4 className="m-4">Categories : </h4>
      <ListGroup className="ms-3">
        <ListGroupItem action={true} tag={Link} to="/">
          All Blogs
        </ListGroupItem>
        {categories?.map((category, index) => (
          <ListGroupItem
            action={true}
            key={index}
            tag={Link}
            to={"/categories/" + category.id}
          >
            {category.categoryTitle}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

export default CategorySideMenu;
