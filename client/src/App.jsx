import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { About } from './pages/About';
import { SignIn } from './pages/Signin';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import { Home } from './pages/Home';
import { Header } from './components/Header';
import FooterCom from './components/FooterCom'; // Make sure the path is correct
import PrivateRoute from './components/PrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';



export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/search" element={<Search />}/>
        
        <Route element={<PrivateRoute /> } >
             <Route path="/dashboard" element={<Dashboard />} />
        </Route>
         <Route element={<PrivateRoute /> } >
             <Route path="/create-post" element={<CreatePost />} />
             <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
      
        <Route path="/projects" element={<Projects />} />
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
}