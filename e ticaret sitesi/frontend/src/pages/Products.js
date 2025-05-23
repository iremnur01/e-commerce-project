import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Container,
    CircularProgress,
    Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import SearchAndFilter from '../components/SearchAndFilter';

const Products = () => {
    const dispatch = useDispatch();
    const { filteredProducts, loading, error } = useSelector((state) => state.product);
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchProducts({ searchTerm: '', category: '' }));
    }, [dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <SearchAndFilter />
            <Grid container spacing={4}>
                {filteredProducts.map((product) => (
                    <Grid item key={product._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.image}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                                    ${product.price}
                                </Typography>
                                {product.countInStock > 0 ? (
                                    <Typography variant="body2" color="success.main">
                                        In Stock ({product.countInStock})
                                    </Typography>
                                ) : (
                                    <Typography variant="body2" color="error">
                                        Out of Stock
                                    </Typography>
                                )}
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    component={Link}
                                    to={`/product/${product._id}`}
                                >
                                    View Details
                                </Button>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => handleAddToCart(product)}
                                    disabled={product.countInStock === 0}
                                >
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Products; 