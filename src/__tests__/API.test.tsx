import axios from 'axios';
import {
  signUpAPI,
  loginAPI,
  logoutAPI,
  allMoviesAPI,
  searchMovieAPI,
  movieDetailsAPI,
  addMovieAPI,
  editMovieAPI,
  deleteMovieAPI,
  getMoviesByGenre
} from '../utils/API'; 

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Tests', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('signUpAPI should return data', async () => {
    const mockData = { token: 'abc123' };
    mockedAxios.post.mockResolvedValueOnce({ data: mockData });

    const result = await signUpAPI({ name: 'John' });
    expect(result).toEqual(mockData);
    expect(mockedAxios.post).toHaveBeenCalledWith(expect.any(String), { name: 'John' });
  });

  it('loginAPI should return data', async () => {
    const mockData = { token: 'xyz789' };
    mockedAxios.post.mockResolvedValueOnce({ data: mockData });

    const result = await loginAPI({ email: 'john@example.com' });
    expect(result).toEqual(mockData);
    expect(mockedAxios.post).toHaveBeenCalled();
  });

  it('logoutAPI should remove token and return data', async () => {
    const mockData = { success: true };
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('role', 'admin');
    mockedAxios.delete.mockResolvedValueOnce({ data: mockData });

    const result = await logoutAPI();
    expect(result).toEqual(mockData);
    expect(localStorage.getItem('token')).toBeNull();
    expect(mockedAxios.delete).toHaveBeenCalled();
  });

  it('allMoviesAPI should return movie data', async () => {
    const mockMovies = { movies: [{ id: 1, title: 'Test Movie' }] };
    mockedAxios.get.mockResolvedValueOnce({ data: mockMovies });

    const result = await allMoviesAPI(1);
    expect(result).toEqual(mockMovies);
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('?page=1'));
  });

  it('searchMovieAPI should return filtered movie data', async () => {
    const mockData = {
      movies: [{ id: 2, title: 'Search Movie' }],
      pagination: { current_page: 1, total_pages: 1, total_count: 1, per_page: 10 },
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await searchMovieAPI(1, 'searchTerm');
    expect(result.movies).toHaveLength(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
  });

  it('movieDetailsAPI should return movie by id', async () => {
    const mockData = { id: 5, title: 'Detail Movie' };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await movieDetailsAPI(5);
    expect(result).toEqual(mockData);
  });

  it('addMovieAPI should post form data and return response', async () => {
    const mockData = { success: true };
    const formData = new FormData();
    formData.append('title', 'New Movie');
    localStorage.setItem('token', 'mock-token');
    mockedAxios.post.mockResolvedValueOnce({ data: mockData });

    const result = await addMovieAPI(formData);
    expect(result).toEqual(mockData);
  });

  it('editMovieAPI should update movie and return response', async () => {
    const mockData = { success: true };
    const formData = new FormData();
    formData.append('title', 'Edited Movie');
    mockedAxios.put.mockResolvedValueOnce({ data: mockData });

    const result = await editMovieAPI(formData, 3, 'mock-token');
    expect(result).toEqual(mockData);
  });

  it('deleteMovieAPI should delete movie and return response', async () => {
    const mockData = { success: true };
    localStorage.setItem('token', 'mock-token');
    mockedAxios.delete.mockResolvedValueOnce({ data: mockData });

    const result = await deleteMovieAPI(7);
    expect(result).toEqual(mockData);
  });

  it('getMoviesByGenre should return movies for genre', async () => {
    const mockData = { movies: [{ id: 10, genre: 'Comedy' }] };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await getMoviesByGenre('Comedy');
    expect(result).toEqual(mockData.movies);
  });
});
