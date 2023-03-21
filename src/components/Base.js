import CustomNavbar from "./CustomNavbar";
import { Container } from "reactstrap";
import { useContext, useEffect,useState } from "react";
import userContext from "../context/userContext";



const Base = ({ children }) => {
  
 
    return (
      <>
       
        
          <CustomNavbar />

        <div className="mt-100">{children}</div>

          
      </>
    );

};

export default Base;