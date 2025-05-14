import Box from '@mui/material/Box';
import { Star } from 'lucide-react';
import { Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export interface movie {
    id: number;
    title: string;
    genre: { name: string };
    rating: number;
    description: string;
    director: string;
    duration: number;
    plan: string;
    poster_url: string;
    banner_url: string;
}

const MovieCard = ({ data }: { data: movie }) => {
    const { poster_url, genre } = data;
    return (
        <NavLink to={`/home/detail/${data.id}`}>
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    margin: 2,
                    width: '240px',
                    height: '330px',
                    backgroundColor: '#000B21',
                    boxShadow: '0px 0px 10px 5px rgba(65, 53, 108, 0.2)',
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer',
                    '&:hover .poster': {
                        height: '200px',
                        width: '240px',
                        borderRadius: '8px',
                    },
                    '&:hover .content': {
                        opacity: 1,
                        transform: 'translateY(0)',
                    },
                    '&:hover .titleOnly': {
                        opacity: 0,
                    },
                    '&:hover .gradientOverlay': {
                        opacity: 0,
                    }
                }}
            >
                <Box
                    component="img"
                    src={poster_url}
                    alt="Movie Poster"
                    className="poster"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease-in-out',
                        zIndex: 1,
                    }}
                />
                <Box
                    className="gradient"
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '60%',
                        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent)',
                        zIndex: 2,
                        transition: 'opacity 0.3s ease-in-out',
                    }}
                />

                <Box
                    className="titleOnly"
                    sx={{
                        position: 'absolute',
                        bottom: 10,
                        left: 10,
                        zIndex: 3,
                        color: 'white',
                        transition: 'opacity 0.3s ease-in-out',
                    }}
                >
                    <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                        {data.title}
                    </Typography>
                </Box>
                <Box
                    className="content"
                    sx={{
                        position: 'absolute',
                        top: 200,
                        left: 0,
                        right: 0,
                        zIndex: 4,
                        padding: '10px',
                        backgroundColor: '#000B21',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        color: 'white',
                        opacity: 0,
                        transform: 'translateY(20px)',
                        transition: 'all 0.3s ease-in-out',
                        objectFit: 'cover',
                    }}
                >
                    <Box sx={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>

                        <Typography variant="h6" sx={{ fontSize: '15px', fontWeight: 'bold', backgroundColor: '#005FF4', padding: '0px 10px', borderRadius: '10px' }}>
                            {genre.name || 'Unknown'}
                        </Typography>

                    </Box>

                    <Typography sx={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={16} color="yellow" fill="yellow" /> {data.rating}/10
                    </Typography>


                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#005FF4',
                            fontSize: '10px',
                            width: '100%',
                            mt: 1,
                            ':hover': {
                                backgroundColor: '#004AD6',
                            }
                        }}
                    >
                        More Info
                    </Button>
                </Box>
            </Box >
        </NavLink>
    );
};

export default MovieCard;
