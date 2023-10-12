import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import DotLoader from "react-spinners/DotLoader";

import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import {getFirestore,collection,addDoc} from 'firebase/firestore/lite'
import {Firebase} from '../../firebase/Config'
import { authContext } from '../../assets/store/FirebaseContext';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Loading/Loading';

const Create = () => {
  const {user} = useContext(authContext)
  const [name,setName] = useState('');
  const [category,setCategory] = useState('');
  const [prize,setPrize] = useState('');
  const [image,setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const date = new Date()
  const strdate = date.toString().slice(0,15)
  
  const navigate = useNavigate();

  const storage = getStorage();
  const storageRef = ref(storage, `/image/${image}/${name}`)
  const handleSubmit=(e)=>{
    e.preventDefault();

    setIsLoading(true)
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
    
        uploadBytes(storageRef, image).then((snapshot) => {
          console.log('Uploaded a blob or file!');
          getDownloadURL(storageRef).then((url)=>{
            console.log(url)
            const db = getFirestore(Firebase);
            addDoc(collection(db, "products"), {
            name,
            category,
            prize,
            url,
            userId: user.uid,
            createdAt:strdate,
          }).then(()=>{
            setIsLoading(false)
            navigate('/')
          })
          
          })
    
          
        });
    // ...
      } else {
    // User is signed out
    // ...
      }
      
});

    
  }
  return (
    <Fragment>
      <Header />
      <div className='title' >
      
      </div>
      <card>
        {
          isLoading ?
          <div className='centerDiv1'>
          <DotLoader
          color={"#aee3e9"}
          loading={isLoading}
          
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        </div>
          :

          <div className="centerDiv">
        <h1 >Create your AD now !</h1>
          <form>
            <label htmlFor="fname">Ad Title</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=> setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="Name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e)=> setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
            className="input" 
            type="number" 
            id="fname" 
            value={prize}
            onChange={(e)=> setPrize(e.target.value)}
            name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : null}></img>
          <form>
            <br />
            <input 
            onChange={(e)=>{
              setImage(e.target.files[0])
            }}
            type="file" />
            <br />
            
            <button className="uploadBtn"onClick={handleSubmit} disabled={isLoading}>upload and Submit</button>
          </form>
        </div>
        }
        
      </card>
    </Fragment>
  );
};

export default Create;
