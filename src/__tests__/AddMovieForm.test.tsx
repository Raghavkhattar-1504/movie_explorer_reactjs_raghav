import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddMovieForm from '../pages/AddMoviePage';
import '@testing-library/jest-dom';

describe('AddMovieForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  test('renders form fields correctly', () => {
    renderWithRouter(<AddMovieForm />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Director/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Genre ID/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/True/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/False/i)).toBeInTheDocument();

    expect(screen.getByText(/Poster Image:/i)).toBeInTheDocument();
    expect(screen.getByText(/Banner Image:/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Add Movie/i })).toBeInTheDocument();
  });

  test('handles input changes correctly', () => {
    renderWithRouter(<AddMovieForm />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Inception' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'A mind-bending thriller.' } });
    fireEvent.change(screen.getByLabelText(/Director/i), { target: { value: 'Christopher Nolan' } });

    expect(screen.getByLabelText(/Title/i)).toHaveValue('Inception');
    expect(screen.getByLabelText(/Description/i)).toHaveValue('A mind-bending thriller.');
    expect(screen.getByLabelText(/Director/i)).toHaveValue('Christopher Nolan');
  });

  test('handles genre selection correctly', () => {
    renderWithRouter(<AddMovieForm />);

    const genreSelect = screen.getByLabelText(/Genre ID/i);
    fireEvent.change(genreSelect, { target: { value: '3' } });

    expect(genreSelect).toHaveValue('3');
  });

  test('handles plan radio selection', () => {
    renderWithRouter(<AddMovieForm />);

    const premiumRadio = screen.getByLabelText(/True/i);
    fireEvent.click(premiumRadio);

    expect(premiumRadio).toBeChecked();
    expect(screen.getByLabelText(/False/i)).not.toBeChecked();
  });

  test('handles file uploads for poster and banner', () => {
    renderWithRouter(<AddMovieForm />);

    const posterFile = new File(['poster'], 'poster.png', { type: 'image/png' });
    const bannerFile = new File(['banner'], 'banner.jpg', { type: 'image/jpeg' });

    const posterInput = screen.getByText(/Poster Image:/i).nextElementSibling as HTMLInputElement;
    const bannerInput = screen.getByText(/Banner Image:/i).nextElementSibling as HTMLInputElement;

    fireEvent.change(posterInput, { target: { files: [posterFile] } });
    fireEvent.change(bannerInput, { target: { files: [bannerFile] } });

    expect(posterInput.files?.[0]).toEqual(posterFile);
    expect(bannerInput.files?.[0]).toEqual(bannerFile);
  });

  test('submits the form with valid inputs', async () => {
    renderWithRouter(<AddMovieForm />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Interstellar' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Sci-fi space journey' } });
    fireEvent.change(screen.getByLabelText(/Director/i), { target: { value: 'Nolan' } });
    fireEvent.change(screen.getByLabelText(/Genre ID/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Year/i), { target: { value: '2014' } });

    fireEvent.click(screen.getByLabelText(/True/i));

    const posterFile = new File(['poster'], 'poster.png', { type: 'image/png' });
    const bannerFile = new File(['banner'], 'banner.jpg', { type: 'image/jpeg' });
    fireEvent.change(screen.getByText(/Poster Image:/i).nextElementSibling as HTMLInputElement, {
      target: { files: [posterFile] },
    });
    fireEvent.change(screen.getByText(/Banner Image:/i).nextElementSibling as HTMLInputElement, {
      target: { files: [bannerFile] },
    });

    const form = screen.getByRole('form', { name: 'add-movie-form' });
    fireEvent.submit(form);
  });
});