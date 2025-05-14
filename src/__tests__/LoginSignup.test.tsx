import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthPage from '../pages/AuthPage';
import { loginAPI, signUpAPI } from '../utils/API';
import { toast } from 'react-toastify';
import '@testing-library/jest-dom';

jest.mock('../utils/API');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => null,
}));
jest.mock('../utils/HOC', () => (Component: any) => (props: any) =>
  <Component {...props} navigate={jest.fn()} />
);

describe('AuthPage Component', () => {
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockNavigate = jest.fn();
    jest.clearAllMocks();
  });

  const mockLoginAPI = loginAPI as jest.Mock;
  const mockSignUpAPI = signUpAPI as jest.Mock;

  test('renders login form by default', () => {
    render(<AuthPage navigate={mockNavigate} />);

    expect(screen.getByLabelText('EMAIL')).toBeInTheDocument();
    expect(screen.getByLabelText('PASSWORD')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'LOGIN' })).toBeInTheDocument();

    expect(screen.queryByLabelText('NAME')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('CONFIRM PASSWORD')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('PHONE NUMBER')).not.toBeInTheDocument();
  });

  test('toggles to signup form when SIGNUP is clicked', async () => {
    render(<AuthPage navigate={mockNavigate} />);

    await userEvent.click(screen.getByText('SIGNUP'));

    expect(screen.getByLabelText('NAME')).toBeInTheDocument();
    expect(screen.getByLabelText('EMAIL')).toBeInTheDocument();
    expect(screen.getByLabelText('PASSWORD')).toBeInTheDocument();
    expect(screen.getByLabelText('CONFIRM PASSWORD')).toBeInTheDocument();
    expect(screen.getByLabelText('PHONE NUMBER')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SIGN UP' })).toBeInTheDocument();
  });

  test('displays validation errors for invalid login form inputs', async () => {
    render(<AuthPage navigate={mockNavigate} />);

    await userEvent.click(screen.getByRole('button', { name: 'LOGIN' }));

    expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
  });

  test('displays validation errors for invalid signup form inputs', async () => {
    render(<AuthPage navigate={mockNavigate} />);

    await userEvent.click(screen.getByText('SIGNUP'));

    await userEvent.click(screen.getByRole('button', { name: 'SIGN UP' }));

    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid 10-digit number')).toBeInTheDocument();
  });

  test('submits login form successfully', async () => {
  mockLoginAPI.mockResolvedValue({
    auth_info: { access_token: { token: 'mock-token' } },
    user: { role: 'user' },
  });

  render(<AuthPage navigate={mockNavigate} />);

  await userEvent.type(screen.getByLabelText('EMAIL'), 'test@example.com');
  await userEvent.type(screen.getByLabelText('PASSWORD'), 'password123');
  await userEvent.click(screen.getByRole('button', { name: 'LOGIN' }));

  await waitFor(() => {
    expect(mockLoginAPI).toHaveBeenCalledWith({
      user: { email: 'test@example.com', password: 'password123' },
    });
    expect(toast.success).toHaveBeenCalledWith('Login successful!', expect.any(Object));
  });
});

  test('handles login API error', async () => {
    mockLoginAPI.mockRejectedValue(new Error('Login failed'));

    render(<AuthPage navigate={mockNavigate} />);

    await userEvent.type(screen.getByLabelText('EMAIL'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('PASSWORD'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'LOGIN' }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('An error occurred. Please try again.');
    });
  });

  test('submits signup form successfully', async () => {
    mockSignUpAPI.mockResolvedValue({});

    render(<AuthPage navigate={mockNavigate} />);

    await userEvent.click(screen.getByText('SIGNUP'));

    await userEvent.type(screen.getByLabelText('NAME'), 'John Doe');
    await userEvent.type(screen.getByLabelText('EMAIL'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('PASSWORD'), 'password123');
    await userEvent.type(screen.getByLabelText('CONFIRM PASSWORD'), 'password123');
    await userEvent.type(screen.getByLabelText('PHONE NUMBER'), '1234567890');
    await userEvent.click(screen.getByRole('button', { name: 'SIGN UP' }));

    await waitFor(() => {
      expect(mockSignUpAPI).toHaveBeenCalledWith({
        user: {
          name: 'John Doe',
          email: 'test@example.com',
          password: 'password123',
          confirm_password: 'password123',
          phone_number: '1234567890',
        },
      });
      expect(toast.success).toHaveBeenCalledWith('Signup successful! Please log in.', expect.any(Object));
    });
  });

  test('handles signup API error', async () => {
    mockSignUpAPI.mockRejectedValue(new Error('Signup failed'));

    render(<AuthPage navigate={mockNavigate} />);

    await userEvent.click(screen.getByText('SIGNUP'));

    await userEvent.type(screen.getByLabelText('NAME'), 'John Doe');
    await userEvent.type(screen.getByLabelText('EMAIL'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('PASSWORD'), 'password123');
    await userEvent.type(screen.getByLabelText('CONFIRM PASSWORD'), 'password123');
    await userEvent.type(screen.getByLabelText('PHONE NUMBER'), '1234567890');
    await userEvent.click(screen.getByRole('button', { name: 'SIGN UP' }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('An error occurred. Please try again.');
    });
  });
});