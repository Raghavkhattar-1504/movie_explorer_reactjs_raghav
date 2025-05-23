import { useParams } from 'react-router-dom'
import Navbar from '../components/NavbarNew'
import Footer from '../components/Footer'
import { Box, Container, Typography, Skeleton } from '@mui/material'
import MovieCard from '../components/MovieCard'
import { getGenreByIdAPI, getMoviesByGenre } from '../utils/API'
import { useEffect, useState } from 'react'

interface Movie {
  id: number;
  title: string;
  genre: { id: number; name: string };
  poster: string;
  rating: number;
  description: string;
  director: string;
  duration: number;
  releaseDate: number;
  plan: string;
  poster_url: string;
  banner_url: string;
  premium : boolean;
}

const GenrePage = () => {
  const { genre } = useParams<{ genre: string }>();
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [genreName, setGenreName]=useState<String>('');

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMoviesByGenre(genre || '');
      setFilteredMovies(movies);
      setLoading(false);
    };

    const fetchGenre=async()=>{
      const response=await getGenreByIdAPI(String(genre));
      setGenreName(response);
    }

    fetchData();
    fetchGenre();
  }, [genre]);

  const renderSkeletons = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <Box key={index} sx={{ width: 200 }}>
        <Skeleton variant="rectangular" width={200} height={300} animation="wave" data-testid="skeleton-loader" />
        <Skeleton width="80%" sx={{ mt: 1 }} data-testid="skeleton-loader"/>
        <Skeleton width="60%" data-testid="skeleton-loader" />
      </Box>
    ));
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        overflowX: 'hidden',
        background: `linear-gradient(to right, #0a0a0a, #000a3a, #001a80, #0022aa)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      <Navbar />
      <Box sx={{ backgroundColor: 'transparent', minHeight: '100vh', padding: 4 }}>
        <Typography
          variant="h4"
          sx={{ color: 'white', marginBottom: 2, fontSize: '25px', paddingLeft: 4 }}
        >
          {(genreName?.toUpperCase() || 'ALL MOVIES')} MOVIES
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {loading
            ? renderSkeletons()
            : filteredMovies.map((movie, index) => (
              <MovieCard key={index} data={movie} />
            ))}
        </Box>
      </Box>
      <Footer />
    </Container>
  );
};

export default GenrePage;
