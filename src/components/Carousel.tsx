import React, { Component } from 'react';
import Slider, { Settings } from 'react-slick';
import { Box, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        right: '10px',
        transform: 'translateY(-50%)',
        zIndex: 5,
        background: 'rgba(0,0,0,0.5)',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      <ArrowForwardIos sx={{ color: 'white', fontSize: '20px' }} />
    </Box>
  );
}

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '10px',
        transform: 'translateY(-50%)',
        zIndex: 5,
        background: 'rgba(0,0,0,0.5)',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      <ArrowBackIos sx={{ color: 'white', fontSize: '20px' }} />
    </Box>
  );
}

interface Movie {
  id: number;
  title: string;
  description: string;
  banner: string;
  poster: string;
}

export class MainCarousel extends Component {
  render() {
    const settings: Settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      arrows: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };

    const movies: Movie[] = [
      {
        id: 3,
        title: '500 Days of Summer',
        description: "After being dumped by the girl he believes to be his soulmate, hopeless romantic Tom Hansen reflects on their relationship to try and figure out where things went wrong and how he can win her back.",
        banner: 'https://wallpapers.com/images/hd/sunny-poster-500-days-of-summer-9w6wxl1xynrdyges.jpg',
        poster: 'https://mrwallpaper.com/images/hd/500-days-of-summer-sundance-film-festival-zbj082f293uewc4m.jpg'
      },
      {
        id: 30,
        title: 'Dune',
        description: 'A soldier fighting aliens gets to relive the same day over and over again, the day restarting every time he dies.',
        banner: "http://res.cloudinary.com/dviiukqcy/image/upload/qomtb2qy8eqni73ogm9bbosoxryh",
        poster: "http://res.cloudinary.com/dviiukqcy/image/upload/5w7hv6nzvrroo61oz261x26goe5l"
      },
      {
        id: 28,
        title: 'The Martian',
        description: 'An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.',
        banner: "http://res.cloudinary.com/dviiukqcy/image/upload/ufdeebvqedqvu2ygqeonkj8ogvwh",
        poster: 'http://res.cloudinary.com/dviiukqcy/image/upload/00kmnr0kj595wwbonl95gt0zhvcu'
      },
      
    ];

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'transparent', paddingTop: 5 }}>
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', sm: '92%' },
            height: { xs: '500px', sm: '600px' },
            overflow: 'hidden',
            borderRadius: '18px',
          }}
        >
          <Slider {...settings}>
            {movies.map((movie) => (
              <Box
                key={movie.id}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: '500px', sm: '600px' },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${movie.banner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.6)',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '150px',
                      background: `linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%)`,
                      pointerEvents: 'none',
                      zIndex: 1,
                    },
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: { xs: '20px', md: '0 50px 30px 50px' },
                    gap: { xs: '20px', md: '30px' },
                    color: 'white',
                    zIndex: 2,
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                  }}
                >
                  
                  <Box sx={{ flexShrink: 0 }}>
                    <Box
                      component="img"
                      src={movie.poster}
                      alt="Poster"
                      sx={{
                        width: { xs: '125px', sm: '150px', md: '200px' },
                        height: { xs: '175px', sm: '225px', md: '300px' },
                        borderRadius: '8px',
                        objectFit: 'cover',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
                    <Box sx={{ maxWidth: '600px' }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 'bold',
                          mb: 2,
                          fontSize: { xs: '20px', sm: '24px', md: '32px' },
                        }}
                      >
                        {movie.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: '12px', sm: '14px', md: '16px' },
                          color: '#B3B3B3',
                          lineHeight: 1.5,
                        }}
                      >
                        {movie.description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    );
  }
}

export default MainCarousel;
