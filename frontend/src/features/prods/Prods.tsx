import { useEffect, useState } from 'react';
import { CartItem, addItem } from '../cart/cartSlice';
import { toast } from 'react-toastify';

import './Prods.css';
import { BASE_URL } from './prodsAPI';
import { getDataAsync, selectProds } from './prodsSlice';
import { useAppDispatch } from '../../app/hooks';
import { useSelector } from 'react-redux';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid, Modal, Backdrop, Fade, Box, IconButton, CircularProgress } from '@mui/material';

const Prods: React.FC = () => {
    const prods = useSelector(selectProds);
    const dispatch = useAppDispatch();
    const [filteredCategory, setFilteredCategory] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const buyProduct = (id: number) => {
        const product = prods.find(prod => prod.id === id);
        if (product) {
            const cartItem: CartItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                amount: 1,
                img: product.img,
            };
            dispatch(addItem(cartItem));
            toast.success(`${product.name} added to cart`);
        }
    };

    useEffect(() => {
        dispatch(getDataAsync());
    }, [dispatch]);

    const filterByCategory = (category: number | null) => {
        setFilteredCategory(category);
    };

    const clearFilter = () => {
        setFilteredCategory(null);
    };

    const openImageModal = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    return (
        <Grid container spacing={2} sx={{ mt: 5 }} justifyContent="center">
            <h2 style={{ fontWeight: 'bold', textAlign: 'center', color: '#00008B' }}>Night Market Groceries</h2>
            <Grid item xs={12}>
                <Button variant="outlined" sx={{ mr: 0.5, fontSize: 12 }} onClick={clearFilter} disabled={filteredCategory === null}>
                    All
                </Button>
                <Button variant="outlined" sx={{ mr: 0.5, fontSize: 12 }} onClick={() => filterByCategory(1)} disabled={filteredCategory === 1}>
                    Dairy
                </Button>
                <Button variant="outlined" sx={{ mr: 0.5, fontSize: 12 }} onClick={() => filterByCategory(2)} disabled={filteredCategory === 2}>
                    Fruits
                </Button>
                <Button variant="outlined" sx={{ mr: 0.5, fontSize: 12 }} onClick={() => filterByCategory(3)} disabled={filteredCategory === 3}>
                    Bakery
                </Button>
            </Grid>
            {prods.length === 0 && (
                <Typography variant="h5" sx={{ marginTop: 2 }} style={{ color: 'gray' }}>
                    <CircularProgress sx={{ margin: 'auto' }} />
                    <br />
                    Please wait (30 seconds or so) for the Products list to load. (the backend host gets turned off while inactive and needs to be refreshed)
                </Typography>
            )}
            {prods
                .filter((prod) => filteredCategory === null || prod.category === filteredCategory)
                .map((prod) => (
                    <Grid item xs={6} sm={6} md={1} key={prod.id} sx={{ justifyContent: 'center' }}>
                        <Card raised>
                            <CardActionArea onClick={() => openImageModal(prod.img)}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={prod.img ? `${BASE_URL}${prod.img}` : `${BASE_URL}/media/default.jpg`}
                                    alt={prod.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                                        {prod.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" style={{ fontSize: '15px' }}>
                                        ${prod.price}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions sx={{ display: 'flex', justifyContent: 'center', marginTop: '-15px', marginBottom: '10px' }}>
                                <Button size="medium" color="success" variant="contained" onClick={() => buyProduct(prod.id)} >
                                    <AddShoppingCartIcon style={{ fontSize: '16px', textTransform: 'none' }} />
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            <Modal
                open={!!selectedImage}
                onClose={closeImageModal}
                aria-labelledby="image-modal"
                aria-describedby="image-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }, // semi-transparent black background
                }}
            >
                <Fade in={!!selectedImage}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh',
                        }}
                    >
                        {selectedImage && (
                            <img
                                className='img-zoom'
                                src={BASE_URL + selectedImage}
                                alt="Full size"
                                style={{ maxWidth: '90%', maxHeight: '90%', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)' }}
                            />
                        )}
                    </Box>
                </Fade>
            </Modal>
        </Grid>
    );
};

export default Prods;
