import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchNowPlayingMovies = () => {
	return api.get(`/movie/now_playing?language=ko-KR`);
};

export const useNowPlayingMoviesQuery = () => {
	return useQuery({
		queryKey: ['movie-now_playing', 'ko-KR'],
		queryFn: fetchNowPlayingMovies,
		select: (result) => result.data,
	});
};
