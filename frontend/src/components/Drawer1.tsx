import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MyCart from '../features/prods/MyCart';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { selectShoppingData } from '../features/cart/cartSlice';

export default function CartDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const shoppingData = useSelector((state: RootState) => selectShoppingData(state));
  const totalQuantity = shoppingData.reduce((acc, curr) => acc + curr.amount, 0);

  const toggleDrawer =
    (anchor: 'right', open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, right: open });
    };
    

  

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toggleDrawer('right', true)} color="inherit"><span className="badge bg-primary rounded-pill">{totalQuantity}</span><ShoppingCartIcon sx={{ color: 'grey', fontSize: 22 }} /></IconButton>
        {/* <li><a onClick={(event) => toggleCart(event)}><span className="badge bg-primary rounded-pill">{totalQuantity}</span><span className="glyphicon glyphicon-shopping-cart"></span> Cart</a></li> */}

          {/* <ShoppingCartIcon />
        </IconButton> */}
        <SwipeableDrawer
          anchor={'right'}
          open={state['right']}
          onClose={toggleDrawer('right', false)}
          onOpen={toggleDrawer('right', true)}
        >
          <MyCart />
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
