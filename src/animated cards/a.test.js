
import { useContext } from "react";
import toast from 'react-toastify';

import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserProvider from "../context/UserProvider";
import { deletePostById } from "../services/post-service";
import AnimatedCard from "./AnimatedCard";
import { render } from "@testing-library/react";



// Tests that the post title, description, and image are displayed correctly. tags: [happy path]

    // Tests that the deletepost function correctly deletes a post and updates the ui. tags: [happy path]
    
    // Tests that the animatedcard function renders a card component with post data. tags: [happy path]
     // Tests that the animatedcard component renders with the correct image, title, and description of a post. tags: [happy path]
    it("test_animated_card_renders_with_post_data", () => {
        const post = {
            post: {
                id: 1,
                title: "Test Post",
                description: "This is a test post",
                user: {
                    id: 1,
                    name: "Test User"
                }
            }
        };
        const { getByText, getByAltText } = render(<AnimatedCard post={post} />);
        expect(getByText("Test Post")).toBeInTheDocument();
        expect(getByText("This is a test post")).toBeInTheDocument();
        expect(getByAltText("post image")).toBeInTheDocument();
    });

    // Tests that the animatedcard component handles errors when deleting a post and displays the appropriate error message. tags: [edge case]
    it("test_animated_card_handles_delete_post_error", async () => {
        const post = {
            post: {
                id: 1,
                title: "Test Post",
                description: "This is a test post",
                user: {
                    id: 1,
                    name: "Test User"
                }
            }
        };
        const deletePostByIdMock = jest.fn().mockRejectedValue({ response: { status: 401 } });
      const { getByText } = render(
      <UserProvider>
        <BrowserRouter>
        <ToastContainer position="bottom-right" />
        <Routes>
            <Route path="/" element={<AnimatedCard post={post} deletePostById={deletePostByIdMock}/>}>
              <Redirect to="/" />
              </Route>
        </Routes>
          </BrowserRouter>
          </UserProvider>
      );
        fireEvent.click(getByText("Delete"));
        await waitFor(() => expect(getByText("Please Login!!!")).toBeInTheDocument());
    });
