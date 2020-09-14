import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart=props.cart;
    // const total=cart.reduce((total,pdp)=>total+pdp.price,0)
    let total=0;
    for(let i=0;i<cart.length;i++){
        const product=cart[i];
        total=total+product.price ;
    }
    let shipping=0;
    if(total>35){
        shipping=0;
    }
     else if(total>15){
        shipping=4.99;
    }
    else if(total>0){
        shipping=12.23;

    }
    const tax=(total/10).toFixed(2)
     let grandTotal=(total+shipping+Number(tax)).toFixed(2)
    return (
        <div>
            <h4>Order summary:</h4>
            <p>Item Ordered:{props.cart.length}</p>
             <p><small>Tax:{tax}</small></p>
            <p><small>Shipping:{shipping}</small></p>
            <h4>Total:{grandTotal}</h4>

           {
               props.children
           
           /* <Link to="/review">
               <button style={{backgroundColor:"orange"}}>Order revew</button>
           </Link>
            */}
            
        </div>
    );
};
 
export default Cart;