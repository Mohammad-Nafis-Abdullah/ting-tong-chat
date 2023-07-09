import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../../firebase.init';
import Loading from '../Loading/Loading';
import { ReactNode, useEffect } from 'react';
import Login from '../Authentication/Login';
import { setCloudStoreData } from '../../hooks/cloudFireStore';

interface propsSchema{
  children : ReactNode,
}

const RequireAuth = ({children}:propsSchema) => {
  const [user, loading] = useAuthState(auth);
  

  useEffect(()=> {
      (async ()=> {
        if (user) {
            await setCloudStoreData("users",{
              id:user.uid,
              name:user.displayName,
              nameLowerCase: user.displayName?.toLowerCase().split(' '),
              email:user.email,
              image:user.photoURL,
              inbox: {},
            });
          }
      })()
  },[user])
  
  
  if (loading) {
    return <Loading/>;
  }


  return user ? children : <Login/>;
};

export default RequireAuth;