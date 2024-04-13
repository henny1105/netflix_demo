import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchMovieActor = async (movieId) => {
	const response = await api.get(`/movie/${movieId}/credits`);
	return response.data;
};

export const useMovieActorQuery = (movieId) => {
	return useQuery({
		queryKey: ['movie-actor', movieId],
		queryFn: () => fetchMovieActor(movieId),
		select: (result) => result.cast,
		staleTime: 300000,
	});
};
