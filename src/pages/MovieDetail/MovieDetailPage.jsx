import { useMovieDetailsQuery } from '../hooks/fetchMovieDetails';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetailPage = () => {
	const { id: movieId } = useParams(); // URL에서 `id`라는 이름으로 파라미터를 추출하고, 이를 `movieId` 변수에 할당

	const { data: movieDetails, isLoading, error } = useMovieDetailsQuery(movieId);

	console.log('movieId: ', movieId); // 콘솔에 movieId 출력

	// 데이터가 로드되거나 업데이트될 때마다 콘솔에 출력
	useEffect(() => {
		console.log('Movie Details:', movieDetails);
	}, [movieDetails]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div>
			{movieDetails && (
				<div>
					<img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetails.poster_path}`} alt={movieDetails.title} />
					<h2>{movieDetails.title}</h2>
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
