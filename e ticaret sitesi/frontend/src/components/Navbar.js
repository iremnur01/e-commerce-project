import React from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Badge,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
                >
                    E-Commerce
                </Typography>
                <Button color="inherit" component={Link} to="/products">
                    Products
                </Button>
                <IconButton
                    color="inherit"
                    component={Link}
                    to="/cart"
                    sx={{ ml: 2 }}
                >
                    <Badge badgeContent={0} color="error">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
                <Button color="inherit" component={Link} to="/login" sx={{ ml: 2 }}>
                    Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                    Register
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar; 