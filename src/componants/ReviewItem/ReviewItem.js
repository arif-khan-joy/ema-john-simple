import React from 'react';

const ReviewItem = (props) => {
    
    const {name,quantity,key,price}=props.product
    const design={
        borderBottom:'1px solid lightgray',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px'
    }
    return (
        <div style={design}> 
          
           <h4>{name}</h4>
    <p> Quantity:{quantity}</p>
    <p><small>{price}</small></p>
    <br/>
    <button className="main-button"
        onClick={()=>props.removeItem(key)}
    >Remove</button>
        </div>
    );
};

export default ReviewItem;