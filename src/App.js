import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Base from './components/Base';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/user-routes/Login';
import SignUp from './pages/user-routes/SignUp';
import CustomNavbar from './components/CustomNavbar';
import About from './pages/About';
import NewFeeds from "./pages/NewFeeds";
import Membership from './pages/Membership';
import Services from './pages/Services';
import Contact from './pages/Contact';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDashboard from './pages/user-routes/UserDashboard';
import PrivateRoute from './components/PrivateRoute';
import ProfileInfo from './pages/user-routes/ProfileInfo';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import PostPage from './pages/PostPage';
import ModalExample from './components/Popup';
import Popup from './components/Popup';
import UserProvider from './context/UserProvider';
import Categories from './pages/Categories';
import UpdatePost from './pages/UpdatePost';
import AnimatedCard from './animated cards/AnimatedCard';
import LikeButton from './components/like/LikeButton';


function App() {

  // useEffect(() => {
  //   const token = JSON.parse(localStorage.getItem('data')).token;
  //   console.log(token);
  //   const decodedToken = jwtDecode(token);
  //   console.log(token);
  // },[]);


  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer position="bottom-right" />
        <Routes>
          <Route path="/" element={<NewFeeds />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="about" element={<About />} />
          <Route path="blogs" element={<NewFeeds />} />
          <Route path="membership" element={<Membership />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="post/:postId" element={<PostPage />} />
          <Route path="popup/:postId" element={<Popup />} />
          <Route path="categories/:categoryId" element={<Categories />} />
          <Route path="background" element={<AnimatedCard />} />
          <Route path="like" element={<LikeButton />} />

          <Route path="/user" element={<PrivateRoute />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="profile-info" element={<ProfileInfo />} />
            <Route path="updatepost/:postId" element={<UpdatePost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
