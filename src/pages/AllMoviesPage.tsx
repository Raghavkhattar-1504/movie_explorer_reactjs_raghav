import { Component, Key } from 'react';
import Navbar from '../components/NavbarNew';
import Footer from '../components/Footer';
import {
    Box,
    Container,
    IconButton,
    Typography,
    Skeleton,
    Pagination
} from '@mui/material';
import MovieCard from '../components/MovieCard';
import Slider from 'react-slick';
import GenreCard from '../components/GenreCard';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import withNavigate from '../utils/HOC';
import { allMoviesAPI } from '../utils/API';

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

const genreList: string[] = [
    'Action', 'Sci-Fi', 'Romance', 'Drama', 'Thriller',
    'Dcoumentary', 'Comedy', 'Horror',
];

interface HomePageProps {
    navigate: Function;
}

interface HomePageState {
    windowWidth: number;
    moviesData: movie[];
    isLoading: boolean;
    currentPage: number;
    totalPages: number;
    genreState: string;
}

class AllMovies extends Component<HomePageProps, HomePageState> {
    constructor(props: HomePageProps) {
        super(props);
        this.state = {
            windowWidth: window.innerWidth,
            moviesData: [],
            isLoading: true,
            currentPage: 1,
            totalPages: 1,
            genreState: ''
        };
    }

    updateDimensions = () => {
        this.setState({ windowWidth: window.innerWidth });
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        const savedPage = localStorage.getItem('currentPage');
        const initialPage = savedPage ? parseInt(savedPage, 10) : 1;
        this.fetchMovies(initialPage);
        window.scrollTo(0, 0);

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    fetchMovies = async (page: number) => {
        try {
            this.setState({ isLoading: true });
            const response = await allMoviesAPI(page);
            const moviesData = response.movies.map((movie: any) => ({
                ...movie,
                genre: movie.genre.name,
            }));

            this.setState({
                moviesData,
                isLoading: false,
                currentPage: page,
                totalPages: response.totalPages || 10,
            });

            localStorage.setItem('currentPage', page.toString());
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error('Error fetching movies:', error);
            this.setState({ isLoading: false });
        }
    };

    handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        this.fetchMovies(value);
    }

    handleGenre = (genreName: string) => {
        let genreId = 3;

        if (genreName === 'Action') {
            genreId = 3
        }
        else if (genreName === 'Comedy') {
            genreId = 7
        }
        else if (genreName === 'Drama') {
            genreId = 8
        }
        else if (genreName === 'Sci-Fi') {
            genreId = 5
        }
        else if (genreName === 'Romance') {
            genreId = 1
        }
        else if (genreName === 'Horror') {
            genreId = 2
        }
        else if (genreName === 'Documentary') {
            genreId = 6
        }
        else if (genreName === 'Thriller') {
            genreId = 7
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
                    right: this.isMobile ? '2px' : '0px',
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
                    left: this.isMobile ? '2px' : '-10px',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
                }}
            >
                <ArrowBackIos fontSize="small" />
            </IconButton>
        );
    };

    getSliderSettings = () => {
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
            nextArrow: <this.NextArrow />,
            prevArrow: <this.PrevArrow />,
        };
    };

    renderSkeletons = (count = 5) => {
        return Array.from({ length: count }).map((_, index) => (
            <Box key={index} sx={{ px: 2, py: 1, width: this.isMobile ? '45vw' : 250 }}>
                <Skeleton variant="rectangular" data-testid="skeleton" width="100%" height={320} sx={{ borderRadius: 2, bgcolor: '#444' }} />
                <Skeleton width="60%" data-testid="skeleton" sx={{ bgcolor: '#555', mt: 1 }} />
            </Box>
        ));
    };

    render() {
        const paddingX = this.isMobile ? 0 : 3;
        return (
            <div>
                <Navbar />
                <Container maxWidth={false} disableGutters sx={{ padding: 0, margin: 0 }}>
                    <Box
                        sx={{
                            background: `linear-gradient(to right, #0a0a0a, #000a3a, #001a80, #0022aa)`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            width: '100vw',
                            minHeight: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            paddingX: paddingX,
                        }}
                    >
                        <Box sx={{ width: '100%', px: this.isMobile ? 1 : 3, py: 3 }}>
                            <Typography variant="h5" sx={{ color: 'white', fontSize: this.isMobile ? '20px' : '25px', mb: 2 }}>
                                TOP GENRES...
                            </Typography>
                            <Box sx={{ width: '100%', position: 'relative' }}>
                                <Slider {...this.getSliderSettings()}>
                                    {genreList.map((genre, index) => (
                                        <Box key={index} sx={{ px: 1 }}>
                                            <GenreCard data={genre} onClick={() => this.handleGenre(genre)} />
                                        </Box>
                                    ))}
                                </Slider>
                            </Box>
                        </Box>

                        <Typography sx={{ fontSize: this.isMobile ? '20px' : '25px', color: 'white', py: 2, width: '100%', px: this.isMobile ? 1 : 3 }}>
                            ALL MOVIES...
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: this.isMobile ? 'space-evenly' : 'center',
                                gap: this.isMobile ? 0 : 2,
                                width: '100%',
                                px: paddingX,
                            }}
                        >
                            {this.state.isLoading
                                ? this.renderSkeletons(this.isMobile ? 4 : 6)
                                : this.state.moviesData.map((data: movie, index: Key | null | undefined) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            flex: this.isMobile ? '0 0 48%' : '0 0 auto',
                                            mb: 2,
                                            maxWidth: 260,
                                        }}
                                    >
                                        <MovieCard data={data} />
                                    </Box>
                                ))}
                        </Box>

                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Pagination
                                count={this.state.totalPages}
                                page={this.state.currentPage}
                                onChange={this.handlePageChange}
                                variant="outlined"
                                shape="rounded"
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        color: 'white',
                                        borderColor: 'white',
                                        mb: 5,
                                    },
                                    '& .MuiPaginationItem-root.Mui-selected': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                    },
                                    '& .MuiPaginationItem-root.Mui-selected:hover': {
                                        backgroundColor: 'white',
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default withNavigate(AllMovies);
