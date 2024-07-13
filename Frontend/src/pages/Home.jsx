import Sidebar from "./Sidebar/Sidebar"
import {Outlet} from "react-router-dom"
import Widgets from "./Widgets/Widgets"
import auth from "../firebase.init"
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from "firebase/auth"
import userLoggedInUser from "../hooks/userLoggedInUser"

function Home()
{
  const user = useAuthState(auth)

  const handleLogout = () =>{
    signOut(auth)
  }

 return <>
   <div className="app">
    <Sidebar handleLogout={handleLogout} user = {user}></Sidebar>
    <Outlet></Outlet>
    <Widgets></Widgets>
   </div>
 </>
}
export default Home