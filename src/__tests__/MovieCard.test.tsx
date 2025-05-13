import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieCard, { movie } from '../components/MovieCard';
import '@testing-library/jest-dom';

const mockMovie: movie = {
  id: 1,
  title: 'Inception',
  genre: { name: 'Sci-Fi' },
  rating: 8.8,
  description: 'A thief who steals corporate secrets through dream-sharing technology...',
  director: 'Christopher Nolan',
  duration: 148,
  plan: 'premium',
  poster_url: 'https://example.com/inception.jpg',
  banner_url: 'https://example.com/banner.jpg',
};

describe('MovieCard Component', () => {
  test('renders movie poster image', () => {
    render(
      <MemoryRouter>
        <MovieCard data={mockMovie} />
      </MemoryRouter>
    );
    const posterImg = screen.getByAltText(/movie poster/i) as HTMLImageElement;
    expect(posterImg).toBeInTheDocument();
    expect(posterImg.src).toBe(mockMovie.poster_url);
  });

  test('displays movie title', () => {
    render(
      <MemoryRouter>
        <MovieCard data={mockMovie} />
      </MemoryRouter>
    );
    expect(screen.getByText(/inception/i)).toBeInTheDocument();
  });

  test('displays genre as a chip or styled text', () => {
    render(
      <MemoryRouter>
        <MovieCard data={mockMovie} />
      </MemoryRouter>
    );
    expect(screen.getByText(mockMovie.genre.name)).toBeInTheDocument();
  });

  test('shows movie rating with a star icon', () => {
    render(
      <MemoryRouter>
        <MovieCard data={mockMovie} />
      </MemoryRouter>
    );
    expect(screen.getByText(/8.8\/10/i)).toBeInTheDocument();
  });

  test('renders "More Info" button', () => {
    render(
      <MemoryRouter>
        <MovieCard data={mockMovie} />
      </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: /more info/i });
    expect(button).toBeInTheDocument();
  });

  test('navigates to movie detail page when clicked', async () => {
    render(
      <MemoryRouter>
        <MovieCard data={mockMovie} />
      </MemoryRouter>
    );

    const cardLink = screen.getByRole('link');
    expect(cardLink).toHaveAttribute('href', `/home/detail/${mockMovie.id}`);
  });
});
