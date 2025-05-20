import React, { Component, createRef } from 'react';
import Box from '@mui/material/Box';
import {
  CirclePlay,
  MonitorPlay,
  ReceiptIndianRupee,
  Search,
  UserCircle,
} from 'lucide-react';
import {
  Tooltip,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { logoutAPI } from '../utils/API';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import withNavigate from '../utils/HOC';
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface NavbarState {
  anchorEl: null | HTMLElement;
  isMobile: boolean;
}

interface NavbarProps {
  navigate: (path: string) => void;
}

class NavbarNew extends Component<NavbarProps, NavbarState> {
  searchIconRef = createRef<HTMLDivElement>();

  state: NavbarState = {
    anchorEl: null,
    isMobile: window.innerWidth < 768,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth < 768 });
  };

  handleHomeIconClick = () => {
    this.props.navigate('/');
  };

  handleAllMoviesIconClick = () => {
    this.props.navigate('/allmovies');
  };

  handleSubscriptionIconClick = () => {
    const status = localStorage.getItem('plan_type');
    if (status === 'premium') {
      toast.error('Your subscription is already active');
    } else {
      this.props.navigate('/subscription');
    }
  };


  handleSubscription = () => {
    const status = localStorage.getItem('plan_type');
    return status === 'premium' ? true : false;
  }

  handleSearchClick = () => {
    this.props.navigate('/search');
  };

  handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleWatchlist = () => {
    window.location.href = '/watchlist';
  }

  handleSignOut = async () => {
    try {
      await logoutAPI();
      this.props.navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      this.setState({ anchorEl: null });
    }
  };

  render() {
    const { anchorEl, isMobile } = this.state;
    const username = localStorage.getItem('name')?.split(' ')[0];
    const open = Boolean(anchorEl);
    const isLoggedIn = !!localStorage.getItem('token');
    const isSupervisor = localStorage.getItem('role') === 'supervisor';

    return (
      <Box
        component="section"
        sx={{
          gap: '3vw',
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#000113',
          padding: '0 4vw',
          height: '10vh',
          zIndex: 2,
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: '8px',
            background: 'linear-gradient(to bottom, #000113, transparent)',
            pointerEvents: 'none',
            zIndex: -1,
          },
        }}
      >

        <Typography
          sx={{
            fontSize: isMobile ? "20px" : "27px",
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            gap: 1,
            '& svg:hover': {
              color: '#6C63FF',
            },
            cursor: 'pointer',
          }}
        >
          <CirclePlay
            size={isMobile ? "20px" : "27px"}
            onClick={this.handleHomeIconClick}
            data-testid="circle-play-icon"
          />
          MOVIE EXPLORER
        </Typography>
        <ToastContainer
          position={window.innerWidth <= 600 ? 'top-center' : 'top-right'}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastStyle={{
            backgroundColor: '#1a1a3d',
            color: '#fff',
            border: '1px solid #6C63FF',
            borderRadius: '8px',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: 'white',
            fontSize: '30px',
            position: 'relative',
            '& svg:hover': {
              color: '#6C63FF',
              cursor: 'pointer',
            },
          }}
        >
          {!isMobile && (
            <>
              <Tooltip title="Search" arrow>
                <Box
                  ref={this.searchIconRef}
                  onClick={this.handleSearchClick}
                  data-testid="search-icon"
                >
                  <Search size="27px" />
                </Box>
              </Tooltip>

              <Tooltip title="All Movies" arrow>
                <Box
                  onClick={this.handleAllMoviesIconClick}
                  data-testid="monitor-play-icon"
                >
                  <MonitorPlay size="27px" />
                </Box>
              </Tooltip>

              <Tooltip title="Buy Subscription" arrow>
                <Box
                  onClick={this.handleSubscriptionIconClick}
                  data-testid="receipt-indian-rupee-icon"
                >
                  <ReceiptIndianRupee size="27px" />
                </Box>
              </Tooltip>
            </>
          )}

          <Tooltip title="Profile" arrow>
            <Box
              onClick={this.handleMenuClick}
              sx={{ marginTop: isMobile ? 1 : 0, color: 'white' }}
              data-testid="user-circle-icon"
            >
              <UserCircle size={27} />
            </Box>
          </Tooltip>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleMenuClose}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 150,
                bgcolor: '#1a1a1a',
                color: 'white',
              },
            }}
          >
            {isLoggedIn ? (
              [
                !isSupervisor && (
                  <MenuItem
                    onClick={this.handleMenuClose}
                    key="profile"
                    data-testid="profile-item"
                  >
                    <PermIdentityIcon sx={{ marginRight: 1 }} />
                    Hi, {username}
                  </MenuItem>
                ),

                isMobile && [
                  <MenuItem
                    onClick={this.handleSearchClick}
                    sx={{ color: 'white' }}
                    key="search"
                  >
                    <Search size={20} style={{ marginRight: 8, color: 'white' }} />
                    Search
                  </MenuItem>,
                  <NavLink
                    to='/allmovies'
                    style={{ textDecoration: 'none' }}
                    key="allmovies"
                  >
                    <MenuItem sx={{ color: 'white' }}>
                      <MonitorPlay
                        size={20}
                        style={{ marginRight: 8, color: 'white' }}
                      />
                      All Movies
                    </MenuItem>
                  </NavLink>,
                ],

                isSupervisor && (
                  <NavLink
                    to="/addMovie"
                    style={{ textDecoration: 'none', color: 'white' }}
                    key="addmovie"
                  >
                    <MenuItem onClick={this.handleMenuClose} data-testid="add-movie-item">
                      <MovieCreationIcon sx={{ marginRight: 1 }} />
                      Add Movie
                    </MenuItem>
                  </NavLink>
                ),

                

                <MenuItem
                  onClick={this.handleWatchlist}
                  key="watchlist"
                  data-testid="watchlist-item"
                >
                  <BookmarkBorderIcon sx={{ marginRight: 1 }} />
                  Watchlist
                </MenuItem>,

                <NavLink
                  to='/subscription'
                  style={{ textDecoration: 'none' }}
                  key="subscription"
                >
                  <MenuItem
                    onClick={this.handleMenuClose}
                    sx={{ color: 'white' }}
                    data-testid="no-subscription-item"
                  >
                    <LoyaltyOutlinedIcon sx={{ marginRight: 1 }} />
                    {this.handleSubscription() ? "Active Subscription" : "No Subscription"}
                  </MenuItem>
                </NavLink>,

                <MenuItem
                  onClick={this.handleSignOut}
                  key="logout"
                  data-testid="logout-item"
                >
                  <Logout sx={{ marginRight: 1 }} />
                  Logout
                </MenuItem>,
              ]
            ) : (
              <MenuItem
                onClick={() => this.props.navigate('/login')}
                data-testid="login-item"
              >
                <Logout sx={{ marginRight: 1 }} />
                Login/Signup
              </MenuItem>
            )}
          </Menu>
        </Box>

      </Box>
    );
  }
}

export default withNavigate(NavbarNew);