import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from '../components/Search';
import * as api from '../utils/API'; 
import { movie } from '../components/MovieCard';
import '@testing-library/jest-dom';


jest.mock('../components/MovieCard', () => ({
  __esModule: true,
  default: ({ data }: { data: movie }) => <div data-testid="movie-card">{data.title}</div>,
}));

const mockMovies = [
  { id: 1, title: 'Inception' },
  { id: 2, title: 'The Matrix' },
];

jest.spyOn(api, 'allMoviesAPI').mockResolvedValue({ movies: mockMovies });
jest.spyOn(api, 'searchMovieAPI').mockImplementation(async (_page, query) => {
  return {
    movies: query === 'Matrix' ? [{ id: 2, title: 'The Matrix' }] : [],
  };
});

describe('Search Component', () => {
  beforeEach(async () => {
    render(<Search />);
    await waitFor(() => screen.getByText(/RECOMMENDED FOR YOU/i));
  });

  it('renders the heading and input', () => {
    expect(screen.getByText(/SEARCH MOVIES/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search for a movie/i)).toBeInTheDocument();
  });

  it('shows recommended movies after initial load', async () => {
    const cards = await screen.findAllByTestId('movie-card');
    expect(cards).toHaveLength(mockMovies.length);
    expect(cards[0]).toHaveTextContent('Inception');
    expect(cards[1]).toHaveTextContent('The Matrix');
  });

it('shows message when no movies are found on search', async () => {
  const input = screen.getByPlaceholderText(/search for a movie/i);
  fireEvent.change(input, { target: { value: 'Unknown' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  await waitFor(() => screen.getByText(/No movies found/i));
  expect(screen.getByText(/No movies found/i)).toBeInTheDocument();
  expect(screen.queryByText(/RESULTS FOR "Unknown"/i)).toBeInTheDocument();
});

});
