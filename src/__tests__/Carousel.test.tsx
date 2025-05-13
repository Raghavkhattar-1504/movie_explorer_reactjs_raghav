import { render, screen } from '@testing-library/react';
import MainCarousel from '../components/Carousel';
import '@testing-library/jest-dom';

jest.mock('react-slick', () => {
  return ({ children }: any) => <div data-testid="mock-slider">{children}</div>;
});

describe('MainCarousel Component', () => {
  test('renders carousel with all movie titles', () => {
    render(<MainCarousel />);

    expect(screen.getByText('Dune')).toBeInTheDocument();
    expect(screen.getByText('The Martian')).toBeInTheDocument();
    expect(screen.getByText('500 Days of Summer')).toBeInTheDocument();
  });

  test('renders posters for all movies', () => {
    render(<MainCarousel />);
    
    const posterImages = screen.getAllByRole('img');
    expect(posterImages.length).toBeGreaterThanOrEqual(3);
    posterImages.forEach(img => {
      expect(img).toHaveAttribute('src');
    });
  });

  test('displays movie descriptions', () => {
    render(<MainCarousel />);
    
    expect(
      screen.getByText(/A soldier fighting aliens gets to relive/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/An astronaut becomes stranded on Mars/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/After being dumped by the girl he believes/i)
    ).toBeInTheDocument();
  });

  test('renders image background and overlay', () => {
    render(<MainCarousel />);
    const backgroundBoxes = screen.getAllByTestId('mock-slider');

    expect(backgroundBoxes.length).toBe(1);
  });
});
