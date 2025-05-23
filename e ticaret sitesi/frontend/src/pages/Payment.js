import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Box,
    Alert
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        try {
            const { data } = await axios.post('http://localhost:5000/api/payment/create-payment-intent', {
                amount
            });

            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                data.clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                }
            );

            if (stripeError) {
                setError(stripeError.message);
            } else if (paymentIntent.status === 'succeeded') {
                navigate('/order-success');
            }
        } catch (err) {
            setError(err.message);
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </Grid>
                {error && (
                    <Grid item xs={12}>
                        <Alert severity="error">{error}</Alert>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={!stripe || processing}
                    >
                        {processing ? 'Processing...' : `Pay $${amount}`}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

const Payment = () => {
    const [amount] = useState(99.99); // This would typically come from your cart/order state

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Payment Details
                </Typography>
                <Box sx={{ mt: 3 }}>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm amount={amount} />
                    </Elements>
                </Box>
            </Paper>
        </Container>
    );
};

export default Payment; 