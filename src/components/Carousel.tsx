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

export class MainCarousal extends Component {
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
        id: 1,
        title: 'Avengers: Endgame',
        description: 'After the devastating events of Avengers: Infinity War, the universe is in ruins...',
        banner: 'https://disney.images.edge.bamgrid.com/ripcut-delivery/v1/variant/disney/7b350a2f-0b3e-4033-8125-34c4d67e3bbe?/scale?width=1200&aspectRatio=1.78&format=webp',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_FMjpg_UX1000_.jpg'
      },
      {
        id: 2,
        title: 'The Batman',
        description: 'In his second year of fighting crime, Batman uncovers corruption in Gotham...',
        banner: 'https://www.thebatman.com/images/banner_img.jpg',
        poster: 'https://m.media-amazon.com/images/S/pv-target-images/3de84cca07fc963b66a01a5465c2638066119711e89c707ce952555783dd4b4f.jpg'
      },
      {
        id: 3,
        title: 'Interstellar',
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        banner: 'https://www.hauweele.net/~gawen/blog/wp-content/uploads/2014/11/interstellar.jpg',
        poster: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg'
      }
    ];

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'transparent', paddingTop: 5 }}>
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', sm: '92%' },
            height: '500px',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ overflow: 'hidden' }}>
            <Slider {...settings} >
              {movies.map((movie) => (
                <Box key={movie.id} sx={{ position: 'relative', width: '100%', height: '500px' }}>
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${movie.banner})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'top center',
                      filter: 'brightness(0.6)',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '120px',
                        background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 90%)',
                        pointerEvents: 'none',
                        zIndex: 1,
                        objectFit: 'cover',
                        overflow: 'hidden'
                      }
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
                      padding: { xs: '20px', sm: '0 50px 30px 50px' },
                      gap: { xs: '20px', sm: '30px' },
                      color: 'white',
                      zIndex: 2,
                      justifyContent: { xs: 'center', sm: 'flex-start' }
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
                      <Box sx={{ maxWidth: '500px' }}>
                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            fontSize: { xs: '20px', sm: '24px', md: '32px' }
                          }}
                        >
                          {movie.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: { xs: '12px', sm: '14px', md: '16px' },
                            color: '#B3B3B3',
                            lineHeight: 1.5
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
      </Box>
    );
  }
}

export default MainCarousal;
