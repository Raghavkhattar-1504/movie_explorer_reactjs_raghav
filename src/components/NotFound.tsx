import { Component } from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import withNavigate from '../utils/HOC';

interface Props {
  navigate: Function;
}

class NotFound extends Component<Props> {
  handleGoHome = () => {
    this.props.navigate('/');
  };

  render() {
    return (
      <Box
        sx={{
          height: '80vh',
          width: '100%',
          background: 'linear-gradient(to right, #0a0a0a, #000a3a, #001a80, #0022aa)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            borderRadius: 3,
            maxWidth: 400,
            width: '90%',
            color: '#fff',
          }}
        >
          <Typography variant="h1" sx={{ fontSize: '5rem', m: 1, overflow: 'hidden' }}>
            404
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.2rem', mb: 3 }}>
            Oops! The page you're looking for doesn't exist.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#ffffff',
              color: '#001a80',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
            onClick={this.handleGoHome}
          >
            Go Home
          </Button>
        </Paper>
      </Box>
    );
  }
}

export default withNavigate(NotFound);
