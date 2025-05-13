import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Skeleton
} from '@mui/material';
import MovieCard, { movie } from './MovieCard';
import { allMoviesAPI, searchMovieAPI } from '../utils/API';

const Search = () => {
  const [query, setQuery] = useState('');
  const [searchedMovies, setSearchedMovies] = useState<movie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<movie[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoadingRecommendations(true);
      const response = await allMoviesAPI();
      setRecommendedMovies(response.movies);
      setIsLoadingRecommendations(false);
    };
    fetchMovies();
  }, []);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      setIsLoadingSearch(true);
      const results = await searchMovieAPI(1, query.trim());
      setSearchedMovies(results.movies);
      setIsLoadingSearch(false);
    }
  };

  const renderSkeletons = (count = 6) =>
    Array.from({ length: count }).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Skeleton variant="rectangular" height={300} width={250} sx={{ borderRadius: 2, bgcolor: '#1a1a1a' }} />
        <Skeleton height={30} width="80%" sx={{ mt: 1, bgcolor: '#2a2a2a' }} />
      </Grid>
    ));

  return (
    <Container disableGutters maxWidth={false}>
      <Box
        sx={{
          background: 'linear-gradient(to right, #0a0a0a, #000a3a, #001a80, #0022aa)',
          minHeight: '80vh',
          color: 'white',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container
          maxWidth="md"
          disableGutters
          sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3 } }}
        >
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            gutterBottom
            sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}
          >
            SEARCH MOVIES
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for a movie..."
            value={query}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
            sx={{
              input: { color: 'white', fontSize: '15px' },
              bgcolor: '#112240',
              borderRadius: 1,
              mb: { xs: 3, sm: 4 },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#64ffda' },
                '&:hover fieldset': { borderColor: '#90caf9' },
                '&.Mui-focused fieldset': { borderColor: '#64ffda' },
              },
            }}
          />

          {query && (
            <>
              <Typography
                variant="h6"
                sx={{ mb: 2, fontSize: { xs: '16px', sm: '18px' } }}
              >
                RESULTS FOR "{query}"
              </Typography>
              {isLoadingSearch ? (
                <Grid container spacing={2}>{renderSkeletons(6)}</Grid>
              ) : searchedMovies.length > 0 ? (
                <Grid container spacing={2}>
                  {searchedMovies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} key={movie.id}>
                      <MovieCard data={movie} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1" sx={{ color: 'grey.500' }}>
                  No movies found.
                </Typography>
              )}
            </>
          )}

          <Box sx={{ mt: { xs: 4, sm: 6 } }}>
            <Typography
              variant="h5"
              sx={{ mb: 2, fontSize: { xs: '18px', sm: '22px', md: '24px' } }}
            >
              RECOMMENDED FOR YOU...
            </Typography>
            <Grid container spacing={2}>
              {isLoadingRecommendations
                ? renderSkeletons(6)
                : recommendedMovies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} key={movie.id}>
                      <MovieCard data={movie} />
                    </Grid>
                  ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default Search;
