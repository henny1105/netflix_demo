import React from 'react';
import { useTopRatedMoviesQuery } from '../../../hooks/useTopRatedMovie';
import { Alert } from 'bootstrap';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';

const PopularMovieSlide = () => {
	const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

	if (isLoading) {
		return <h1>Loading...</h1>;
	}
	if (isError) {
		return <Alert variant='danger'>{error.message}</Alert>;
	}
	return <MovieSlider title='top rated Movies' movies={data.results} responsive={responsive}></MovieSlider>;
};

export default PopularMovieSlide;
