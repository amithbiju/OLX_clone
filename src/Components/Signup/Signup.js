import React,{useState, useContext} from 'react';
import { getAuth, createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import {getFirestore,collection,addDoc} from 'firebase/firestore/lite'
import {Firebase} from '../../firebase/Config'
import {useNavigate} from 'react-router-dom'

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../assets/store/FirebaseContext';

export default function Signup() {
  const navigate = useNavigate()
  const[Username,setUsername] = useState('');
  const[email,setEmail] = useState('');
  const[phone,setPhone] = useState('');
  const[pass,setPass] = useState('');

  const {firebase} = useContext(FirebaseContext)

  const handleSubmit =(e)=>{
    e.preventDefault( )
    console.log(firebase)
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass,Username)
    .then((userCredential) => {
    // Signed in 
    updateProfile(auth.currentUser,{displayName : Username})
    console.log(userCredential)
    

      const db = getFirestore(Firebase);
      const docRef =  addDoc(collection(db, "users"), {
        id:userCredential.user.uid,
        username: Username,
        phone: phone
      }).then(()=>{
        navigate("/login")
      })
      console.log("Document written with ID: ", docRef.id);
    
   
    // ...
  })
  //.catch((error) => {
  // console.log("error")
    // ..
  //});
  }


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={Username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={pass}
            onChange={(e)=>setPass(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <button className='button1'onClick={()=>{navigate('/login')}}>Login</button>
      </div>
    </div>
  );
}
