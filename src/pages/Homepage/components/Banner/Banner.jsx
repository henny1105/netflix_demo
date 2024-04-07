import React from 'react';
import { usePopularMoviesQuery } from '../../../hooks/usePopularMovie';

const Banner = () => {
	const { data, isLoading, error } = usePopularMoviesQuery();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	console.log('data', data); // 로깅 수정
	console.log('ddd');

	return <div>Banner</div>;
};

export default Banner;
