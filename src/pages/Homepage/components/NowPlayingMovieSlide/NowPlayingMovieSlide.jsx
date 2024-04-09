import React from 'react';
import { useNowPlayingMoviesQuery } from '../../../hooks/useNowPlayingMovie';
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

const NowPlayingMovieSlide = () => {
	const { data, isLoading, isError, error } = useNowPlayingMoviesQuery();

	if (isLoading) {
		return <h1>Loading...</h1>;
	}
	if (isError) {
		return <Alert variant='danger'>{error.message}</Alert>;
	}
	return (
		<div className='nowplaying_box'>
			<div className='inner'>
				<h3 className='section_title'>NowPlaying Movies</h3>
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

export default NowPlayingMovieSlide;
