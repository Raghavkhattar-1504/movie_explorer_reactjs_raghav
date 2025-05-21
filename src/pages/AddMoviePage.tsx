import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
    Box, Button, TextField, Typography, RadioGroup,
    FormControlLabel, Radio, Container, CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import NavbarNew from '../components/NavbarNew';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { addMovieAPI, editMovieAPI, movieDetailsAPI } from '../utils/API';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMovieForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [director, setDirector] = useState('');
    const [genre, setGenre] = useState<number | "">(0);
    const [year, setYear] = useState<Date | null>(null);
    const [plan, setPlan] = useState<boolean>(false);
    const [posterImage, setPosterImage] = useState<File | null>(null);
    const [bannerImage, setBannerImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchMovieData = async () => {
                try {
                    const response = await movieDetailsAPI(Number(id));
                    setTitle(response.title);
                    setDescription(response.description);
                    setDirector(response.director);
                    setGenre(response.genre.id);
                    setYear(new Date(response.release_year, 0, 1));
                    setBannerImage(response.banner_url);
                    setPosterImage(response.poster_url);
                } catch (error) {
                    console.error("Error fetching movie details:", error);
                    toast.error('Failed to load movie details. Please try again.', {
                        position: window.innerWidth <= 600 ? 'top-center' : 'top-right',
                    });
                }
            };
            fetchMovieData();
        }
    }, [id]);

    const validateForm = (): boolean => {
        let isValid = true;
        const errors: string[] = [];

        if (!title.trim()) {
            errors.push('Title is required');
            isValid = false;
        }
        if (!description.trim()) {
            errors.push('Description is required');
            isValid = false;
        }
        if (!director.trim()) {
            errors.push('Director is required');
            isValid = false;
        }
        if (!genre) {
            errors.push('Genre is required');
            isValid = false;
        }
        if (!year) {
            errors.push('Valid year is required');
            isValid = false;
        }

        if (!isValid) {
            toast.error(`Please fix the following errors: ${errors.join(', ')}`, {
                position: window.innerWidth <= 600 ? 'top-center' : 'top-right',
            });
        }

        return isValid;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        const formData = new FormData();
        formData.append("movie[title]", title);
        formData.append("movie[release_year]", year ? year.getFullYear().toString() : '');
        formData.append("movie[rating]", "7.8");
        formData.append("movie[genre_id]", genre.toString());
        formData.append("movie[director]", director);
        formData.append("movie[duration]", "129");
        formData.append("movie[description]", description);
        formData.append("movie[main_lead]", "James Phillips");
        formData.append("movie[streaming_platform]", "Netflix");
        formData.append("movie[premium]", plan.toString());
        if (posterImage) {
            formData.append("movie[poster]", posterImage);
        }
        if (bannerImage) {
            formData.append("movie[banner]", bannerImage);
        }

        const token = localStorage.getItem('token');
        try {
            if (id) {
                if (!token) {
                    throw new Error('Authentication token is missing.');
                }
                await editMovieAPI(formData, Number(id), token);
                toast.success('Movie updated successfully!', {
                    position: window.innerWidth <= 600 ? 'top-center' : 'top-right',
                });
            } else {
                await addMovieAPI(formData);
                toast.success('Movie added successfully!', {
                    position: window.innerWidth <= 600 ? 'top-center' : 'top-right',
                });
            }

            setTitle('');
            setDescription('');
            setDirector('');
            setGenre(0);
            setYear(null);
            setPlan(false);
            setPosterImage(null);
            setBannerImage(null);
        } catch (error) {
            console.error("Error Adding/Editing Movie:", error);
            toast.error('An error occurred. Please try again.', {
                position: window.innerWidth <= 600 ? 'top-center' : 'top-right',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container
            disableGutters
            maxWidth={false}
            sx={{
                background: `linear-gradient(to right, #0a0a0a, #000a3a, #001a80, #0022aa)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
            }}
        >
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
            <NavbarNew />
            <Box
                sx={{
                    width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
                    mx: 'auto',
                    my: 6,
                    p: { xs: 2, sm: 3, md: 4 },
                    bgcolor: '#000C2C',
                    borderRadius: 4,
                    boxShadow: 4,
                    color: '#fff',
                    overflowY: "visible"
                }}
            >
                <Typography
                    variant="h5"
                    mb={3}
                    sx={{ color: '#fff', fontSize: { xs: 20, sm: 24, md: 28 } }}
                >
                    {id ? "EDIT MOVIE" : "ADD NEW MOVIE"}
                </Typography>

                <form onSubmit={handleSubmit} aria-label="add-movie-form">
                    <TextField
                        fullWidth
                        name="title"
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                        required
                        InputProps={{ style: { color: 'white' } }}
                        InputLabelProps={{ style: { color: '#94A3B8' } }}
                        sx={{ bgcolor: '#1E293B', borderRadius: 1 }}
                    />

                    <TextField
                        fullWidth
                        name="description"
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        margin="normal"
                        multiline
                        rows={3}
                        required
                        InputProps={{ style: { color: 'white' } }}
                        InputLabelProps={{ style: { color: '#94A3B8' } }}
                        sx={{ bgcolor: '#1E293B', borderRadius: 1 }}
                    />

                    <TextField
                        fullWidth
                        name="director"
                        label="Director"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                        margin="normal"
                        required
                        InputProps={{ style: { color: 'white' } }}
                        InputLabelProps={{ style: { color: '#94A3B8' } }}
                        sx={{ bgcolor: '#1E293B', borderRadius: 1 }}
                    />

                    <Box sx={{ bgcolor: '#1E293B', borderRadius: 1, p: 1, mt: 2 }}>
                        <label htmlFor="genre" style={{ color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                            Genre ID
                        </label>
                        <select
                            id="genre"
                            name="genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value === "" ? "" : Number(e.target.value))}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '4px',
                                backgroundColor: '#1E293B',
                                color: 'white',
                                border: 'none',
                                fontSize: '16px',
                            }}
                        >
                            <option value="">Select</option>
                            <option value="3">Action : 3</option>
                            <option value="10">Drama : 10</option>
                            <option value="4">Sci-Fi : 4</option>
                            <option value="11">Horror : 11</option>
                            <option value="12">Romance : 12</option>
                            <option value="2">Comedy : 2</option>
                            <option value="14">Documentary : 14</option>
                            <option value="13">Thriller : 13</option>
                        </select>
                    </Box>

                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['year']}
                            label="Year"
                            value={year}
                            onChange={(newValue) => setYear(newValue)}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    required: true,
                                    margin: 'normal',
                                    InputProps: { style: { color: 'white' } },
                                    InputLabelProps: { style: { color: '#94A3B8' } },
                                    sx: { bgcolor: '#1E293B', borderRadius: 1 }
                                },
                                popper: {
                                    sx: { zIndex: 9999 }, placement: 'bottom',
                                    modifiers: [
                                        {
                                            name: 'preventOverflow',
                                            options: {
                                                boundariesElement: 'viewport',
                                            },
                                        },
                                    ],
                                }
                            }}
                        />
                    </LocalizationProvider> */}

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['year']}
                            label="Year"
                            value={year}
                            onChange={(newValue) => setYear(newValue)}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    required: true,
                                    margin: 'normal',
                                    InputProps: { style: { color: 'white' } },
                                    InputLabelProps: { style: { color: '#94A3B8' } },
                                    sx: {
                                        bgcolor: '#1E293B',
                                        borderRadius: 1,
                                        '& input[type=number]': {
                                            MozAppearance: 'textfield',
                                            WebkitAppearance: 'none',
                                            margin: 0,
                                        },
                                        '& input[type=number]::-webkit-outer-spin-button': {
                                            WebkitAppearance: 'none',
                                            margin: 0,
                                        },
                                        '& input[type=number]::-webkit-inner-spin-button': {
                                            WebkitAppearance: 'none',
                                            margin: 0,
                                        },
                                    }
                                },
                                popper: {
                                    sx: { zIndex: 9999 },
                                    placement: 'bottom',
                                    modifiers: [
                                        {
                                            name: 'preventOverflow',
                                            options: {
                                                boundariesElement: 'viewport',
                                            },
                                        },
                                    ],
                                }
                            }}
                        />
                    </LocalizationProvider>
                    <Box mt={2}>
                        <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                            Premium:
                        </Typography>
                        <RadioGroup row value={plan} onChange={(e) => setPlan(e.target.value === "true")}>
                            <FormControlLabel value="true" control={<Radio sx={{ color: '#fff' }} />} label="Yes" />
                            <FormControlLabel value="false" control={<Radio sx={{ color: '#fff' }} />} label="No" />
                        </RadioGroup>
                    </Box>

                    <Box mt={2}>
                        <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                            Poster Image:
                        </Typography>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setPosterImage(e.target.files?.[0] || null)
                            }
                        />
                        {posterImage && (
                            <Typography fontSize={12} color="#94A3B8">
                                Selected: {posterImage.name}
                            </Typography>
                        )}
                    </Box>

                    <Box mt={2}>
                        <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                            Banner Image:
                        </Typography>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setBannerImage(e.target.files?.[0] || null)
                            }
                        />
                        {bannerImage && (
                            <Typography fontSize={12} color="#94A3B8">
                                Selected: {bannerImage.name}
                            </Typography>
                        )}
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        sx={{
                            mt: 3,
                            width: '100%',
                            bgcolor: '#1E293B',
                            '&:hover': { bgcolor: '#475569' },
                            color: '#fff',
                            borderRadius: 2,
                            padding: 1,
                            fontSize: 17,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {isLoading ? (
                            <CircularProgress size={24} sx={{ color: '#fff', mr: 1, ml: 3 }} />
                        ) : null}
                        {id ? "EDIT MOVIE" : "ADD MOVIE"}
                    </Button>
                </form>
            </Box>
            <Footer />
        </Container>
    );
};

export default AddMovieForm;