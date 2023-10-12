import React,{useEffect,useContext} from 'react';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { FirebaseContext, authContext } from './assets/store/FirebaseContext';
import Post from './assets/store/PostContext';

function App() {
 
  const {setUser} =useContext(authContext);
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    setUser(user)
    console.log(user)
    // ...
  } else {
    // User is signed out
    // ...
  }
});
    
  })

  return (
    <div>
     <Post>
    <BrowserRouter>
   
    <Routes>
     
    <Route exact path='/' element={<Home/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/login' element={<Login></Login>}></Route>
    <Route path='/create' element={<Create></Create>}></Route>
    <Route path='/view' element={<ViewPost></ViewPost>}></Route>
    
    </Routes>
    

    </BrowserRouter>
    </Post> 
    
    </div>
  );
}

export default App;
