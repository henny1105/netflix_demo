import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMovieDetailsQuery } from '../hooks/useMovieDetails';
import { useMovieReviewsQuery } from '../hooks/useMovieReviews';
import { useRecommedMoviesQuery } from '../hooks/useRecommendMovie';
import { useMovieActorQuery } from '../hooks/useMovieActor';
import MovieSlider from '../../common/MovieSlider/MovieSlider';
import './MovieDetailPage.style.css';
import { Spinner, Alert, Badge } from 'react-bootstrap';
import { responsive } from '../../constants/responsive';
import TrailerModal from './TrailerModal';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const MovieDetailPage = () => {
	const { id: movieId } = useParams();
	const [expandedReviews, setExpandedReviews] = useState({});
	const [showTrailer, setShowTrailer] = useState(false);
	const [visibleReviewsCount, setVisibleReviewsCount] = useState(3);

	const { data: movieDetails, isLoading: detailsLoading, error: detailsError } = useMovieDetailsQuery(movieId);
	const { data: reviews, isLoading: reviewsLoading, error: reviewsError } = useMovieReviewsQuery(movieId);
	const { data: recommend, isLoading: recommendLoading, error: recommendError } = useRecommedMoviesQuery(movieId);
	const { data: actors, isLoading: actorsLoading, error: actorsError } = useMovieActorQuery(movieId);

	if (detailsLoading || reviewsLoading || recommendLoading || actorsLoading) {
		return (
			<div className='spinner-area' style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
				<Spinner animation='border' variant='danger' style={{ width: '5rem', height: '5rem' }} />
			</div>
		);
	}

	if (detailsError) return <Alert variant='danger'>Error loading movie details: {detailsError.message}</Alert>;
	if (reviewsError) return <Alert variant='danger'>Error loading reviews: {reviewsError.message}</Alert>;
	if (recommendError) return <Alert variant='danger'>Error loading recommendations: {recommendError.message}</Alert>;
	if (actorsError) return <Alert variant='danger'>Error loading actors: {actorsError.message}</Alert>;

	const toggleReview = (id) => {
		setExpandedReviews((prevState) => ({
			...prevState,
			[id]: !prevState[id],
		}));
	};

	const handleShowTrailer = () => {
		setShowTrailer(true);
	};

	const handleCloseTrailer = () => {
		setShowTrailer(false);
	};

	const renderStarRating = (voteAverage) => {
		const starRating = Math.round(voteAverage / 2);
		return Array.from({ length: 5 }, (_, index) => (index < starRating ? '★' : '☆')).join('');
	};

	const handleLoadMoreReviews = () => {
		setVisibleReviewsCount((prevCount) => prevCount + 3);
	};

	// useEffect(() => {
	// 	console.log('Movie details:', movieDetails);
	// }, [movieDetails]);

	// useEffect(() => {
	// 	console.log('Movie reviews:', reviews);
	// }, [reviews]);

	// useEffect(() => {
	// 	console.log('Recommend reviews:', recommend);
	// }, [recommend]);

	// useEffect(() => {
	// 	console.log('Movie actors:', actors);
	// }, [actors]);
	return (
		<div className='movie_detail_all'>
			{movieDetails && (
				<div style={{ backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieDetails.backdrop_path})` }} className='movie_detail_cont'>
					<div className='inner'>
						<div className='left_cont'>
							<div className='title_cont'>
								<h2 className='title'>{movieDetails.title}</h2>
								<div className='youtube_btn'>
									<button type='button' onClick={handleShowTrailer}>
										예고편 보기
									</button>
								</div>
							</div>
							<div className='genres'>
								{movieDetails.genres?.map((genre, index) => (
									<Badge key={`${genre.id}-${index}`} bg='danger'>
										{genre.name}
									</Badge>
								))}
							</div>
							<p>{movieDetails.tagline}</p>

							<p>{movieDetails.overview}</p>
							<p>인기도 {movieDetails.popularity}</p>
							<p>예산 ${movieDetails.budget.toLocaleString()}</p>
							<p>개봉일 {movieDetails.release_date}</p>
						</div>
						<div className='right_cont'>
							<img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetails.poster_path}`} alt={movieDetails.title} />
						</div>
					</div>
					{showTrailer && <TrailerModal movieId={movieId} show={showTrailer} handleClose={handleCloseTrailer} />}
				</div>
			)}
			{actors && actors.length > 0 && (
				<div className='movie_actors_cont'>
					<div className=''>
						<h3 className='section_title inner'>Actors</h3>
						<Carousel infinite={true} centerMode={true} itemClass='movie-slider p-1' containerClass='carousel-container' responsive={responsive}>
							{actors.map((actor, index) => (
								<div key={index} className='actor_card'>
									{actor.profile_path && <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${actor.profile_path}`} alt={actor.name} />}
									<h4>{actor.name}</h4>
								</div>
							))}
						</Carousel>
					</div>
				</div>
			)}

			{reviews && (
				<div className='movie_review_cont'>
					<div className='inner'>
						<h3 className='section_title'>Movie Reviews</h3>
						<ul>
							{reviews.results.slice(0, visibleReviewsCount).map((review) => {
								const isReviewExpanded = expandedReviews[review.id];
								const starsDisplay = renderStarRating(review.author_details.rating);
								return (
									<li key={review.id}>
										<p>
											<strong>{review.author}</strong>
										</p>
										<p>{review.author_details.username}</p>
										<p className='star'>{starsDisplay}</p>
										<p>{isReviewExpanded ? review.content : `${review.content.substring(0, 500)}...`}</p>
										{review.content.length > 100 && (
											<button className='review_more' onClick={() => toggleReview(review.id)}>
												{isReviewExpanded ? '접기' : '더보기'}
											</button>
										)}
									</li>
								);
							})}
						</ul>
						{reviews.results.length > 3 && visibleReviewsCount < reviews.results.length && (
							<div className='text-center mt-4'>
								<button className='btn btn-danger' onClick={handleLoadMoreReviews}>
									더보기
								</button>
							</div>
						)}
					</div>
				</div>
			)}
			{reviews && reviews.results.length === 0 && <div className='inner no_cont'>리뷰가 없습니다.</div>}

			{recommend && recommend.results.length > 0 && (
				<div>
					<MovieSlider title='Recommended Movies' movies={recommend.results} responsive={responsive} />
				</div>
			)}

			{recommend && recommend.results.length === 0 && <div className='inner no_cont'>추천 영화가 없습니다.</div>}
		</div>
	);
};

export default MovieDetailPage;
