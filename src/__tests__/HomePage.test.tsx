import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import { peopleChoiceAPI } from '../utils/API';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../utils/API', () => ({
  peopleChoiceAPI: jest.fn(),
}));

jest.mock('../components/Carousel', () => () => <div data-testid="carousel">Carousel Component</div>);
jest.mock('../components/MovieCard', () => ({ data }: { data: any }) => (
  <div data-testid="movie-card">{data.title}</div>
));
jest.mock('../components/GenreCard', () => ({ data, onClick }: { data: string; onClick: () => void }) => (
  <div data-testid="genre-card" onClick={onClick}>
    {data}
  </div>
));
jest.mock('../components/AnimatedButton', () => () => <button data-testid="suggest-movie-button">Suggest Movie</button>);

describe('HomePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockMovies = [
    {
      id: 1,
      title: 'Movie 1',
      genre: { name: 'Action' },
      rating: 4.5,
      poster: 'poster1.jpg',
      coverimag: 'cover1.jpg',
      description: 'Description 1',
      director: 'Director 1',
      duration: 120,
      plan: 'Premium',
      poster_url: 'poster1.jpg',
      banner_url: 'banner1.jpg',
    },
    {
      id: 2,
      title: 'Movie 2',
      genre: { name: 'Drama' },
      rating: 4.0,
      poster: 'poster2.jpg',
      coverimag: 'cover2.jpg',
      description: 'Description 2',
      director: 'Director 2',
      duration: 150,
      plan: 'Basic',
      poster_url: 'poster2.jpg',
      banner_url: 'banner2.jpg',
    },
  ];

  const genreList = [
    'Action',
    'Sci-Fi',
    'Romance',
    'Drama',
    'Thriller',
    'Documentary',
    'Comedy',
    'Horror',
  ];

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  test('renders loading skeletons while fetching data', async () => {
    (peopleChoiceAPI as jest.Mock).mockResolvedValue({ movies: [] });

    renderWithRouter(<HomePage />);

    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBeGreaterThan(0);

    await waitFor(() => {
      expect(screen.queryAllByTestId('skeleton')).toHaveLength(0);
    });
  });


  test('renders Suggest Movie button', () => {
    renderWithRouter(<HomePage />);

    const suggestMovieButton = screen.getByTestId('suggest-movie-button');
    expect(suggestMovieButton).toBeInTheDocument();
  });

  test('handles API error gracefully', async () => {
    (peopleChoiceAPI as jest.Mock).mockRejectedValue(new Error('API Error'));

    renderWithRouter(<HomePage />);

    await waitFor(() => {
      expect(screen.queryAllByTestId('skeleton')).toHaveLength(0);
    });

    const movieCards = screen.queryAllByTestId('movie-card');
    expect(movieCards.length).toBe(0);
  });
});