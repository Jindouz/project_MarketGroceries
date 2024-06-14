import React, { useEffect } from 'react';
import './Checkout.css';
import Paypal from '../prods/Paypal';
import { selectShoppingData } from './cartSlice';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../login/loginSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout: React.FC = () => {
  const shoppingData = useSelector(selectShoppingData);
  const totalAmount = shoppingData.reduce((acc, curr) => acc + curr.price * curr.amount, 0);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isLoggedIn) {
        toast.error('Please login before checkout!');
        navigate('/login');
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isLoggedIn, navigate]);

  return (
    <div className="checkout-container">
      <div className="col-75">
        <div className="container">
          <h1>Checkout</h1>
          <h3>Total Amount : ${(totalAmount).toFixed(2)}</h3>
          <Paypal />
          <img src={"https://i.imgur.com/VvT7XOB.jpeg"} alt="logo" className="img-responsive center" style={{ width: "40%", margin: "auto" }} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
