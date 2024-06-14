import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
    selectShoppingData,
    clearItems,
    updateItemAmount,
    removeItem,
    toggleCartVisibility,
    removeAllItems,
} from '../cart/cartSlice';
import './MyCart.css';
import { toast } from 'react-toastify';
import { Badge, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles'; // Import styled from @mui/material/styles

import { BASE_URL } from './prodsAPI';
import { RootState } from '../../app/store';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CartDrawer from '../../components/Drawer1';



// Define a styled component for the root container
const RootContainer = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
    },
}));

// Define a styled component for the card
const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(1),
    },
}));

// Define a custom styled component for the card image
const StyledCardMedia = styled('img')(({ theme }) => ({
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
        width: '40px',
        height: '40px',
    },
}));


function MyCart() {
    const shoppingData = useSelector((state: RootState) => selectShoppingData(state));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const removeItemFromCart = (id: number) => {
        dispatch(removeAllItems(id));
    };

    const clearCart = () => {
        dispatch(clearItems());
        toast.success('Cart cleared successfully!');
    };

    const updateQuantity = (id: number, amount: number) => {
        if (amount <= 0) {
            dispatch(removeItem(id));
        }
        dispatch(updateItemAmount({ id, amount }));
    };
    

    

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const totalAmount = shoppingData.reduce((acc, curr) => acc + curr.price * curr.amount, 0);
    const totalQuantity = shoppingData.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <RootContainer className='RootContainer' sx={{ maxWidth: '15vw', marginTop: '5px'}}>

            <Typography variant="h5" align="center" gutterBottom style={{ fontSize: '14px', fontWeight: 'bold' }}>
                Your Cart &nbsp;&nbsp; <Badge badgeContent={totalQuantity} color="primary" overlap="circular"
                    sx={{ "& .MuiBadge-badge": { fontSize: 11, height: 15, minWidth: 15 } }} />
            </Typography>
            {shoppingData.length === 0 ? (
                <Typography variant="body1" align="center" style={{ width: '10vw', marginLeft: 'auto', marginRight: 'auto', fontSize: '12px' }}>
                    <hr />
                    The Cart is empty
                </Typography>
            ) : (
                <Grid container spacing={0}>
                    {shoppingData.map((item) => (
                        <Grid item xs={12} key={item.id}>
                            <StyledCard>
                                <Grid container alignItems="center" >
                                    <Grid item xs={4}>
                                        <StyledCardMedia
                                            style={{ width: '90px', height: '90px', objectFit: 'cover' }}
                                            src={`${BASE_URL}${item.img}`}
                                            alt={item.name}
                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <CardContent>
                                            <Typography variant="subtitle1" style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.name}</Typography>
                                            <Typography variant="body2" color="textSecondary" style={{ fontSize: '14px' }}>
                                                Quantity: {item.amount} (${item.price} each)
                                            </Typography>
                                        </CardContent>
                                    </Grid>
                                </Grid>
                                <CardActions>
                                    <IconButton onClick={() => updateQuantity(item.id, item.amount - 1)}>
                                        <RemoveIcon />
                                    </IconButton>
                                    <IconButton onClick={() => updateQuantity(item.id, item.amount + 1)}>
                                        <AddIcon />
                                    </IconButton>
                                    <Button size="medium" color="secondary" onClick={() => removeItemFromCart(item.id)}>
                                        Remove
                                    </Button>
                                </CardActions>
                            </StyledCard>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Typography variant="h5" align="right" style={{ fontWeight: 'bold' }}>
                            Total: ${totalAmount.toFixed(2)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} container justifyContent="center" sx={{ marginTop: '10px' }}>
                        <Button variant="contained" color="secondary" onClick={clearCart} style={{ fontSize: '12px' }}>
                            Clear Cart
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleCheckout} style={{ marginLeft: '10px', fontSize: '12px' }}>
                            Checkout
                        </Button>
                    </Grid>
                </Grid>
            )}
        </RootContainer>
    );
}

export default MyCart;
