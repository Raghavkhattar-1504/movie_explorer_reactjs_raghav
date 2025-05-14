import axios from 'axios';
import * as api from '../utils/API'; 
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.clearAllMocks();
  fetchMock.resetMocks();
});

describe('API Test Suite', () => {
  it('signUpAPI should return data on success', async () => {
    const fakeResponse = { message: 'User registered successfully' };
    mockedAxios.post.mockResolvedValueOnce({ data: fakeResponse });

    const result = await api.signUpAPI({ email: 'test@example.com' });

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/register'),
      { email: 'test@example.com' }
    );
    expect(result).toEqual(fakeResponse);
  });

  it('loginAPI should return data on success', async () => {
    const fakeResponse = { token: 'abcd', user: { name: 'Test' } };
    mockedAxios.post.mockResolvedValueOnce({ data: fakeResponse });

    const result = await api.loginAPI({ email: 'test@example.com', password: '123456' });

    expect(result).toEqual(fakeResponse);
    expect(mockedAxios.post).toHaveBeenCalled();
  });

  it('logoutAPI should remove localStorage items and return response', async () => {
    localStorage.setItem('token', 'dummy');
    localStorage.setItem('role', 'admin');

    mockedAxios.delete.mockResolvedValueOnce({ data: { message: 'Logged out' } });

    const result = await api.logoutAPI();

    expect(result).toEqual({ message: 'Logged out' });
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
  });

  it('allMoviesAPI should pass token in headers and return movies', async () => {
    localStorage.setItem('token', 'sample-token');

    mockedAxios.get.mockResolvedValueOnce({
      data: { movies: [{ id: 1 }], pagination: { totalPages: 2 } },
    });

    const result = await api.allMoviesAPI(1);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('movies?page=1'),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer sample-token',
        }),
      })
    );
    expect(result.movies).toHaveLength(1);
  });

  it('fetchRandomMovieId returns a random movie id', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        movies: [{ id: '123' }, { id: '456' }],
        totalPages: 1,
      },
    });

    const id = await api.fetchRandomMovieId();
    expect(['123', '456']).toContain(id);
  });

  it('searchMovieAPI should return movies and pagination', async () => {
    localStorage.setItem('token', 'token123');
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        movies: [{ id: 99 }],
        pagination: { current_page: 1, total_pages: 1, total_count: 1, per_page: 10 },
      },
    });

    const result = await api.searchMovieAPI(1, 'Inception');

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        params: expect.objectContaining({ search: 'Inception' }),
      })
    );
    expect(result.movies).toHaveLength(1);
  });

  it('createSubscriptionAPI should call axios.post with correct params', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { status: 'subscribed' } });

    const result = await api.createSubscriptionAPI('tok_abc', 'monthly');

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/subscriptions'),
      { plan_type: 'monthly' },
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer tok_abc',
        }),
      })
    );
    expect(result).toEqual({ status: 'subscribed' });
  });

  it('addMovieAPI should post FormData with auth token', async () => {
    localStorage.setItem('token', 'admin-token');
    const formData = new FormData();
    formData.append('title', 'New Movie');

    mockedAxios.post.mockResolvedValueOnce({ data: { id: 1 } });

    const result = await api.addMovieAPI(formData);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/movies'),
      formData,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer admin-token',
        }),
      })
    );
    expect(result).toEqual({ id: 1 });
  });

  it('editMovieAPI should update movie with given id and token', async () => {
    const formData = new FormData();
    formData.append('title', 'Edited Movie');

    mockedAxios.put.mockResolvedValueOnce({ data: { updated: true } });

    const result = await api.editMovieAPI(formData, 123, 'edit-token');

    expect(result).toEqual({ updated: true });
  });

  it('deleteMovieAPI should call delete with correct token', async () => {
    localStorage.setItem('token', 'del-token');
    mockedAxios.delete.mockResolvedValueOnce({ data: { deleted: true } });

    const result = await api.deleteMovieAPI(111);

    expect(result).toEqual({ deleted: true });
  });
});
