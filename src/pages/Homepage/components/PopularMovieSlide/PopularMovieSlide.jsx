import React from 'react';
import { usePopularMoviesQuery } from '../../../hooks/usePopularMovie';
import { Alert } from 'bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 8,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

const PopularMovieSlide = () => {
	const { data, isLoading, isError, error } = usePopularMoviesQuery();

	if (isLoading) {
		return <h1>Loading...</h1>;
	}
	if (isError) {
		return <Alert varient='danger'>{error.message}</Alert>;
	}
	return (
		<div>
			<h3>Popular Movies</h3>
			{data && data.results && (
				<Carousel infinite={true} centerMode={true} itemClass='movie-slider p-1' containerClass='carousel-container' responsive={responsive}>
					{data.results.map((movie, index) => (
						<MovieCard movie={movie} key={index} />
					))}
				</Carousel>
			)}
		</div>
	);
};

export default PopularMovieSlide;