import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Base from './components/Base';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp';
import CustomNavbar from './components/CustomNavbar';
import About from './pages/About';
import Blogs from './pages/Blogs';
import Membership from './pages/Membership';
import Services from './pages/Services';
import Contact from './pages/Contact';


function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {  <CustomNavbar/> }/>
        <Route path="login" element={ <Login/> } />
        <Route path="signup" element={<SignUp />} />
        <Route path="about" element={<About />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="membership" element={<Membership />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={ <Contact/> } />
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
