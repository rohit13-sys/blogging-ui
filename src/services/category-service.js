import { publicAxios } from "./helper";

export const loadAllCategory = () => {
  return publicAxios.get("/categories/all-categories").then((response) => {
    return response.data;
  });
};
