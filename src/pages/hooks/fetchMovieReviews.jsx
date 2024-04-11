import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchMovieReviews = async (movieId) => {
	const response = await api.get(`/movie/${movieId}/reviews?language=ko-KR`);
	return response;
};

export const useMovieReviewsQuery = (movieId) => {
	return useQuery({
		queryKey: ['movie-reviews', movieId],
		queryFn: () => fetchMovieReviews(movieId),
		staleTime: 600000,
		select: (result) => result.data,
	});
};
