import { render, screen, waitFor } from '@testing-library/react';
import GenrePage from '../pages/GenrePage';
import { getMoviesByGenre } from '../utils/API';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../utils/API', () => ({
  getMoviesByGenre: jest.fn(),
}));

const mockMovies = [
  {
    id: '1',
    title: 'Movie 1',
    genre: ['Action'],
    poster: 'poster1.jpg',
    rating: 4.5,
    description: 'Description 1',
    director: 'Director 1',
    duration: '2h',
    releaseDate: '2023-01-01',
  },
  {
    id: '2',
    title: 'Movie 2',
    genre: ['Drama'],
    poster: 'poster2.jpg',
    rating: 4.0,
    description: 'Description 2',
    director: 'Director 2',
    duration: '1h 45m',
    releaseDate: '2023-02-01',
  },
];

const renderWithRouter = (genre: string) => {
  return render(
    <MemoryRouter initialEntries={[`/genre/${genre}`]}>
      <Routes>
        <Route path="/genre/:genre" element={<GenrePage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('GenrePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders skeletons while loading', async () => {
    (getMoviesByGenre as jest.Mock).mockImplementation(() => new Promise(() => {})); 

    renderWithRouter('Action');

    const skeletons = screen.getAllByTestId('skeleton-loader');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test('renders movies after API call', async () => {
  (getMoviesByGenre as jest.Mock).mockResolvedValue(mockMovies);

  renderWithRouter('Action');

  await waitFor(() => {
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });
});

  test('renders correct genre title', async () => {
    (getMoviesByGenre as jest.Mock).mockResolvedValue(mockMovies);

    renderWithRouter('Action');

    await waitFor(() => {
      const genreTitle = screen.getByText(/ACTION MOVIES/i);
      expect(genreTitle).toBeInTheDocument();
    });
  });

  test('handles empty movie list gracefully', async () => {
    (getMoviesByGenre as jest.Mock).mockResolvedValue([]);

    renderWithRouter('Comedy');

    await waitFor(() => {
      expect(screen.getByText(/COMEDY MOVIES/i)).toBeInTheDocument();
      expect(screen.queryByText('Movie 1')).not.toBeInTheDocument();
    });
  });
});
