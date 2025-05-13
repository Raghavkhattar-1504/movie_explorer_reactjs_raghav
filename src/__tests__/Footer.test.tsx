import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';
import '@testing-library/jest-dom';

describe('Footer Component', () => {
  test('renders the footer with thank you message', () => {
    render(<Footer />);
    const thankYouMessage = screen.getByText(/thank you for visiting us!/i);
    expect(thankYouMessage).toBeInTheDocument();
  });

  test('renders the tagline', () => {
    render(<Footer />);
    const tagline = screen.getByText(/hope the movie hit you harder than your espresso/i);
    expect(tagline).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<Footer />);
    const links = ['Home', 'All Movies', 'Feedback', 'Help'];
    links.forEach((linkText) => {
      const link = screen.getByText(linkText);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '#');
    });
  });

  test('renders copyright text', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/© 1990-2025 by MovieExplorer.com, Inc./i);
    expect(copyrightText).toBeInTheDocument();
  });

  test('renders all navigation links with arrow symbol', () => {
    render(<Footer />);
    const links = screen.getAllByText(/↗/);
    expect(links.length).toBe(4); 
  });
});