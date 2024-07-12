import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Signup from './pages/Login/Signup';
import Protectedroute from './pages/Protectedroute';
import PageLoading from './pages/PageLoading';
import Feed from './pages/Feed/Feed';
import Explore from './pages/Explore/Explore';
import Notifications from './pages/Notifications/Notifications';
import Messages from './pages/Messages/Messages';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import Lists from './pages/List/List';
import Profile from './pages/Profile/Profile';
import More from './pages/More/More';
import Plan from './pages/More/Subscript/Plan';
import Success from './pages/Payment/Success';
import Cancel from './pages/Payment/Cancel';

function App() {
  return (
    <>
 <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Protectedroute><Home/></Protectedroute>}>
              <Route index element={<Feed />} />
            </Route>

            <Route path='/home' element={<Protectedroute><Home/></Protectedroute>}>
              <Route path='feed' element={<Feed />} />
              <Route path='explore' element={<Explore />} />
              <Route path='notifications' element={<Notifications />} />
              <Route path='messages' element={<Messages />} />
              <Route path='bookmarks' element={<Bookmarks />} />
              <Route path='lists' element={<Lists />} />
              <Route path='profile' element={<Profile />} />
              <Route path='more' element={<More />} />
              <Route path='more/plans' element={<Plan />} />
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/page-loading' element={<PageLoading />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
