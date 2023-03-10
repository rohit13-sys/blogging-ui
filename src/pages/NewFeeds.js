import { useEffect } from "react";
import Base from "../components/Base";
import Blogs from "../components/Blogs";
import { getAllPosts } from "../services/post-service";

const NewFeeds = () => {
   
    return (
        <Base>
           <Blogs/>
        </Base>
    );
}

export default NewFeeds;