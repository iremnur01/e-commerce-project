import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Box,
    Tabs,
    Tab
} from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
    const [value, setValue] = useState(0);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const productsRes = await axios.get('http://localhost:5000/api/products');
            const ordersRes = await axios.get('http://localhost:5000/api/orders');
            const usersRes = await axios.get('http://localhost:5000/api/users');

            setProducts(productsRes.data);
            setOrders(ordersRes.data);
            setUsers(usersRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const renderProducts = () => (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Stock</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product._id}>
                            <TableCell>{product._id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>${product.price}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.countInStock}</TableCell>
                            <TableCell>
                                <Button size="small" color="primary">Edit</Button>
                                <Button size="small" color="error">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    const renderOrders = () => (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Delivered</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order._id}>
                            <TableCell>{order._id}</TableCell>
                            <TableCell>{order.user?.name}</TableCell>
                            <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>${order.totalPrice}</TableCell>
                            <TableCell>{order.isPaid ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{order.isDelivered ? 'Yes' : 'No'}</TableCell>
                            <TableCell>
                                <Button size="small" color="primary">Details</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    const renderUsers = () => (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell>{user._id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.isAdmin ? 'Yes' : 'No'}</TableCell>
                            <TableCell>
                                <Button size="small" color="primary">Edit</Button>
                                <Button size="small" color="error">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={value} onChange={handleTabChange}>
                    <Tab label="Products" />
                    <Tab label="Orders" />
                    <Tab label="Users" />
                </Tabs>
            </Box>
            {value === 0 && renderProducts()}
            {value === 1 && renderOrders()}
            {value === 2 && renderUsers()}
        </Container>
    );
};

export default AdminDashboard; 