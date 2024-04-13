import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchYoutubeMovies = (movieId) => {
	return api.get(`/movie/${movieId}/videos`);
};

export const useYoutubeMoviesQuery = (movieId) => {
	return useQuery({
		queryKey: ['movieRecommend', movieId],
		queryFn: () => fetchYoutubeMovies(movieId),
		select: (result) => result.data,
	});
};
