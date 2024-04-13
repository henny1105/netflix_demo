import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchRecommedMovies = (movieId) => {
	return api.get(`/movie/${movieId}/recommendations?language=ko-KR`);
};

export const useRecommedMoviesQuery = (movieId) => {
	return useQuery({
		queryKey: ['movieRecommend', movieId],
		queryFn: () => fetchRecommedMovies(movieId),
		select: (result) => result.data,
	});
};
