import CustomNavbar from "./CustomNavbar";

const Base = ({ title = "Welcome to our website", children }) => {
    return (
        <div>
            <CustomNavbar />
            {children}
            <h1>this is footer</h1>
        </div>
    );

};

export default Base;