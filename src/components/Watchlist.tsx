import { Component} from 'react';
import {
    Box,
    Container,
    Typography,
    Skeleton,
} from '@mui/material';
import MovieCard from '../components/MovieCard';
import withNavigate from '../utils/HOC';
import { getWatchlistMoviesAPI } from '../utils/API';

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
    moviesData: movie[];
    isLoading: boolean;
    currentPage: number;
    totalPages: number;
}

class Watchlist extends Component<HomePageProps, HomePageState> {
    constructor(props: HomePageProps) {
        super(props);
        this.state = {
            windowWidth: window.innerWidth,
            moviesData: [],
            isLoading: true,
            currentPage: 1,
            totalPages: 1
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
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    fetchMovies = async (page: number) => {
        try {
            this.setState({ isLoading: true });

            const response = await getWatchlistMoviesAPI();

            this.setState({
                moviesData: response,
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

    get isMobile() {
        return this.state.windowWidth < 600;
    }

    get isTablet() {
        return this.state.windowWidth >= 600 && this.state.windowWidth < 960;
    }

    renderSkeletons = (count = 5) => {
        return Array.from({ length: count }).map((_, index) => (
            <Box key={index} sx={{ px: this.isMobile ? 1 : 2, py: 1, width: this.isMobile ? '47vw' : 250 }}>
                <Skeleton variant="rectangular" data-testid="skeleton" width="100%" height={this.isMobile ? 220 : 320} sx={{ borderRadius: 2, bgcolor: '#444' }} />
                <Skeleton width="60%" data-testid="skeleton" sx={{ bgcolor: '#555', mt: 1 }} />
            </Box>
        ));
    };

    render() {
        const paddingX = this.isMobile ? 1 : 3;
        return (
            <>
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
                        <Typography sx={{ fontSize: this.isMobile ? '20px' : '25px', color: 'white', py: 2, width: '100%', textAlign: 'center' }}>
                            WATCHLISTED MOVIES...
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                gap: this.isMobile ? 0 : 2,
                                width: '100%',
                                px: this.isMobile ? 0 : paddingX,
                            }}
                        >
                            {this.state.isLoading
                                ? this.renderSkeletons(this.isMobile ? 3 : 6)
                                : (
                                    this.state.moviesData.length > 0 ? (
                                        this.state.moviesData.map((movie) => (
                                            <MovieCard key={movie.id} data={movie} />
                                        ))
                                    ) : (
                                        <Typography sx={{ color: 'white', mt: 30, opacity: 0.6, fontSize: '30px' }}>
                                            No movies in your watchlist :(
                                        </Typography>
                                    )
                                )
                            }
                        </Box>
                    </Box>
                </Container>
            </>
        );
    }
}

export default withNavigate(Watchlist);
