import React,{useEffect,useContext, useState} from 'react';
import {getFirestore,collection,getDocs} from 'firebase/firestore/lite'
import {useNavigate} from 'react-router-dom'


import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../assets/store/FirebaseContext';
import { PostContext } from '../../assets/store/PostContext';

function Posts() {
  const{firebase} =useContext(FirebaseContext)
  const [products,setProducts] = useState([])
  const {setPostDetails} = useContext(PostContext)
  const navigate = useNavigate()
  const effectfn =async()=>{
    const db = getFirestore(firebase); 
    const prodtCol = collection(db, 'products'); 
    const prodtSnapshot = await getDocs(prodtCol); 
    
    const prodtList = prodtSnapshot.docs.map((products)=>{ 
      return {
        ...products.data(),
        id : products.id
      }
    }) 
    setProducts(prodtList)
  }

  useEffect(()=>{
    effectfn()
         
  },[]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

          {products.map(product=>{
            return <div
            className="card"
            onClick={()=>{
              setPostDetails(product)
              navigate('/view')
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product ? product.url :"error"} alt="image" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product ? product.prize :"error"}</p>
              <span className="kilometer">{product ? product.name :"error"}</span>
              <p className="name"> {product ? product.category :"error"}</p>
            </div>
            <div className="date">
              <span>{product ? product.createdAt :"error"}</span>
            </div>
          </div>
            
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="https://media.zigcdn.com/media/model/2023/Aug/yamaha-mt-15-v2-std-right-side-view_360x240.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
