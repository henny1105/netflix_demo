import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchMovieDetails = async (movieId) => {
	const response = await api.get(`/movie/${movieId}?language=ko-KR`);
	return response;
};

export const useMovieDetailsQuery = (movieId) => {
	return useQuery({
		queryKey: ['movie-details', movieId],
		queryFn: () => fetchMovieDetails(movieId),
		staleTime: 600000,
		select: (result) => result.data,
	});
};
