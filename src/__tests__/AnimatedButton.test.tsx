import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SuggestMovieButton from '../components/AnimatedButton';
import { fetchRandomMovieId, movieDetailsAPI } from '../utils/API';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../utils/API');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('SuggestMovieButton Component', () => {
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    (fetchRandomMovieId as jest.Mock).mockResolvedValue(123);
    (movieDetailsAPI as jest.Mock).mockResolvedValue({
      id: 123,
      title: 'Random Movie',
      genre: 'Action',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders button with correct text when not loading', () => {
    render(<SuggestMovieButton />);

    const button = screen.getByText('SUGGEST A MOVIE!');
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  test('navigates to movie details page on successful API call', async () => {
    render(<SuggestMovieButton />);

    const button = screen.getByText('SUGGEST A MOVIE!');
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetchRandomMovieId).toHaveBeenCalledTimes(1);
      expect(movieDetailsAPI).toHaveBeenCalledWith(123);
      expect(mockNavigate).toHaveBeenCalledWith('/home/detail/123');
    });
  });

  test('handles null movie ID gracefully', async () => {
    (fetchRandomMovieId as jest.Mock).mockResolvedValue(null);

    render(<SuggestMovieButton />);

    const button = screen.getByText('SUGGEST A MOVIE!');
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetchRandomMovieId).toHaveBeenCalledTimes(1);
      expect(movieDetailsAPI).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  test('handles API error gracefully', async () => {
    (fetchRandomMovieId as jest.Mock).mockRejectedValue(new Error('API Error'));

    render(<SuggestMovieButton />);

    const button = screen.getByText('SUGGEST A MOVIE!');
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetchRandomMovieId).toHaveBeenCalledTimes(1);
      expect(movieDetailsAPI).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});