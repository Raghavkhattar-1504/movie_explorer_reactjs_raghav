import { render, screen, fireEvent } from '@testing-library/react';
import GenreCard from '../components/GenreCard';
import '@testing-library/jest-dom';

describe('GenreCard Component', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the genre name', () => {
    render(<GenreCard data="Action" onClick={mockOnClick} />);
    const genreText = screen.getByText('Action');
    expect(genreText).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    render(<GenreCard data="Comedy" onClick={mockOnClick} />);
    const genreCard = screen.getByText('Comedy');
    fireEvent.click(genreCard);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith('Comedy');
  });
});
