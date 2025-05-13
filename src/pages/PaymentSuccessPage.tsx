import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  CircularProgress
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const GradientBackground = styled(Box)({
  background: `linear-gradient(to right, #0a0a0a, #000a3a, #001a80, #0022aa)`,
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  backgroundSize: '200% 200%',
  animation: 'gradientAnimation 10s ease infinite',
  '@keyframes gradientAnimation': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' }
  }
});

const SuccessCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: theme.spacing(2),
  boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
  maxWidth: '500px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#121212',
  color: '#ffffff',
}));

const SuccessIcon = styled(CheckCircleIcon)(({ theme }) => ({
  fontSize: '72px',
  color: '#4caf50',
  marginBottom: theme.spacing(2),
  filter: 'drop-shadow(0px 4px 8px rgba(76, 175, 80, 0.4))',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.spacing(3),
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '16px',
  boxShadow: '0px 4px 12px rgba(0, 10, 58, 0.5)',
  background: 'linear-gradient(to right, #001a80, #0022aa)',
  '&:hover': {
    background: 'linear-gradient(to right, #002299, #0033cc)',
  },
}));

interface SubscriptionDetails {
  plan_name?: string;
  [key: string]: any;
}

const PaymentSuccessPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails | null>(null);
  const location = useLocation();

  useEffect(() => {
    const verifySubscription = async () => {
      const params = new URLSearchParams(location.search);
      const sessionId = params.get('session_id');

      if (!sessionId) {
        setError('No session ID found in the URL.');
        setLoading(false);
        return;
      }

      try {
        const authToken = localStorage.getItem('token');
        const response = await axios.get(
          `https://movie-ror-priyanshu-singh.onrender.com/api/v1/subscriptions/success?session_id=${sessionId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        setSubscriptionDetails(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error('Error verifying subscription:', err);
        setError(err.response?.data?.error || 'Failed to verify subscription. Please try again.');
        setLoading(false);
      }
    };

    verifySubscription();
  }, [location.search]);

  const handleRetry = () => {
    window.location.href = '/subscription';
  };

  const handleNavigateHome = () => {
    window.location.href = '/';
  };

  return (
    <GradientBackground>
      <Container maxWidth="sm" sx={{ height: '100%' }}>
        <SuccessCard>
          {loading ? (
            <CircularProgress size={70} thickness={5} />
          ) : error ? (
            <>
              <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 700 }}>
                Subscription Error
              </Typography>
              <Typography variant="h6" align="center" color="#ef4444" sx={{ mb: 2 }}>
                {error}
              </Typography>
              <ActionButton onClick={handleRetry}>
                Try Again
              </ActionButton>
            </>
          ) : (
            <>
              <SuccessIcon />
              <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 700 }}>
                Subscription Activated!
              </Typography>
              <Typography variant="h6" align="center" color="#9ca3af" sx={{ mb: 2 }}>
                Your subscription has been successfully activated.
                {subscriptionDetails?.plan_name && (
                  <span style={{ display: 'block', marginTop: '10px' }}>
                    Enjoy your <strong>{subscriptionDetails.plan_name}</strong> plan!
                  </span>
                )}
              </Typography>
              <ActionButton
                variant="contained"
                color="primary"
                size="large"
                endIcon={<HomeIcon />}
                onClick={handleNavigateHome}
                disableElevation
              >
                Go to Homepage
              </ActionButton>
            </>
          )}
        </SuccessCard>
      </Container>
    </GradientBackground>
  );
};

export default PaymentSuccessPage;
