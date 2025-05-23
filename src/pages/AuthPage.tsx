import { Component } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import withNavigate from '../utils/HOC';
import { CirclePlay } from 'lucide-react';
import { loginAPI, signUpAPI } from '../utils/API';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bg_img from '../assets/Firefly 20250426033443.png'

interface AuthProps {
  navigate: (path: string) => void;
}

interface AuthState {
  isLogin: boolean;
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  mobile_number: string;
  loading: boolean;
  validationErrors: {
    name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
    mobile_number?: string;
  };
}

class AuthPage extends Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);
    this.state = {
      isLogin: true,
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      mobile_number: '',
      loading: false,
      validationErrors: {},
    };
  }

  validateForm = (): boolean => {
    const { isLogin, name, email, password, confirm_password, mobile_number } = this.state;
    let errors: AuthState["validationErrors"] = {};
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      errors.email = "Enter a valid email";
      isValid = false;
    }

    if (!password || password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!isLogin) {
      if (!name.trim()) {
        errors.name = "Name is required";
        isValid = false;
      }

      if (!confirm_password || confirm_password !== password) {
        errors.confirm_password = "Passwords do not match";
        isValid = false;
      }

      if (!mobile_number || !/^\d{10}$/.test(mobile_number)) {
        errors.mobile_number = "Enter a valid 10-digit number";
        isValid = false;
      }
    }

    this.setState({ validationErrors: errors });

    if (!isValid) {
      const errorMessages = Object.values(errors).join(', ');
      toast.error(`Please fix the following errors: ${errorMessages}`, {
        position: window.innerWidth <= 600 ? 'top-center' : 'top-right',
      });
    }

    return isValid;
  };

  toggleMode = () => {
    this.setState({
      isLogin: !this.state.isLogin,
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      mobile_number: '',
      validationErrors: {},
    });
  };

  handleSubmit = async () => {
    if (!this.validateForm()) return;

    const { isLogin, name, email, password, confirm_password, mobile_number } = this.state;
    this.setState({ loading: true });

    const user = {
      email,
      password,
    };

    try {
      if (isLogin) {
        const response = await loginAPI({ user });
        localStorage.setItem('token', response.auth_info.access_token.token);
        localStorage.setItem('role', response.user.role);
        localStorage.setItem('plan_type', response.user.plan_type);
        localStorage.setItem('name', response.user.name);

        toast.success('Login successful!', {
          position: window.innerWidth <= 600 ? 'top-center' : 'top-right',
        });

        this.props.navigate('/');
      } else {
        const user = {
          name,
          email,
          password,
          confirm_password,
          phone_number: mobile_number,
        };
        await signUpAPI({ user });

        toast.success('Signup successful! Please log in.', {
          position: window.innerWidth <= 600 ? 'top-center' : 'top-right',
        });

        window.location.reload();
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error('Please enter correct email and password!');
    } finally {
      this.setState({ loading: false });
    }
  };

  handleClick = () => {
    window.location.reload();
  };

  render() {
    const { isLogin, loading, name, email, password, confirm_password, mobile_number, validationErrors } = this.state;
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth <= 600;
    const isTablet = screenWidth > 600 && screenWidth <= 960;

    return (
      <div>
        <CssBaseline />
        <ToastContainer
          position={isMobile ? 'top-center' : 'top-right'}
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
        <Container maxWidth={false} disableGutters sx={{ overflow: 'hidden' }}>
          <Box
            sx={{
              height: '100vh',
              width: '100vw',
              display: 'flex',
              flexDirection: 'column',
              backgroundImage: `url(${bg_img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              objectFit: 'cover',
            }}
          >
            <Box
              component="section"
              sx={{
                paddingTop: {
                  xs: 1,
                  sm: 3,
                  md: 4,
                },
                paddingLeft: {
                  xs: '6vw',
                  sm: '10vw',
                  md: '12vw',
                },
                height: '10vh',
                color: 'white',
                fontSize: {
                  xs: '22px',
                  sm: '26px',
                  md: '26px',
                },
                boxSizing: 'border-box',
                minHeight: '11vh',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '& svg:hover': {
                  color: '#6C63FF',
                  cursor: 'pointer',
                },
              }}
              onClick={this.handleClick}
            >
              <CirclePlay size={'27px'} /> MOVIE EXPLORER
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: {
                  xs: 'center',
                  sm: 'left',
                },
                paddingLeft: {
                  xs: 0,
                  sm: '10vw',
                  md: '12vw',
                },
              }}
            >
              <Paper
                sx={{
                  p: {
                    xs: 2,
                    sm: 4,
                    md: 5,
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  color: 'white',
                  width: {
                    xs: '80vw',
                    sm: '55vw',
                    md: '35vw',
                  },
                  maxWidth: {
                    xs: '400px',
                    sm: '500px',
                    md: '400px',
                  },
                  height: 'auto',
                  gap: isLogin ? 1 : 1,
                  overflow: 'hidden',
                  boxShadow: '0px 0px 30px 5px rgba(100, 88, 143, 0.1)',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingX: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    paddingTop={isMobile || isTablet ? 1 : 0}
                    mb={3}
                    align="center"
                    sx={{
                      fontFamily: 'inherit',
                      cursor: 'pointer',
                      borderBottom: isLogin ? '5px solid #6C63FF' : 'none',
                      paddingBottom: isLogin ? 1 : 0,
                    }}
                    onClick={() => {
                      this.setState({ isLogin: true });
                      this.toggleMode();
                    }}
                  >
                    LOGIN
                  </Typography>
                  <Typography
                    variant="h5"
                    paddingTop={isMobile || isTablet ? 1 : 0}
                    mb={3}
                    align="center"
                    sx={{
                      fontFamily: 'inherit',
                      cursor: 'pointer',
                      borderBottom: !isLogin ? '5px solid #6C63FF' : 'none',
                      paddingBottom: !isLogin ? 1 : 0,
                    }}
                    onClick={() => {
                      this.setState({ isLogin: false });
                      this.toggleMode();
                    }}
                  >
                    SIGNUP
                  </Typography>
                </Box>

                {!isLogin && (
                  <TextField
                    label="NAME"
                    variant="filled"
                    onChange={(e) => { this.setState({ name: e.target.value }) }}
                    value={name}
                    error={Boolean(validationErrors.name)}
                    helperText={validationErrors.name}
                    size={isMobile || isTablet ? 'small' : undefined}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      style: {
                        color: 'white',
                        fontFamily: 'inherit',
                        border: '1px solid rgb(16, 30, 57)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: '#aaa',
                        fontFamily: 'inherit',
                      },
                    }}
                  />
                )}

                <TextField
                  label="EMAIL"
                  variant="filled"
                  fullWidth
                  margin="normal"
                  onChange={(e) => { this.setState({ email: e.target.value }) }}
                  value={email}
                  error={Boolean(validationErrors.email)}
                  helperText={validationErrors.email}
                  size={isMobile || isTablet ? 'small' : undefined}
                  InputProps={{
                    style: {
                      color: 'white',
                      fontFamily: 'inherit',
                      border: '1px solid rgb(16, 30, 57)',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: '#aaa',
                      fontFamily: 'inherit',
                    },
                  }}
                />

                <TextField
                  label="PASSWORD"
                  type="password"
                  variant="filled"
                  onChange={(e) => { this.setState({ password: e.target.value }) }}
                  value={password}
                  error={Boolean(validationErrors.password)}
                  helperText={validationErrors.password}
                  size={isMobile || isTablet ? 'small' : undefined}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: {
                      color: 'white',
                      fontFamily: 'inherit',
                      border: '1px solid rgb(16, 30, 57)',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: '#aaa',
                      fontFamily: 'inherit',
                    },
                  }}
                />

                {!isLogin && (
                  <TextField
                    label="CONFIRM PASSWORD"
                    type="password"
                    variant="filled"
                    onChange={(e) => { this.setState({ confirm_password: e.target.value }) }}
                    value={confirm_password}
                    error={Boolean(validationErrors.confirm_password)}
                    helperText={validationErrors.confirm_password}
                    size={isMobile || isTablet ? 'small' : undefined}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      style: {
                        color: 'white',
                        fontFamily: 'inherit',
                        border: '1px solid rgb(16, 30, 57)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: '#aaa',
                        fontFamily: 'inherit',
                      },
                    }}
                  />
                )}

                {!isLogin && (
                  <TextField
                    label="PHONE NUMBER"
                    type="text"
                    inputProps={{ maxLength: 10 }}
                    onChange={(e) => { this.setState({ mobile_number: e.target.value }) }}
                    value={mobile_number}
                    variant="filled"
                    error={Boolean(validationErrors.mobile_number)}
                    helperText={validationErrors.mobile_number}
                    size={isMobile || isTablet ? 'small' : undefined}
                    fullWidth
                    margin="none"
                    InputProps={{
                      style: {
                        color: 'white',
                        fontFamily: 'inherit',
                        border: '1px solid rgb(16, 30, 57)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        overflow: 'hidden',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: '#aaa',
                        fontFamily: 'inherit',
                      },
                    }}
                  />
                )}

                <Button
                  variant="contained"
                  fullWidth
                  onClick={this.handleSubmit}
                  sx={{
                    mt: 3,
                    bgcolor: '#5B52E6',
                    ':hover': { bgcolor: '#3F3AB3' },
                    fontFamily: 'inherit',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    position: 'relative',
                  }}
                >
                  {loading ? (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: 'white',
                      }}
                    />
                  ) : (
                    isLogin ? 'LOGIN' : 'SIGN UP'
                  )}
                </Button>
              </Paper>
            </Box>
          </Box>
        </Container>
      </div>
    );
  }
}

export default withNavigate(AuthPage);