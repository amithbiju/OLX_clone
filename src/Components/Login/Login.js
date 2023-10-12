import React, { useState ,useContext} from 'react';
import {FirebaseContext} from '../../assets/store/FirebaseContext'
import Logo from '../../olx-logo.png';
import './Login.css';
import {useNavigate} from 'react-router-dom'

import { getAuth, signInWithEmailAndPassword} from "firebase/auth";

function Login() {
  const [email,setEmail] = useState('');
  const [pass,setpass] = useState('')
  const {firebase} = useContext(FirebaseContext)
  const navigate = useNavigate();
  const handlelogin =(e)=>{
    e.preventDefault()
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
    // Signed in 
    
    navigate('/')
    const user = userCredential.user;
    // ...z
  })
  .catch((error) => {
    alert(error.message)
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handlelogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={pass}
            onChange={(e)=>setpass(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <button className='button2'onClick={()=>{navigate('/signup')}}>Signup</button>
      </div>
    </div>
  );
}

export default Login;
