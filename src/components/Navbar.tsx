import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Avatar, Typography } from '@mui/material';

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <Box component="section" sx={{
                    gap: 25,
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    backgroundColor: '#000113',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(to bottom, #000113, transparent)',
                    }
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', height: '10vh', color: 'white', paddingLeft: '4vw' }}>
                        <Typography sx={{ fontSize: '27px' }}>
                            MOVIE EXPLORER
                        </Typography>
                    </Box>
                    <Box sx={{ width: 500, maxWidth: '100%' }}>
                        <TextField
                            fullWidth
                            placeholder="Search Movies..."
                            id="fullWidth"
                            size='small'
                            InputProps={{
                                sx: {
                                    border: '1px solid grey',
                                    borderRadius: '5px',
                                    color: 'white',
                                    '&::placeholder': {
                                        color: 'white',
                                        opacity: 1,
                                    },
                                    '&.Mui-focused': {
                                        border: 'none',
                                    },
                                }
                            }}
                        />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'right', paddingRight: '4vw' }}>
                        <Avatar
                            sx={{ bgcolor: '#6C63FF' }}
                            alt="Remy Sharp"
                            src="/broken-image.jpg"
                        >
                            R
                        </Avatar>
                    </Box>
                </Box>
            </div>
        )
    }
}