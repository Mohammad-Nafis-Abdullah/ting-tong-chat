import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../../firebase.init';
import Loading from '../Loading/Loading';
import { ReactNode, useEffect } from 'react';
import Login from '../Authentication/Login';
import { getCloudStoreSingleData, setCloudStoreData } from '../../hooks/cloudFireStore';

interface propsSchema{
  children : ReactNode,
}

const RequireAuth = ({children}:propsSchema) => {
  const [user, loading] = useAuthState(auth);
  

  useEffect(()=> {
      (async ()=> {
        if (user) {
          const result = await getCloudStoreSingleData("users",user.uid);
          // console.log(result);
          if (!result) {
            // console.log("posting data");
            
            await setCloudStoreData("users",{
              id:user.uid,
              name:user.displayName,
              nameLowerCase: user.displayName?.toLowerCase(),
              email:user.email,
              image:user.photoURL,
              inbox: {},
            });

          }else{
            return;
          }
        }
      })()
  },[user])
  
  
  if (loading) {
    return <Loading/>;
  }


  return user ? children : <Login/>;
};

export default RequireAuth;