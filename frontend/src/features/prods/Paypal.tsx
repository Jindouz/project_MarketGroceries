import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { clearItems, selectShoppingData, sendOrderAsync } from '../cart/cartSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { selectUserId } from '../login/loginSlice';
import { useAppDispatch } from '../../app/hooks';

const Paypal: React.FC = () => {
  const shoppingData = useSelector(selectShoppingData);
  const user_ID = useSelector(selectUserId);
  const totalAmount = shoppingData.reduce((acc, curr) => acc + curr.price * curr.amount, 0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const paypalOptions = {
    clientId: "AejqyUjgxZRhA_j7r2GtOXfoQFwwrcaitXZ9DNhk0PyVMTJ6sbgPmFEsjTw9iwxnuIIZBe3UV897Szho", 
    currency: 'USD',
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalAmount.toFixed(2),
          },
        },
      ],
    });
  };

  const onApprove = async (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      const paypal_ID = details.id;
      try {
        dispatch(sendOrderAsync({ user_ID, paypal_ID, totalAmount }));
        console.log({ user_ID, paypal_ID, totalAmount });
      } catch(error) {
        console.error(error);
      }
      toast.success('Payment successful!');
      dispatch(clearItems());
      navigate('/');
    });
  };

  const onError = (err: any) => {
    // Handle errors
    toast.error('Payment failed!');
    console.error(err);
  };

  return (
    <div>
      <PayPalScriptProvider options={paypalOptions}>
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default Paypal;