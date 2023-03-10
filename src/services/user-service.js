import { publicAxios } from "./helper";

export const signUp = (user) => {
  return publicAxios
    .post("auth/register",user)
    .then((response) => response.data);
};

export const loginUser = (loginDetails) => {
  return publicAxios
    .post("auth/authenticate", loginDetails)
    .then((response) => response.data);
};
