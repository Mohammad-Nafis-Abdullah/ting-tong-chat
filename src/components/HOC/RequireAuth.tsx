import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../../firebase.init';
import Loading from '../Loading/Loading';
import { ReactNode } from 'react';
import Login from '../Authentication/Login';

interface propsSchema{
  children : ReactNode,
}

const RequireAuth = ({children}:propsSchema) => {
  const [user, loading] = useAuthState(auth);
  
  // console.log(user);
  if (loading) {
    return <Loading/>;
  }

  return user ? children : <Login/>;
};

export default RequireAuth;