import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const userLoggedInUser = () => {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get(`https://twibb.vercel.app/loggedInUser?email=${email}`);
        setLoggedInUser(response.data);
      } catch (error) {
        console.error('Error fetching logged in user:', error);
      }
    };

    if (email) {
      fetchLoggedInUser();
    }
  }, [email]); // Only trigger effect when email changes

  return [loggedInUser, setLoggedInUser];
};

export default userLoggedInUser;
