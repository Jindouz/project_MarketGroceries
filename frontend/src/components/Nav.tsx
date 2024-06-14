import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkTokenExpiration, handleLogout, selectAdmin, selectIsLoggedIn, selectUsername } from '../features/login/loginSlice';
import WrappedMyCart from '../features/prods/MyCart';
import { selectCartVisibility, selectShoppingData, toggleCartVisibility } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../app/hooks';
import CartDrawer from './Drawer1';
import { Box, TextField } from '@mui/material';

const Nav: React.FC = () => {
    const cartVisible = useSelector(selectCartVisibility);
    const logged = useSelector(selectIsLoggedIn);
    const username = useSelector(selectUsername);
    const admin = useSelector(selectAdmin);
    const shoppingData = useSelector(selectShoppingData);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const totalQuantity = shoppingData.reduce((acc, curr) => acc + curr.amount, 0);


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

    return (
        <div>
            <nav className="navbar navbar-inverse" style={{ backgroundColor: '#222222' }}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to='/' className="navbar-brand"><img src="NavLogoMarket1.jpg" alt="Logo" style={{ width: "79px", marginTop: "-17px" }} /></Link>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            {admin && <li><Link to='/adminprods'>Admin Page</Link></li>}
                        </ul>
                        <div className="navbar-center">
                            {/* <Box sx={{ flexGrow: 1 }}>
                                <TextField
                                    sx={{ ml: 23, flex: 1, maxBlockSize: 45, minWidth: 400, backgroundColor: 'white' }}
                                    label="Search"
                                    variant="filled"
                                />
                            </Box> */}
                            <ul className="nav navbar-nav navbar-right">
                                <li style={{ marginTop: "6px" }}><CartDrawer /></li>
                                {!logged && <li><Link to="/register"><span className="glyphicon glyphicon-log-in"></span> Register</Link></li>}
                                {logged && <li><Link to="/profile"><span className="glyphicon glyphicon-user"></span> {username} {admin ? '(Admin User)' : ''}</Link></li>}
                                {!logged ? <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li> : <li><a href="#" onClick={() => handleLogoutClick()}><span className="glyphicon glyphicon-log-in"></span> Logout</a></li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            {cartVisible && <WrappedMyCart />}
        </div>
    );
}

export default Nav;
