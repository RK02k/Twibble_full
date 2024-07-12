import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { Navigate } from "react-router-dom";
import PageLoading from "./PageLoading";

const Protectedroute = ({children}) => {
  const [user, isLoading] = useAuthState(auth);
  if (isLoading) {
    return <PageLoading />;
  }
  if (!user) {
    return <Navigate to='/login' />;
  }
  return children;
};

export default Protectedroute;
