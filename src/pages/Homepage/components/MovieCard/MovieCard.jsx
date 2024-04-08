import React from 'react';
import { Badge } from 'react-bootstrap';
import './MovieCard.style.css';
import { BsFillPeopleFill } from 'react-icons/bs';

const MovieCard = ({ movie }) => {
	return (
		<div style={{ backgroundImage: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path})` }} className='movie_card'>
			<div className='overlay'>
				<h1 className='title'>{movie.title}</h1>
				<div className='id_cont'>
					{movie.genre_ids.map((id, index) => (
						<Badge key={`${id}-${index}`} bg='danger'>
							{id}
						</Badge>
					))}
				</div>
				<div className='movie_info'>
					<div className='vote_averge'>
						<span>{movie.vote_averge}</span>
					</div>
					<div className='popularity'>
						<BsFillPeopleFill />
						<span>{movie.popularity}</span>
					</div>
					<div className='adult'>{movie.adult ? '19+' : ''}</div>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
