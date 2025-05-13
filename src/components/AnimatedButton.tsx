import { Button, CircularProgress } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { fetchRandomMovieId, movieDetailsAPI } from '../utils/API';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const rotate = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

const AnimatedBorderButton = styled(Button)(() => ({
    borderRadius: '40px',
    backgroundColor: 'transparent',
    padding: '12px 24px',
    fontSize: '16px',
    color: '#fff',
    border: '5px solid transparent',
    position: 'relative',
    width: '250px',
    zIndex: 1,
    overflow: 'hidden',
    cursor: 'pointer',
    textTransform: 'none',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '-5px',
        left: '-5px',
        right: '-5px',
        bottom: '-5px',
        background:'linear-gradient(270deg, #7F00FF 0%, #E100FF 50%, #7F00FF 100%)',
        backgroundSize: '400% 400%',
        animation: `${rotate} 3s linear infinite`,
        zIndex: -1,
        borderRadius: 'inherit',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        borderRadius: 'inherit',
        zIndex: -1,
        boxShadow: '0 0 10px #ff1493, 0 0 20px #00bfff',
    },
}));

export default function SuggestMovieButton() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmitButton = async () => {
        setLoading(true);

        try {
            const fetchedId = await fetchRandomMovieId();

            if (fetchedId !== null) {
                await movieDetailsAPI(Number(fetchedId));
                navigate(`/home/detail/${fetchedId}`);
            } else {
                console.error('Failed to fetch a valid movie ID');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching movie details:', error);
            setLoading(false);
        }
    }

    return (
        <AnimatedBorderButton onClick={handleSubmitButton} disabled={loading}>
            {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'SUGGEST A MOVIE!'}
        </AnimatedBorderButton>
    );
}
