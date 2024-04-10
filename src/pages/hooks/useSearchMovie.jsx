import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchSearchMovie = ({ keyword, page }) => {
	const language = 'ko';
	const queryParams = `page=${page}&language=${language}`;
	const baseUrl = keyword ? `/search/movie?query=${encodeURIComponent(keyword)}&${queryParams}` : `/movie/popular?${queryParams}`;
	return api.get(baseUrl);
};

export const useSearchMovieQuery = ({ keyword, page }) => {
	return useQuery({
		queryKey: ['movie-search', keyword, page],
		queryFn: () => fetchSearchMovie({ keyword, page }),
		select: (result) => result.data,
	});
};
