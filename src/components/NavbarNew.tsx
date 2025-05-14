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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import withNavigate from '../utils/HOC';
import { NavLink } from 'react-router-dom';

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
    this.props.navigate('/subscription');
  };

  handleSearchClick = () => {
    this.props.navigate('/search');
  };

  handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

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

                !isSupervisor && (
                  <MenuItem
                    onClick={this.handleMenuClose}
                    key="profile"
                    data-testid="profile-item"
                  >
                    <PermIdentityIcon sx={{ marginRight: 1 }} />
                    Profile
                  </MenuItem>
                ),

                <MenuItem
                  onClick={this.handleMenuClose}
                  key="account"
                  data-testid="account-item"
                >
                  <AccountCircleIcon sx={{ marginRight: 1 }} />
                  My account
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
                    No Subscription
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