import React from 'react';
import { Badge } from 'react-bootstrap';
import './MovieCard.style.css';
import { BsFillPeopleFill } from 'react-icons/bs';
import { MdOutlineDateRange } from 'react-icons/md';
import { useMovieGenreQuery } from '../../pages/hooks/useMovieGenre';

// import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
	const renderStarRating = (voteAverage) => {
		const starRating = Math.round(voteAverage / 2);
		return Array.from({ length: 5 }, (_, index) => (index < starRating ? '★' : '☆')).join('');
	};

	const { data: genreData } = useMovieGenreQuery();

	const showGenre = (genreIdList) => {
		if (!genreData) return [];
		const genreNameList = genreIdList.map((id) => {
			const genreObj = genreData.find((genre) => genre.id === id);
			return genreObj.name;
		});
		return genreNameList;
	};

	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/movies/${movie.id}`);
	};

	return (
		<div style={{ backgroundImage: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path})` }} className='movie_card' onClick={handleClick}>
			<div className='overlay'>
				<h1 className='title'>{movie.title}</h1>
				<div className='id_cont'>
					{movie.genre_ids &&
						showGenre(movie.genre_ids).map((id, index) => (
							<Badge key={`${id}-${index}`} bg='danger'>
								{id}
							</Badge>
						))}
				</div>
				<div className='movie_info'>
					<div className='vote_average'>
						<span>{renderStarRating(movie.vote_average)}</span>
					</div>
					<div className='popularity'>
						<BsFillPeopleFill />
						<span>{movie.popularity}</span>
					</div>
					<div className='release_date'>
						<MdOutlineDateRange />
						{movie.release_date}
					</div>
					<div className='adult'>{movie.adult ? '19+' : 'ALL'}</div>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
