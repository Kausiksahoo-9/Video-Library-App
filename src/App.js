import './App.css';
import { BrowserRouter, Routes, Route, Link, useNavigate,} from 'react-router-dom';
import VideoLibraryHome from './components/Video-library-home';
import AdminLogin from './components/Admin-login';
import { AdminDashBoard } from './components/Admin-Dashboard';
import { AdminError } from './components/Admin-Error';
import { AddVideos } from './components/Admin-add-videos';
import { EditVideo } from './components/Admin-edit-video';
import { DeleteVideo } from './components/Admin-delete';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { SignOut } from './components/Admin-signout';
import { UserRegister } from './components/User-register';
import { UserLogin } from './components/User-login';
import { UserError } from './components/User-error';
import { UserDashBoard } from './components/User-dashboard';
import { UserSignOut } from './components/User-signout';

function App() {

  const [cookies, setCookies, removeCookie] = useCookies('admin-id');
  const [cookie, setCookie, removeCookies] = useCookies('user-id');

  useEffect(()=>{

  },[cookie,cookies]);

  return (
    <div className="container-fluid bg-dark text-white" style={{height:'1000px'}}>
      <BrowserRouter>
        <header className='p-3 d-flex justify-content-between'>
          <span className='h2'><Link to="/" className='text-decoration-none text-white'>Video library</Link></span>
          <div>
            {
              (cookie['user-id'] === undefined)
                ? <Link className='btn btn-warning me-2 bi bi-person-fill' to='/user-login'>User Login</Link>
                : <UserSignOut />
            }
            {
              (cookies['admin-id']==undefined)?<Link to="/admin-login" className='btn btn-danger bi bi-person-fill'>Admin Login</Link> : <SignOut />
            }
          </div>
        </header>
        <section className='mt-3'>
            <Routes>
              <Route path='/' element={<VideoLibraryHome />} />
              <Route path='admin-login' element={<AdminLogin />} />
              <Route path='admin-dashboard' element={<AdminDashBoard />} />
              <Route path='admin-error' element={<AdminError />} />
              <Route path='add-video' element={<AddVideos />} />
              <Route path='edit-video/:id' element={<EditVideo />} />
              <Route path='delete-video/:id' element={<DeleteVideo />} />
              <Route path='register-user' element={<UserRegister />} />
              <Route path='user-login' element={<UserLogin />} />
              <Route path='user-error' element={<UserError />} />
              <Route path='user-dashboard' element={<UserDashBoard />} />
            </Routes>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
