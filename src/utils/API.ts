import axios from "axios";

export const signUpAPI = async (userData: any) => {
  try {
    const response = await axios.post(`https://movie-ror-priyanshu-singh.onrender.com/api/v1/register`, userData);
    return response.data;

  } catch (error) {
    console.error('Error signing up:', error);
  }
}

export const loginAPI = async (userData: any) => {
  try {
    const response = await axios.post(`https://movie-ror-priyanshu-singh.onrender.com/api/v1/login`, userData);
    console.log("LOGIN RES : ", response);
    
    return response.data;

  } catch (error) {
    console.error('Error signing in:', error);
  }
}
export const logoutAPI = async () => {
  try {
    const response = await axios.delete(`https://movie-ror-priyanshu-singh.onrender.com/api/v1/logout`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });

    localStorage.removeItem('token');
    localStorage.removeItem('role');
    return response.data;

  } catch (error) {
    console.error('Error signing out:', error);
  }
}

export const allMoviesAPI = async (page: number = 1) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    const response = await axios.get(
      `https://movie-ror-priyanshu-singh.onrender.com/api/v1/movies?page=${page}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Add the Authorization header
          'Accept': 'application/json', // Add the Accept header
        },
      }
    );
    console.log("response of all movies api", response.data);

    return response.data;
  } catch (error) {
    console.error('Error getting All Movies: ', error);
  }
}

export const peopleChoiceAPI = async () => {
  try {
    const response = await axios.get(`https://movie-ror-priyanshu-singh.onrender.com/api/v1/movies?page=2`);
    return response.data;

  } catch (error) {
    console.error('Error getting All Movies: ', error);
  }
}


export const movieDetailsAPI = async (id: number) => {
  try {
    const response = await axios.get(`https://movie-ror-priyanshu-singh.onrender.com/api/v1/movies/${id}`)
    return response.data;
  } catch (error) {
    console.error("Error while retrieving data: ", error);
  }
}

export const searchMovieAPI = async (
  page: number = 1,
  search: string,
  genre?: string
): Promise<any> => {

  const token = localStorage.getItem("token")
  const params: Record<string, any> = {
    search,
    page,
  };

  if (genre && genre !== 'all') {
    params.genre = genre;
  }


  try {
    const response = await axios.get(
      'https://movie-ror-priyanshu-singh.onrender.com/api/v1/movies/',
      {
        params,
        headers: {
          'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`, // Add the Authorization header
          Accept: 'application/json',
        },
      }
    );

    const movieData = {
      movies: response.data.movies || [],
      pagination: response.data.pagination || {
        current_page: page,
        total_pages: 1,
        total_count: response.data.movies?.length || 0,
        per_page: 10,
      },
    };

    return movieData;
  } catch (error: any) {
    console.error(`Error fetching movies for genre ${genre}, page ${page}:`, error.message);
    return {
      movies: [],
      pagination: {
        current_page: page,
        total_pages: 1,
        total_count: 0,
        per_page: 10,
      },
    };
  }
};


interface ApiErrorResponse {
  message?: string;
}

export const sendTokenToBackend = async (token: string): Promise<any> => {
  try {
    const userToken = localStorage.getItem('token');
    if (!token) {
      throw new Error('No user data found. User might not be logged in.');
    }
    if (!token) {
      throw new Error('No authentication token found in user data.');
    }


    const response = await fetch('https://movie-ror-priyanshu-singh.onrender.com/api/v1/notifications/device-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
      body: JSON.stringify({ device_token: token }),
    });


    if (!response.ok) {
      const errorData: ApiErrorResponse = await response.json().catch(() => ({}));
      throw new Error(`Failed to send device token: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending device token to backend:', error);
    throw error;
  }
};


export const fetchRandomMovieId = async (): Promise<string | null> => {
  let currentPage = 1;
  const movieIds: string[] = [];

  while (true) {
    const data = await allMoviesAPI(currentPage);

    if (!data || !data.movies || data.movies.length === 0) break;

    movieIds.push(...data.movies.map((movie: any) => movie.id));

    if (data.totalPages && currentPage >= data.totalPages) break;

    currentPage++;
  }

  if (movieIds.length === 0) return null;

  const randomId = movieIds[Math.floor(Math.random() * movieIds.length)];
  return randomId;
};


export const genreBasedMoviesAPI = async (): Promise<string | null> => {
  let currentPage = 1;
  const genreMovies: string[] = [];

  while (true) {
    const data = await allMoviesAPI(currentPage);

    if (!data || !data.movies || data.movies.length === 0) break;

    genreMovies.push(...data.movies.map((movie: any) => movie.id));

    if (data.totalPages && currentPage >= data.totalPages) break;

    currentPage++;
  }

  if (genreMovies.length === 0) return null;

  const randomId = genreMovies[Math.floor(Math.random() * genreMovies.length)];
  return randomId;
};


export const getMoviesByGenre = async (genre: string) => {
  try {
    const response = await axios.get(`https://movie-ror-priyanshu-singh.onrender.com/api/v1/movies?genre=${genre}`);
    return response.data.movies;

  } catch (error) {
    console.error('Error getting All Movies: ', error);
  }
}


export const createSubscriptionAPI = async (token: string, plan: string) => {
  try {
    const response = await axios.post(
      'https://movie-ror-priyanshu-singh.onrender.com/api/v1/subscriptions',
      { plan_type: plan },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating subscription:', error);
  }
}

export const addMovieAPI = async (userData: FormData) => {
  try {
    const response = await axios.post('https://movie-ror-priyanshu-singh.onrender.com/api/v1/movies', userData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error Adding a Movie : ", error);
  }
}

export const editMovieAPI = async (userData: FormData, id: number, token: string) => {
  try {
    const response = await axios.put(`https://movie-ror-priyanshu-singh.onrender.com/api/v1/movies/${id}`, userData, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error Adding a Movie : ", error);
  }
}

export const deleteMovieAPI = async (id: number) => {
  try {
    const response = await axios.delete(`https://movie-ror-priyanshu-singh.onrender.com/api/v1/movies/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error Adding a Movie : ", error);
  }
}