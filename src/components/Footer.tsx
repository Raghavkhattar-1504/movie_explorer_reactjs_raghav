import { Container, Box, Typography } from '@mui/material';

function Footer() {
    return (
        <footer>
            <Container
                maxWidth={false}
                sx={{
                    backgroundColor: '#000B21',
                    color: '#fff',
                    padding: '20px 0',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box sx={{
                    maxWidth: '1024px',
                    width: '100%',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                }}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '10vh'}}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '10vh', color: 'white', fontSize: '27px', paddingLeft: '4vw', fontFamily: 'roboto' }}>
                            THANK YOU FOR VISITING US !
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '10vh', color: 'white', fontSize: '17px', paddingLeft: '4vw', fontFamily: 'roboto' }}>
                            HOPE THE MOVIE HIT YOU HARDER THAN YOUR EXPRESSO ;)
                        </Box>
                    </Box>

                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        marginBottom: '15px',
                    }}>

                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: { xs: '5px', sm: '10px' },
                            padding: { xs: '0 15px', sm: '5px 0' },
                            fontFamily: 'roboto'
                        }}>
                            {['Home', 'All Movies', 'Feedback', 'Help'].map((text, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    style={{
                                        color: '#fff',
                                        textDecoration: 'none',
                                        padding: '0 10px',
                                        fontSize: '14px',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {text} <span style={{ fontSize: '14px', marginLeft: '3px' }}>↗</span>
                                </a>
                            ))}
                        </Box>
                    </Box>

                    <Box sx={{
                        width: '100%',
                        textAlign: 'center',
                        marginTop: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Typography variant="body2" sx={{
                            color: '#ccc',
                            fontSize: '12px',
                        }}>
                            © 1990-2025 by MovieExplorer.com, Inc.
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </footer>
    );
}

export default Footer;
