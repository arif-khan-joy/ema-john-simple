import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Market.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart} from '../../utilities/databaseManager'
import { useHistory } from 'react-router-dom';

const Market = (props) => {
const history=useHistory()
  const first10=fakeData.slice(0,10)
  const [products,setProduct]=useState(first10)
  const [cart,setCart]=useState([])
  const handAddProduct=(product)=>{
    const newCart=[...cart,product]
    setCart(newCart)
    const count=newCart.filter(pd => pd.key===product.key)
  const newCount=count.length;
  addToDatabaseCart(product.key,newCount)


  }
    return (
        <div className="market-container">
            <div className="product-container">
            
          {
            products.map(pro => <Product
            showButton={true}
              handAddProduct={handAddProduct}
               product={pro}>

               </Product>) 
          }
             
            </div>
            <div className="cart-container">
               <Cart cart={cart}>
                 <button onClick={()=>history.push("/review")}>Place order</button>
               </Cart>
            </div>

            
            
             
        </div>
    );
};

export default Market;