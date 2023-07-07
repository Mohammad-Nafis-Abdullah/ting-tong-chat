import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import google from '../../assets/google.gif';
import { auth } from '../../firebase.init';

const Login = () => {
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-3">
      <h1 className='font-bold text-3xl pb-8 text-slate-800'>Welcome to Ting Tong Chatting</h1>
      <button onClick={()=>signInWithGoogle()} className="border-4 rounded-xl inline-flex items-center gap-3 p-3 mx-3">
        <h1 className='font-bold text-2xl text-slate-800'>Sign Up With </h1>
        <img src={google} alt="" className='h-20 w-20'/>
      </button>
      {
          error && 
          <p className='font-bold text-red-600 px-8 py-3 bg-red-600/30 rounded border border-red-600/40'>{error.code.split('/')[1].split('-').join(' ').toUpperCase()}</p>
      }
    </div>
  );
};

export default Login;