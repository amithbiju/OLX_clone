import React,{useEffect,useState,useContext} from 'react';
import {getFirestore,collection,getDocs ,query,where} from 'firebase/firestore/lite'

import './View.css';
import { PostContext } from '../../assets/store/PostContext';
import { FirebaseContext } from '../../assets/store/FirebaseContext';
function View() {
  const [userDetails,setUserDetails] = useState()
  const{postDetails} = useContext(PostContext)
  const {firebase} = useContext(FirebaseContext)

  const effectfn =async()=>{
    const db = getFirestore(firebase); 
    const {userId} = postDetails;
    const prodtCol = collection(db, 'users'); 
    const q = query(prodtCol,where('id','==',userId))
    const prodtSnapshot = await getDocs(q); 
    
    prodtSnapshot.forEach((doc)=>{
      
      setUserDetails(doc.data())
    })
    
  }

  useEffect(()=>{
    effectfn()
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img className='imagef'
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
        <span >{postDetails.name}</span>
          <p className='name'>&#x20B9; {postDetails.prize}</p>
          
          <p>Category :{postDetails.category}</p>
          <span>Posted on :{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>Name :{userDetails.username}</p>
          <p>Phone No .{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
