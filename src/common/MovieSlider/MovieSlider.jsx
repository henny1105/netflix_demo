import React from 'react';
import './MovieSlider.style.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';

const MovieSlider = ({ title, movies, responsive }) => {
	return (
		<div className='movie_list_box'>
			<div className='inner'>
				<h3 className='section_title'>{title}</h3>
			</div>
			{movies && movies.length > 0 && (
				<Carousel infinite={true} centerMode={true} itemClass='movie-slider p-1' containerClass='carousel-container' responsive={responsive}>
					{movies.map((movie, index) => (
						<MovieCard movie={movie} key={index} />
					))}
				</Carousel>
			)}
		</div>
	);
};

export default MovieSlider;
