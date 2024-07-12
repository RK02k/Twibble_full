import "../page.css"
import MainPage from "./MainPage/MainPage"
import {useAuthState} from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'

const Profile = () =>
{
    const [user] = useAuthState(auth)
    
    return (
        <div className="page">
            <MainPage user = {user}></MainPage>
        </div>
    )
}

export default Profile