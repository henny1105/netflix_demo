import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchSearchMovie = ({ keyword }) => {
	const language = 'ko';
	return keyword ? api.get(`/search/movie?query=${keyword}&language=${language}`) : api.get(`movie/popular?language=${language}`);
};

export const useSearchMovieQuery = ({ keyword }) => {
	return useQuery({
		queryKey: ['movie-search', keyword],
		queryFn: () => fetchSearchMovie({ keyword }),
		select: (result) => result.data,
	});
};
