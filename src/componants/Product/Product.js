import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    console.log(props)
    const {name,img,seller,price,stock,key}=props.product;

    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div >
               <h4 class="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
               <p><small>by: {seller}</small></p>
                <p>Price: {price}</p>
               <p><small>Only {stock} left in stock-Order now</small></p>
               { props.showButton&&<button className="product-button"
               onClick={()=>props.handAddProduct(props.product)}
               >
                     <FontAwesomeIcon icon={faShoppingCart} />add to cart 
                     </button>}
            </div>
           
        </div>
    );
};

export default Product;