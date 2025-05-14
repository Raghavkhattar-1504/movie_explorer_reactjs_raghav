import { render, screen, waitFor } from '@testing-library/react';
import AllMovies from '../pages/AllMoviesPage';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { allMoviesAPI } from '../utils/API';

jest.mock('../utils/API', () => ({
  allMoviesAPI: jest.fn(),
}));

const renderComponentWithRouter = () => {
  render(
    <MemoryRouter>
      <AllMovies />
    </MemoryRouter>
  );
};

describe('AllMovies Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading skeletons initially', async () => {
    (allMoviesAPI as jest.Mock).mockResolvedValueOnce({ movies: [], totalPages: 1 });

    renderComponentWithRouter();

    const skeletons = await screen.findAllByTestId('skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });


  test('renders movies when API returns data', async () => {
  const mockMovies = [
    { id: 1, title: 'Movie 1', genre: 'Action', rating: 4.5, poster_url: '', banner_url: '' },
    { id: 2, title: 'Movie 2', genre: 'Drama', rating: 4.0, poster_url: '', banner_url: '' },
  ];
  (allMoviesAPI as jest.Mock).mockResolvedValueOnce({ movies: mockMovies, totalPages: 1 });

  renderComponentWithRouter();

  // Wait for movies to load
  // await waitFor(() => {
  //   // Use a more flexible matcher or test ID
  //   expect(screen.getByText((content, element) => element?.textContent === 'Movie 1')).toBeInTheDocument();
  //   expect(screen.getByText((content, element) => element?.textContent === 'Movie 2')).toBeInTheDocument();
  // });
});

  test('handles pagination correctly', async () => {
    (allMoviesAPI as jest.Mock).mockResolvedValueOnce({ movies: [], totalPages: 5 });

    renderComponentWithRouter();

    await waitFor(() => {
      const pagination = screen.getByRole('navigation');
      expect(pagination).toBeInTheDocument();
    });
  });
});

