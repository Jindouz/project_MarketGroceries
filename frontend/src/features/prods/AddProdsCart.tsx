import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProds } from './prodsSlice';

const AddProdsCart = () => {
    const prods = useSelector(selectProds);
    const dispatch = useDispatch();
  
    return (
        <div>
            AddProdsCart
        </div>
    );
};

export default AddProdsCart;
