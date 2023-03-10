// import { useEffect } from "react";
// import jwtDecode from "jwt-decode";

// export const CheckToken = () => {
//   useEffect(() => {
//     const token = JSON.parse(localStorage.getItem("data")).token;
//     const decodedToken = jwtDecode(token);
//     const exp = decodedToken.exp;
//     console.log(decodedToken);
//     console.log(exp);
//     var tokenExp = new Date(0);
//     tokenExp.setUTCSeconds(exp);
//       console.log(">>>>>>>>>>>>" + tokenExp.getTime());
//       const currentTime = new Date();
//     console.log(tokenExp > currentTime);
//   }, []);
// };
