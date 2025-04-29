import React, { Component } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import bg_img from '../assets/bg-img.avif'
import { Box, Container, Typography } from '@mui/material'
import Moviedata from '../data'
import MovieCard from './MovieCard'

export default class AllMovies extends Component {
    render() {
        return (
            <div>
                <Navbar />


                <Container maxWidth={false} disableGutters sx={{ padding: 0, margin: 0 }}>
                    <Box
                        sx={{
                            backgroundImage: `url(${bg_img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            width: '100vw',
                            minHeight: '100vh',
                            display: 'flex',
                            flexWrap: 'wrap',
                            padding: 4,
                            gap: 3,
                            justifyContent: 'center'
                        }}
                    >
                        <Typography sx={{ fontSize: '25px', color: 'white', bgcolor: 'transparent', padding: 4, width: '100vw', paddingX: 13 }}>
                            ALL MOVIES...
                        </Typography>

                        {Moviedata.map((movie, index) => (
                            <Box key={index} sx={{ px: 2, py: 2 }}>
                                <MovieCard data={movie} />
                            </Box>
                        ))}
                    </Box>
                </Container>

                <Footer />
            </div>
        )
    }
}
