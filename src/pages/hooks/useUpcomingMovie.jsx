import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchUpcomingMovies = () => {
	return api.get(`/movie/upcoming?language=ko-KR `);
};

export const useUpcomingMoviesQuery = () => {
	return useQuery({
		queryKey: ['movie-upcoming', 'ko-KR'],
		queryFn: fetchUpcomingMovies,
		select: (result) => result.data,
	});
};
