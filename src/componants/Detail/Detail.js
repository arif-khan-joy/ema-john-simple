import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const Detail = () => {
    const {productKey}=useParams()
    const product=fakeData.find(pd=>pd.key===productKey)
    console.log(product)
    return (
        <div>
            <h1>{productKey}key is comming soon</h1>
            <Product showButton={false} product={product}></Product>
        </div>
    );
};

export default Detail;