import { useMovieDetailsQuery } from '../hooks/fetchMovieDetails';
import { useMovieReviewsQuery } from '../hooks/fetchMovieReviews';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetailPage = () => {
	const { id: movieId } = useParams();

	const { data: movieDetails, isLoading, error } = useMovieDetailsQuery(movieId);
	const { data: reviews, isLoading: reviewsLoading, error: reviewsError } = useMovieReviewsQuery(movieId);

	useEffect(() => {
		console.log('디테일 정보:', movieDetails);
	}, [movieDetails]);

	useEffect(() => {
		console.log('Movie 리뷰:', reviews);
	}, [reviews]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div>
			{movieDetails && (
				<div>
					<img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetails.poster_path}`} alt={movieDetails.title} />
					<h2>{movieDetails.title}</h2>
					<p>{movieDetails.tagline}</p>
					<p>Genres: {movieDetails.genres?.map((genre) => genre.name).join(', ')}</p>
					<p>Popularity: {movieDetails.popularity}</p>
					<p>Overview: {movieDetails.overview}</p>
					<p>Budget: ${movieDetails.budget.toLocaleString()}</p>
					<p>Release Date: {movieDetails.release_date}</p>
				</div>
			)}
		</div>
	);
};

export default MovieDetailPage;
