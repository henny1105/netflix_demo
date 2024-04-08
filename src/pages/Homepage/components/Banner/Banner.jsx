import React from 'react';
import { usePopularMoviesQuery } from '../../../hooks/usePopularMovie';
import { Alert } from 'bootstrap';
import './Banner.style.css';

const Banner = () => {
	const { data, isLoading, isError, error } = usePopularMoviesQuery();

	console.log(data);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}
	if (isError) {
		return <Alert variant='danger'>{error.message}</Alert>;
	}

	return (
		<div
			className='banner'
			style={{
				backgroundImage:
					data && data.results && data.results.length > 0 && data.results[0].poster_path ? `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data.results[0].poster_path})` : 'none',
			}}
		>
			{data.results && data.results.length > 0 && (
				<div className='inner'>
					<div className='text-white banner-text-area'>
						<h1>{data.results[0].title}</h1>
						<p>{data.results[0].overview}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Banner;
