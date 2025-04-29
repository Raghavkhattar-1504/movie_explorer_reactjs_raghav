import { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box, Container, Typography, IconButton } from '@mui/material';
import bg_img from '../assets/bg-img.avif';
import Carousel from './Carousel';
import MovieCard from './MovieCard';
import MovieData from '../data';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import GenreCard from './GenreCard';

export interface Movie {
  title: string;
  genre: string[];
  rating: number;
  poster: string;
  coverimag: string;
  description: string;
  director: string;
  duration: string;
}

const genre: string[] = [
  "Action",
  "Sci-Fi",
  "Romance",
  "Drama",
  "Thriller",
  "Adventure",
  "Crime",
  "Fantasy",
  "Biography",
  "History",
  "Comedy"
]

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        right: '10px',
        transform: 'translateY(-50%)',
        zIndex: 2,
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
      }}
    >
      <ArrowForwardIos />
    </IconButton>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '10px',
        transform: 'translateY(-50%)',
        zIndex: 2,
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
      }}
    >
      <ArrowBackIos />
    </IconButton>
  );
};


export default class HomePage extends Component {

  render() {
    const sliderSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
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

    return (
      <div>
        <Navbar />

        <Container maxWidth={false} disableGutters sx={{ padding: 0, margin: 0 }}>
          <Box
            sx={{
              backgroundImage: `url(${bg_img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100vw',
              minHeight: '100vh',
            }}
          >
            <Carousel />

            <Box component="section" sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ color: 'white', fontSize: '25px', px: 6 }}
              >
                TRENDING NOW...
              </Typography>

              <Box sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
                <Slider {...sliderSettings} style={{ padding: '0 20px', paddingLeft: '30px' }}>
                  {MovieData.map((movie, index) => (
                    <Box key={index} sx={{ px: 2 }}>
                      <MovieCard data={movie} />
                    </Box>
                  ))}
                </Slider>
              </Box>
            </Box>

            <Box component="section" sx={{ px: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ color: 'white', fontSize: '25px', px: 6 }}
              >
                PEOPLE'S CHOICE...
              </Typography>

              <Box sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
                <Slider {...sliderSettings} style={{ padding: '0 20px', paddingLeft: '30px' }}>
                  {MovieData.map((movie, index) => (
                    <Box key={index} sx={{ px: 2 }}>
                      <MovieCard data={movie} />
                    </Box>
                  ))}
                </Slider>
              </Box>
            </Box>
            <Box component="section" sx={{ px: 4, display: 'flex', flexDirection: 'column', gap: 3, py: 3 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ color: 'white', fontSize: '25px', px: 6 }}
              >
                TOP GENRES...
              </Typography>

              <Box sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
                <Slider {...sliderSettings} style={{ padding: '0 20px', paddingLeft: '30px' }}>
                  {genre.map((genreName, index) => (
                    <Box key={index} sx={{ px: 2 }}>
                      <GenreCard data={genreName} />
                    </Box>
                  ))}
                </Slider>
              </Box>
            </Box>
          </Box>
        </Container>

        <Footer />
      </div>
    );
  }
}
