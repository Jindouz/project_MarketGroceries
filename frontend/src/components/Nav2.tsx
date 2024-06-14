import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkTokenExpiration, handleLogout, selectAdmin, selectIsLoggedIn, selectUsername } from '../features/login/loginSlice';
import WrappedMyCart from '../features/prods/MyCart';
import { selectCartVisibility, selectShoppingData, toggleCartVisibility } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../app/hooks';
import { Badge, IconButton, AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

const Nav2: React.FC = () => {
    const cartVisible = useSelector(selectCartVisibility);
    const logged = useSelector(selectIsLoggedIn);
    const username = useSelector(selectUsername);
    const admin = useSelector(selectAdmin);
    const shoppingData = useSelector(selectShoppingData);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const totalQuantity = shoppingData.reduce((acc, curr) => acc + curr.amount, 0);

    const toggleCart = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.stopPropagation(); // Stop the event from bubbling up (handleClickOutside function)
        dispatch(toggleCartVisibility());
    };

    const handleLogoutClick = async () => {
        await dispatch(handleLogout());
        navigate('/');
        toast.success('Logged out successfully!');
    }

    useEffect(() => {
        dispatch(checkTokenExpiration());
        const intervalId = setInterval(() => {
            dispatch(checkTokenExpiration());
        }, 60000); // Check every 60 seconds
        return () => clearInterval(intervalId);
    }, [dispatch]);

    useEffect(() => {
        if (cartVisible) {
            const handleClickOutside = (event: MouseEvent) => {
                const cartContainer = document.querySelector('.cart-container');
                if (cartContainer && !cartContainer.contains(event.target as Node)) {
                    dispatch(toggleCartVisibility());
                }
            };
            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [cartVisible, dispatch]);

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1 }}>
                    <img src="NavLogoMarket1.jpg" alt="Logo" style={{ width: "79px", marginTop: "-17px" }} />
                </Typography>
                <div>
                    <Link to="#" onClick={(event) => toggleCart(event)} style={{ color: 'inherit', textDecoration: 'none' }}>
                        <Badge badgeContent={totalQuantity} color="primary">
                            <ShoppingCartIcon />
                        </Badge>
                    </Link>
                    {!logged && <Button color="inherit" component={Link} to="/register">Register</Button>}
                    {logged && (
                        <div>
                            <IconButton color="inherit" component={Link} to="/profile">
                                <AccountCircleIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={null}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={false}
                            >
                                <MenuItem component={Link} to="/profile">{username} {admin ? '(Admin User)' : ''}</MenuItem>
                                <MenuItem onClick={() => handleLogoutClick()}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {!logged && <Button color="inherit" component={Link} to="/login">Login</Button>}
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Nav2;
