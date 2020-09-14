import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link, useHistory } from 'react-router-dom';

const Review = () => {
    
    const [cart,setCart]=useState([])
    useEffect(()=>{
        const saveCart=getDatabaseCart();
        const productKeys=Object.keys(saveCart)

        const counts=productKeys.map(key => {
                const product=fakeData.find(pd =>pd.key===key)
                product.quantity=saveCart[key];
                return product;

        });
        setCart(counts)
        console.log(counts);
    },[])
    const history=useHistory()
    const handleProceedOrder= () =>{
       history.push("/shepment")
    }
    const removeItem=(productKey)=>{
        console.log('remove clicked')
        const newCart=cart.filter(pd=>pd.key !==productKey);
        setCart(newCart)

        removeFromDatabaseCart(productKey)

    }
    return (
        <div className='market-container'>
           
            
           <div className="product-container">
           { 
                cart.map(pd=><ReviewItem
                     product={pd}
                     removeItem={removeItem}
                     ></ReviewItem>
                    )
            }
           </div>
           <div className="cart-container">
            <Cart cart={cart}>
              <button onClick={handleProceedOrder}>Proceed Checkout</button>
            </Cart>
           </div>
        </div>
    );
};

export default Review;