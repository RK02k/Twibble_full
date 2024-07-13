import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const userLoggedInUser = () => {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    if (email) {
      fetch(`https://twibb.vercel.app/loggedInUser?email=${email}`, {
        mode: 'cors'
      })
        .then(res => res.json())
        .then(data => setLoggedInUser(data))
        .catch(error => console.error('Error fetching logged in user:', error));
    }
  }, [email]);

  return [loggedInUser, setLoggedInUser];
};

export default userLoggedInUser;
