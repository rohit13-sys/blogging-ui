import CustomNavbar from "./CustomNavbar";
import { Container } from "reactstrap";


const Base = ({children }) => {
    return (
      <>
       
        
          <CustomNavbar />

        <div className="mt-100">{children}</div>
      </>
    );

};

export default Base;