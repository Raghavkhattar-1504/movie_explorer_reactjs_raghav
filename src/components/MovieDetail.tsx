import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Rating,
  IconButton,
  Button,
} from '@mui/material';
import MovieCard from './MovieCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { allMoviesAPI, deleteMovieAPI, movieDetailsAPI, toggleWatchlistAPI } from '../utils/API';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const MovieDetail = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moviesData, setMoviesData] = useState<MovieData | null>(null);
  const [allMoviesData, setAllMoviesData] = useState([]);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const { id } = useParams();
  const [role, setRole] = useState<string | null>("user");
  const navigate = useNavigate();

  interface MovieData {
    poster_url: string;
    banner_url: string;
    title: string;
    genre: { name: string };
    director: string;
    rating: number;
    description: string;
    release_year: number;
  }

  useEffect(() => {
    const updateDimensions = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);

    const fetchMovies = async () => {
      try {
        const response = await movieDetailsAPI(Number(id));
        if(response.watchlisted){
          setIsWatchlisted(true);
        }

        setMoviesData(response);
      } catch (error) {
        console.error('Error fetching movies:', error);
        toast.error('Failed to load movie details. Please try again.', {
          position: windowWidth <= 600 ? 'top-center' : 'top-right',
        });
      }
    };

    const fetchAllMovies = async () => {
      try {
        const response = await allMoviesAPI();
        setAllMoviesData(response.movies || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
        toast.error('Failed to load trending movies. Please try again.', {
          position: windowWidth <= 600 ? 'top-center' : 'top-right',
        });
      }
    };

    fetchMovies();
    fetchAllMovies();
  }, [id, windowWidth]);

  const handleWatchlist = async () => {
    const response = await toggleWatchlistAPI(String(id));
    console.log("RESPONSE IN COMPONENT: ", response);
    if (response.message && response.message === 'Movie removed from watchlist') {
      setIsWatchlisted(false);
    }
    else {
      setIsWatchlisted(true);
    }
  }

  const isMobile = windowWidth < 600;
  const isTablet = windowWidth >= 600 && windowWidth < 960;

  const NextArrow = ({ onClick }: { onClick?: () => void }) => (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        right: isMobile ? '-4px' : '5px',
        transform: 'translateY(-50%)',
        zIndex: 2,
        bgcolor: 'rgba(0,0,0,0.5)',
        color: 'white',
        '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
      }}
    >
      <ArrowForwardIos fontSize="small" />
    </IconButton>
  );

  const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        left: isMobile ? '0px' : '0px',
        transform: 'translateY(-50%)',
        zIndex: 2,
        bgcolor: 'rgba(0,0,0,0.5)',
        color: 'white',
        '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
      }}
    >
      <ArrowBackIos fontSize="small" />
    </IconButton>
  );

  const getSliderSettings = () => {
    let slidesToShow = 5;
    let slidesToScroll = 5;
    if (isMobile) {
      slidesToShow = 1;
      slidesToScroll = 1;
    } else if (isTablet) {
      slidesToShow = 2;
      slidesToScroll = 2;
    }

    return {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow,
      slidesToScroll,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const paddingX = 2;

  const { poster_url, banner_url, title, genre, director, rating, description, release_year } = moviesData || {};

  const handleMovieCardClick = () => {
    window.location.reload();
  };

  const handleEditMovie = () => {
    toast.info('Navigating to edit movie page...', {
      position: windowWidth <= 600 ? 'top-center' : 'top-right',
    });
    navigate(`/editMovie/${id}`);
  };

  const handleDeleteMovie = async (id: number) => {
    try {
      await deleteMovieAPI(id);
      navigate(-1);
      toast.success('Movie Deleted Successfully.');
    }
    catch (error) {
      console.error("Error while deleting movie : ", error);
      toast.error('Delete movie functionality not implemented yet.', {
        position: windowWidth <= 600 ? 'top-center' : 'top-right',
      });
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        overflowX: 'hidden',
        background: `linear-gradient(to bottom, rgba(0,0,0,0.4) 30vh, navy 100%), url(${banner_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
        color: 'white',
      }}
    >
      <ToastContainer
        position={isMobile ? 'top-center' : 'top-right'}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: '#1a1a3d',
          color: '#fff',
          border: '1px solid #6C63FF',
          borderRadius: '8px',
        }}
      />

      <Box
        sx={{
          pt: '64px',
          px: 4,
          pb: 6,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            width: '100%',
            maxWidth: '1200px',
            gap: 8,
            padding: '25px',
          }}
        >
          <Box
            component="img"
            src={poster_url}
            alt="Movie Poster"
            sx={{
              width: '100%',
              maxWidth: '300px',
              height: '450px',
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': { transform: 'scale(1.1)', overflowY: 'hidden', height: 'f' },
            }}
          />

          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{
              width: { xs: '100%', md: '66%' },
              color: 'white',
            }}
          >
            <Typography
              variant="h3"
              component={motion.h1}
              variants={itemVariants}
              sx={{ fontWeight: 'bold', mb: 2, height: 80, mt: 5 }}
            >
              {title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              <Typography
                variant="subtitle1"
                component={motion.span}
                variants={itemVariants}
                sx={{ color: 'grey.300' }}
              >
                {genre?.name || 'Unknown Genre'}
              </Typography>
              <Typography
                variant="subtitle1"
                component={motion.span}
                variants={itemVariants}
                sx={{ color: 'grey.300' }}
              >
                {director}
              </Typography>
              <Typography
                variant="subtitle2"
                component={motion.span}
                variants={itemVariants}
                sx={{ color: 'grey.300', mt: '3px' }}
              >
                {release_year}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, overflowY: 'hidden' }}>
              <Rating value={4} precision={0.5} readOnly />
              <Typography
                variant="subtitle2"
                component={motion.span}
                variants={itemVariants}
                sx={{ ml: 1, color: 'grey.300' }}
              >
                ({rating}/10)
              </Typography>
            </Box>
            <Typography
              variant="body1"
              component={motion.p}
              variants={itemVariants}
              sx={{ lineHeight: 1.8, mb: 3, maxWidth: '600px' }}
            >
              {description}
            </Typography>

            {role === 'supervisor' && (
              <Box sx={{ mt: 3 }}>
                <Button onClick={handleEditMovie} sx={{ mr: 2, bgcolor: "navy" }} variant="contained" color="primary">
                  Edit Movie
                </Button>
                <Button onClick={() => handleDeleteMovie(Number(id))} sx={{ mr: 2, bgcolor: "red" }} variant="contained" color="secondary">
                  Delete Movie
                </Button>
              </Box>
            )}

              <Box sx={{boxShadow: 0}}>
                {isWatchlisted ?
                 (<Button onClick={handleWatchlist} sx={{ m: 1, bgcolor: "#3ab481" , borderRadius: 2}} variant="contained">
                  Added <BookmarkIcon sx={{ml: 1}}/>
                </Button>)
                :
                <Button onClick={handleWatchlist} sx={{ m: 1,bg: '#3a46b4', borderRadius: 2 }} variant="contained">
                  Add <BookmarkIcon sx={{ml: 1}}  />
                </Button>
                }
                

              </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          p: isMobile ? 1 : paddingX,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: 'white',
            fontSize: isMobile ? '20px' : '25px',
            px: paddingX * 2,
          }}
        >
          TRENDING NOW...
        </Typography>
        <Box
          sx={{
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          {allMoviesData.length > 0 && (
            <Box sx={{ p: isMobile ? '0 10px' : '0 30px' }}>
              <Slider {...getSliderSettings()} >
                {allMoviesData.map((data, index) => (
                  <Box key={index} sx={{ px: 5, pl: isMobile ? 3 : 2 }} onClick={handleMovieCardClick}>
                    <MovieCard data={data} />
                  </Box>
                ))}
              </Slider>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default MovieDetail;
