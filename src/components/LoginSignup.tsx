import React, { Component } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import backgroundImage from '../assets/Untitled design.png';
import withNavigate from '../utils/HOC';

interface AuthProps {
  navigate: (path: string) => void;
}

interface AuthState {
  isLogin: boolean;
}

class AuthPage extends Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);
    this.state = {
      isLogin: true,
    };
  }

  toggleMode = () => {
    this.setState(prevState => ({ isLogin: !prevState.isLogin }));
  };

  handleSubmit = () => {
    const { isLogin } = this.state;
    this.props.navigate(isLogin ? '/' : '/');
  };

  render() {
    const { isLogin } = this.state;

    return (
      <div>
        <CssBaseline />
        <Container maxWidth={false} disableGutters sx={{ overflow: 'hidden' }}>
          <Box
            sx={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100vh',
              width: '100vw',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              component="section"
              sx={{
                paddingTop: 4,
                paddingLeft: '12vw',
                height: '10vh',
                color: 'white',
                fontSize: '27px',
                boxSizing: 'border-box',
                minHeight: '10vh',
              }}
            >
              MOVIE EXPLORER
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'left',
                paddingLeft: '12vw',
              }}
            >
              <Paper
                sx={{
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  color: 'white',
                  minWidth: '300px',
                  width: '30vw',
                  maxWidth: '400px',
                  height: isLogin ? '62vh' : '80vh',
                  gap: isLogin ? 3 : 1,
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
                    mb={3}
                    align="center"
                    sx={{
                      fontFamily: 'inherit',
                      cursor: 'pointer',
                      borderBottom: isLogin ? '5px solid #6C63FF' : 'none',
                      paddingBottom: isLogin ? 2 : 0,
                    }}
                    onClick={() => this.setState({ isLogin: true })}
                  >
                    LOGIN
                  </Typography>
                  <Typography
                    variant="h5"
                    mb={3}
                    align="center"
                    sx={{
                      fontFamily: 'inherit',
                      cursor: 'pointer',
                      borderBottom: !isLogin ? '5px solid #6C63FF' : 'none',
                      paddingBottom: !isLogin ? 2 : 0,
                    }}
                    onClick={() => this.setState({ isLogin: false })}
                  >
                    SIGNUP
                  </Typography>
                </Box>

                {!isLogin && (
                  <TextField
                    label="NAME"
                    variant="filled"
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
                    label="PHONE NUMBER"
                    type="number"
                    variant="filled"
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

                <Button
                  variant="contained"
                  fullWidth
                  onClick={this.handleSubmit}
                  sx={{
                    mt: 3,
                    bgcolor: '#5B52E6',
                    ':hover': { bgcolor: '#3F3AB3' },
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  {isLogin ? 'LOGIN' : 'SIGN UP'}
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