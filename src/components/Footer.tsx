import { Container, Box, Typography } from '@mui/material';

function Footer() {
    return (
        <footer>
            <Container
                maxWidth={false}
                sx={{
                    backgroundColor: '#000B21',
                    color: '#fff',
                    padding: { xs: '15px 0', sm: '20px 0' },
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        maxWidth: { xs: '90%', sm: '1024px' },
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: { xs: 2, sm: 4 },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            gap: { xs: 1, sm: 2 },
                            py: { xs: 2, sm: 0 },
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'white',
                                fontSize: { xs: '20px', sm: '24px', md: '27px' },
                                fontFamily: 'roboto',
                                fontWeight: 'bold',
                            }}
                        >
                            THANK YOU FOR VISITING US!
                        </Typography>
                        <Typography
                            sx={{
                                color: 'white',
                                fontSize: { xs: '12px', sm: '15px', md: '17px' },
                                fontFamily: 'roboto',
                            }}
                        >
                            HOPE THE MOVIE HIT YOU HARDER THAN YOUR ESPRESSO ;)
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: { xs: 1.5, sm: 2 },
                            marginBottom: { xs: '10px', sm: '15px' },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                gap: { xs: '8px', sm: '10px' },
                                padding: { xs: '0 10px', sm: '5px 0' },
                                fontFamily: 'roboto',
                            }}
                        >
                            {['Home', 'All Movies', 'Feedback', 'Help'].map((text, index) => (
                                <Typography
                                    key={index}
                                    component="a"
                                    href="#"
                                    sx={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        padding: { xs: '0 8px', sm: '0 10px' },
                                        fontSize: { xs: 12, sm: 14 },
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {text} <span style={{ fontSize: '12px', marginLeft: '3px' }}>↗</span>
                                </Typography>
                            ))}
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            width: '100%',
                            textAlign: 'center',
                            marginTop: { xs: '8px', sm: '10px' },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#ccc',
                                fontSize: { xs: '10px', sm: '12px' },
                            }}
                        >
                            © 1990-2025 by MovieExplorer.com, Inc.
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </footer>
    );
}

export default Footer;