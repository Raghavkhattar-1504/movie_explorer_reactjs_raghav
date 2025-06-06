import { Component } from 'react';
import Navbar from '../components/NavbarNew';
import Footer from '../components/Footer';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Skeleton,
} from '@mui/material';
import Carousel from '../components/Carousel';
import MovieCard from '../components/MovieCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import GenreCard from '../components/GenreCard';
import withNavigate from '../utils/HOC';
import { peopleChoiceAPI, trendingNowAPI } from '../utils/API';
import SuggestMovieButton from '../components/AnimatedButton';

interface movie {
  id: number;
  title: string;
  genre: { name: string };
  rating: number;
  poster: string;
  coverimag: string;
  description: string;
  director: string;
  duration: number;
  plan: string;
  poster_url: string;
  banner_url: string;
  premium: boolean;
}

interface HomePageProps {
  navigate: Function;
}

interface HomePageState {
  windowWidth: number;
  peopleChoiceMovies: movie[];
  trendingMovies: movie[];
  isLoading: boolean;
}

const genreList: string[] = [
  'Action', 'Sci-Fi', 'Romance', 'Drama', 'Thriller',
  'Documentary', 'Comedy', 'Horror'
];

class HomePage extends Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      peopleChoiceMovies: [],
      trendingMovies: [],
      isLoading: true,
    };
  }

  updateDimensions = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  async componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    try {
      const response = await peopleChoiceAPI();
      this.setState({
        peopleChoiceMovies: response.movies || [],
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
      this.setState({ isLoading: false });
    }
    try {
      const response = await trendingNowAPI();
      this.setState({
        trendingMovies: response.movies || [],
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
      this.setState({ isLoading: false });
    }
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  handleGenre = (genreName: string) => {
    let genreId = 13;

    if (genreName === 'Action') {
      genreId = 3
    }
    else if (genreName === 'Comedy') {
      genreId = 2
    }
    else if (genreName === 'Drama') {
      genreId = 10
    }
    else if (genreName === 'Sci-Fi') {
      genreId = 4
    }
    else if (genreName === 'Romance') {
      genreId = 12
    }
    else if (genreName === 'Horror') {
      genreId = 11
    }
    else if (genreName === 'Documentary') {
      genreId = 14
    }
    else if (genreName === 'Thriller') {
      genreId = 13
    }
    else {
      genreId = 2
    }
    this.props.navigate(`/genre/${genreId}`);
  };

  get isMobile() {
    return this.state.windowWidth < 600;
  }

  get isTablet() {
    return this.state.windowWidth >= 600 && this.state.windowWidth < 960;
  }

  NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        sx={{
          position: 'absolute',
          top: '50%',
          right: this.isMobile ? '-4px' : '5px',
          transform: 'translateY(-50%)',
          zIndex: 2,
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
        }}
      >
        <ArrowForwardIos fontSize="small" />
      </IconButton>
    );
  };

  PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        sx={{
          position: 'absolute',
          top: '50%',
          left: this.isMobile ? '0px' : '10px',
          transform: 'translateY(-50%)',
          zIndex: 2,
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
        }}
      >
        <ArrowBackIos fontSize="small" />
      </IconButton>
    );
  };

  getMovieSliderSettings = () => {
    const NextArrow = (props: any) => {
      const { onClick } = props;
      return (
        <IconButton
          onClick={onClick}
          sx={{
            position: 'absolute',
            top: '50%',
            right: this.isMobile ? '-4px' : '5px',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: 'white',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
          }}
        >
          <ArrowForwardIos fontSize="small" />
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
            left: this.isMobile ? '0px' : '10px',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: 'white',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
          }}
        >
          <ArrowBackIos fontSize="small" />
        </IconButton>
      );
    };

    let slidesToShow = 5;
    let slidesToScroll = 5;
    if (this.isMobile) {
      slidesToShow = 2;
      slidesToScroll = 2;
    } else if (this.isTablet) {
      slidesToShow = 2;
      slidesToScroll = 2;
    }

    return {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow,
      slidesToScroll,
      autoplay: true,
      autoplaySpeed: 3000,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1147,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 883,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    };
  };

  getGenreSliderSettings = () => {
    const NextArrow = (props: any) => {
      const { onClick } = props;
      return (
        <IconButton
          onClick={onClick}
          sx={{
            position: 'absolute',
            top: '50%',
            right: this.isMobile ? '-4px' : '5px',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: 'white',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
          }}
        >
          <ArrowForwardIos fontSize="small" />
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
            left: this.isMobile ? '0px' : '10px',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: 'white',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
          }}
        >
          <ArrowBackIos fontSize="small" />
        </IconButton>
      );
    };

    let slidesToShow = 5;
    let slidesToScroll = 5;
    if (this.isMobile) {
      slidesToShow = 1;
      slidesToScroll = 1;
    } else if (this.isTablet) {
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
          breakpoint: 1147,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 883,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
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

  renderSkeletonCards = (count: number) => {
    return Array.from({ length: count }).map((_, index) => (
      <Box key={index} sx={{ px: 0, paddingLeft: this.isMobile ? 1 : 2 }}>
        <Skeleton variant="rectangular" data-testid="skeleton" width={320} height={this.isMobile ? 220 : 330} sx={{ borderRadius: 2 }} />
        <Skeleton width="80%" data-testid="skeleton" height={30} sx={{ mt: 1 }} />
        <Skeleton width="60%" data-testid="skeleton" height={20} />
      </Box>
    ));
  };

  render() {
    const { isLoading, peopleChoiceMovies, trendingMovies } = this.state;
    const paddingX = this.isMobile ? 2 : 4;

    return (
      <>
        <Navbar />
        <Container maxWidth={false} disableGutters sx={{ padding: 0, margin: 0 }}>
          <Box
            sx={{
              background: `linear-gradient(to right, #0a0a0a, #000a3a, #001a80, #0022aa)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100vw',
              minHeight: '100vh',
            }}
          >
            <Carousel />

            <Box
              sx={{
                p: this.isMobile ? 1 : this.isTablet ? 2 : paddingX,
                display: 'flex',
                flexDirection: 'column',
                gap: this.isMobile ? 0 : 2,
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  pr: this.isMobile ? 1 : this.isTablet ? 3 : 7,
                  flexWrap: this.isMobile ? 'wrap' : 'nowrap',
                  gap: this.isMobile ? 1 : 0,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: 'white',
                    fontSize: this.isMobile ? '20px' : this.isTablet ? '22px' : '25px',
                    px: paddingX * 2,
                  }}
                >
                  TRENDING NOW...
                </Typography>
                {!this.isMobile ? <SuggestMovieButton /> : <></>}
              </Box>
              <Box sx={{ width: '100%', position: 'relative' }}>
                {isLoading ? (
                  <Box sx={{ display: 'flex', gap: 2, px: this.isMobile ? 2 : 4 }}>{this.renderSkeletonCards(this.isMobile ? 2 : this.isTablet ? 2 : 5)}</Box>
                ) : (
                  <Slider {...this.getMovieSliderSettings()}>
                    {trendingMovies.map((data, index) => (
                      <Box key={index} sx={{ px: this.isMobile ? 0 : 2, paddingLeft: this.isMobile ? 0 : 2 }}>
                        <MovieCard data={data} />
                      </Box>
                    ))}
                  </Slider>
                )}
              </Box>
            </Box>

            <Box sx={{ p: this.isMobile ? 1 : paddingX, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h5" sx={{ color: 'white', fontSize: this.isMobile ? '20px' : '25px', px: paddingX * 2 }}>
                PEOPLE'S CHOICE...
              </Typography>
              <Box sx={{ width: '100%', position: 'relative' }}>
                {isLoading ? (
                  <Box sx={{ display: 'flex', gap: 2, px: 4 }}>{this.renderSkeletonCards(this.isMobile ? 2 : this.isTablet ? 2 : 5)}</Box>
                ) : (
                  <Slider {...this.getMovieSliderSettings()}>
                    {peopleChoiceMovies.map((data, index) => (
                      <Box key={index} sx={{ px: this.isMobile ? 0 : 2, paddingLeft: this.isMobile ? 0 : 2 }}>
                        <MovieCard data={data} />
                      </Box>
                    ))}
                  </Slider>
                )}
              </Box>
            </Box>

            <Box sx={{ px: paddingX, display: 'flex', flexDirection: 'column', gap: 3, py: 3 }}>
              <Typography variant="h5" sx={{ color: 'white', fontSize: '25px', px: paddingX * 2 }}>
                TOP GENRES...
              </Typography>
              <Box sx={{ width: '100%', position: 'relative' }}>
                <Slider {...this.getGenreSliderSettings()}>
                  {genreList.map((genre, index) => (
                    <Box key={index} sx={{ px: 2, paddingLeft: this.isMobile ? 0 : 2 }}>
                      <GenreCard data={genre} onClick={() => this.handleGenre(genre)} data-testid="genre-card" />
                    </Box>
                  ))}
                </Slider>
              </Box>
            </Box>
          </Box>
        </Container>
        <Footer />
        <Box
          position="fixed"
          bottom={16}
          right={16}
          zIndex={9999}
        >
        </Box>
      </>
    );
  }
}

export default withNavigate(HomePage);