import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMovieDetailsQuery } from '../hooks/useMovieDetails';
import { useMovieReviewsQuery } from '../hooks/useMovieReviews';
import { useRecommedMoviesQuery } from '../hooks/useRecommendMovie';
import MovieSlider from '../../common/MovieSlider/MovieSlider';
import './MovieDetailPage.style.css';
import { Spinner, Alert, Badge } from 'react-bootstrap';
import { responsive } from '../../constants/responsive';
import TrailerModal from './TrailerModal';

const MovieDetailPage = () => {
	const { id: movieId } = useParams();
	const [expandedReviews, setExpandedReviews] = useState({});
	const [showTrailer, setShowTrailer] = useState(false);

	const { data: movieDetails, isLoading: detailsLoading, error: detailsError } = useMovieDetailsQuery(movieId);
	const { data: reviews, isLoading: reviewsLoading, error: reviewsError } = useMovieReviewsQuery(movieId);
	const { data: recommend, isLoading: recommendLoading, error: recommendError } = useRecommedMoviesQuery(movieId);

	useEffect(() => {
		console.log('Movie details:', movieDetails);
	}, [movieDetails]);

	useEffect(() => {
		console.log('Movie reviews:', reviews);
	}, [reviews]);

	useEffect(() => {
		console.log('Recommend reviews:', recommend);
	}, [recommend]);

	if (detailsLoading || reviewsLoading || recommendLoading) {
		return (
			<div className='spinner-area' style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
				<Spinner animation='border' variant='danger' style={{ width: '5rem', height: '5rem' }} />
			</div>
		);
	}

	if (detailsError) return <Alert variant='danger'>Error: {detailsError.message}</Alert>;
	if (reviewsError) return <Alert variant='danger'>Error: {reviewsError.message}</Alert>;
	if (recommendError) return <Alert variant='danger'>Error: {recommendError.message}</Alert>;

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
							<p>{movieDetails.tagline}</p>
							<p>
								{movieDetails.genres?.map((genre, index) => (
									<Badge key={`${genre.id}-${index}`} bg='danger'>
										{genre.name}
									</Badge>
								))}
							</p>
							<p>Popularity: {movieDetails.popularity}</p>
							<p>{movieDetails.overview}</p>
							<p>Budget: ${movieDetails.budget.toLocaleString()}</p>
							<p>개봉일 {movieDetails.release_date}</p>
						</div>
						<div className='right_cont'>
							<img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetails.poster_path}`} alt={movieDetails.title} />
						</div>
					</div>
					{showTrailer && <TrailerModal movieId={movieId} show={showTrailer} handleClose={handleCloseTrailer} />}
				</div>
			)}
			{reviews && reviews.results.length > 0 && (
				<div className='movie_review_cont'>
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
				</div>
			)}
			{reviews && reviews.results.length === 0 && <div>리뷰가 없습니다.</div>}

			{recommend && recommend.results.length > 0 && (
				<div>
					<MovieSlider title='Recommended Movies' movies={recommend.results} responsive={responsive} />
				</div>
			)}

			{recommend && recommend.results.length === 0 && <div>추천 영화가 없습니다.</div>}
		</div>
	);
};

export default MovieDetailPage;
