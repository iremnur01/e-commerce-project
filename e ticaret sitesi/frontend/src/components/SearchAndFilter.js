import React, { useState } from 'react';
import {
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts, filterByCategory } from '../store/slices/productSlice';

const SearchAndFilter = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.product.categories);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        dispatch(searchProducts(value));
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategory(value);
        dispatch(filterByCategory(value));
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Search Products"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={category}
                            label="Category"
                            onChange={handleCategoryChange}
                        >
                            <MenuItem value="">All Categories</MenuItem>
                            {categories.map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SearchAndFilter; 