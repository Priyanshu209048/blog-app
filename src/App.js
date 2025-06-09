import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Services from './pages/Services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDashboard from './pages/user-routes/UserDashboard';
import PrivateRoute from './components/PrivateRoute';
import ProfileInfo from './pages/user-routes/ProfileInfo';
import PostPage from './pages/PostPage';
import UserProvider from './context/UserProvider';
import Categories from './pages/Categories';
import UpdateBlog from './pages/UpdateBlog';

function App() {

  return (

    <UserProvider>
      <BrowserRouter>
      <ToastContainer position='top-center'/>
        <Routes>
          {/* <Route path="/" element={<h1>This is home page</h1>} /> */}
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="post/:postId" element={<PostPage />} />
          <Route path="categories/:categoryId" element={<Categories />} />

          <Route path='/user' element={<PrivateRoute/>}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="profile/:userId" element={<ProfileInfo />} />
            <Route path="updateBlog/:blogId" element={<UpdateBlog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );

}

export default App;
