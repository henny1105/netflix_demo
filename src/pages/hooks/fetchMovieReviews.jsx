// fetchMovieReviews.js

import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchMovieReviews = async (movieId) => {
	const response = await api.get(`/movie/${movieId}/reviews`);
	return response.data.reviews;
};

export const useMovieReviewsQuery = (movieId) => {
	return useQuery({
		queryKey: ['movie-reviews', movieId],
		queryFn: () => fetchMovieReviews(movieId),
		staleTime: 600000,
	});
};
