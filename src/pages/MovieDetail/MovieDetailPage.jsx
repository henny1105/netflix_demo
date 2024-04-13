import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMovieDetailsQuery } from '../hooks/useMovieDetails';
import { useMovieReviewsQuery } from '../hooks/useMovieReviews';

const MovieDetailPage = () => {
	const { id: movieId } = useParams();
	const [expandedReviews, setExpandedReviews] = useState({});

	const { data: movieDetails, isLoading: detailsLoading, error: detailsError } = useMovieDetailsQuery(movieId);
	const { data: reviews, isLoading: reviewsLoading, error: reviewsError } = useMovieReviewsQuery(movieId);

	useEffect(() => {
		console.log('Movie details:', movieDetails);
	}, [movieDetails]);

	useEffect(() => {
		console.log('Movie reviews:', reviews);
	}, [reviews]);

	if (detailsLoading || reviewsLoading) return <div>Loading...</div>;
	if (detailsError) return <div>Error: {detailsError.message}</div>;
	if (reviewsError) return <div>Error: {reviewsError.message}</div>;

	const toggleReview = (id) => {
		setExpandedReviews((prevState) => ({
			...prevState,
			[id]: !prevState[id],
		}));
	};

	return (
		<div>
			{movieDetails && (
				<div className='inner'>
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
			{reviews && reviews.results.length > 0 && (
				<div className='inner'>
					<h3>Reviews:</h3>
					<ul>
						{reviews.results.map((review) => {
							const isReviewExpanded = expandedReviews[review.id];
							return (
								<li key={review.id}>
									<p>
										<strong>{review.author}</strong> ({review.author_details.username}, Rating: {review.author_details.rating}):
										{isReviewExpanded ? review.content : `${review.content.substring(0, 500)}...`}
									</p>
									{review.content.length > 100 && <button onClick={() => toggleReview(review.id)}>{isReviewExpanded ? '접기' : '더보기'}</button>}
								</li>
							);
						})}
					</ul>
				</div>
			)}
			{reviews && reviews.results.length === 0 && <div>리뷰가 없습니다.</div>}
		</div>
	);
};

export default MovieDetailPage;
