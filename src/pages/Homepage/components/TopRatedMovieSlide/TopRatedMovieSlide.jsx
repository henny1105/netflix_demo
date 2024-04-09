import React from 'react';
import { useTopRatedMoviesQuery } from '../../../hooks/useTopRatedMovie';
import { Alert } from 'bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 6,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
	},
	mobile: {
		breakpoint: { max: 500, min: 0 },
		items: 1,
	},
};

const TopRatedMovieSlide = () => {
	const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

	if (isLoading) {
		return <h1>Loading...</h1>;
	}
	if (isError) {
		return <Alert variant='danger'>{error.message}</Alert>;
	}
	return (
		<div className='top_rated_box'>
			<div className='inner'>
				<h3 className='section_title'>Top Rated Movies</h3>
			</div>
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

export default TopRatedMovieSlide;
