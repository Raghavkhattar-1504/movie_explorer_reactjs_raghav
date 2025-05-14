import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavbarNew from '../components/NavbarNew';
import { logoutAPI } from '../utils/API';
import '@testing-library/jest-dom';

jest.mock('../utils/API', () => ({
  logoutAPI: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('../utils/HOC', () => {
  return (Component: any) => {
    return (props: any) => <Component {...props} navigate={mockNavigate} />;
  };
});

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

const mockResize = (width: number) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
};

const renderNavbar = (props = {}) => {
  return render(
    <BrowserRouter>
      <NavbarNew {...props} />
    </BrowserRouter>
  );
};

describe('NavbarNew Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockClear();
    window.innerWidth = 1024; 
  });

  test('renders navbar title', () => {
    renderNavbar();
    expect(screen.getByText('MOVIE EXPLORER')).toBeInTheDocument();
    expect(screen.getByTestId('circle-play-icon')).toBeInTheDocument();
  });

  test('renders icons in desktop view', () => {
    renderNavbar();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    expect(screen.getByTestId('monitor-play-icon')).toBeInTheDocument();
    expect(screen.getByTestId('receipt-indian-rupee-icon')).toBeInTheDocument();
    expect(screen.getByTestId('user-circle-icon')).toBeInTheDocument();
  });

  test('hides icons in mobile view', () => {
    mockResize(767); 
    renderNavbar();
    expect(screen.queryByTestId('search-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('monitor-play-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('receipt-indian-rupee-icon')).not.toBeInTheDocument();
    expect(screen.getByTestId('user-circle-icon')).toBeInTheDocument();
  });

  test('renders login button when user is not logged in', () => {
    mockLocalStorage.getItem.mockReturnValue(null); 
    renderNavbar();
    fireEvent.click(screen.getByTestId('user-circle-icon'));
    expect(screen.getByTestId('login-item')).toHaveTextContent(/Login\/Signup/i);
  });

  test('renders logout and supervisor items when logged in as supervisor', async () => {
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'token') return 'mock-token';
      if (key === 'role') return 'supervisor';
      return null;
    });
    renderNavbar();
    fireEvent.click(screen.getByTestId('user-circle-icon'));
    expect(screen.getByTestId('logout-item')).toHaveTextContent(/Logout/i);
    expect(screen.getByTestId('add-movie-item')).toHaveTextContent(/Add Movie/i);
  });

  test('renders "No Subscription" for regular user', () => {
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'token') return 'mock-token';
      if (key === 'role') return 'user';
      return null;
    });
    renderNavbar();
    fireEvent.click(screen.getByTestId('user-circle-icon'));
    expect(screen.getByTestId('no-subscription-item')).toHaveTextContent(/No Subscription/i);
    expect(screen.getByTestId('profile-item')).toHaveTextContent(/Profile/i);
    expect(screen.getByTestId('account-item')).toHaveTextContent(/My account/i);
  });

  test('calls logoutAPI and navigates on logout', async () => {
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'token') return 'mock-token';
      return null;
    });
    (logoutAPI as jest.Mock).mockResolvedValue({});
    renderNavbar();
    fireEvent.click(screen.getByTestId('user-circle-icon'));
    const logoutButton = screen.getByTestId('logout-item');
    fireEvent.click(logoutButton);
    await waitFor(() => {
      expect(logoutAPI).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('navigates to correct routes on icon clicks', () => {
    renderNavbar();
    fireEvent.click(screen.getByTestId('circle-play-icon'));
    expect(mockNavigate).toHaveBeenCalledWith('/');

    fireEvent.click(screen.getByTestId('search-icon'));
    expect(mockNavigate).toHaveBeenCalledWith('/search');

    fireEvent.click(screen.getByTestId('monitor-play-icon'));
    expect(mockNavigate).toHaveBeenCalledWith('/allmovies');

    fireEvent.click(screen.getByTestId('receipt-indian-rupee-icon'));
    expect(mockNavigate).toHaveBeenCalledWith('/subscription');
  });
});