import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, Dropdown } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useSearchMovieQuery } from '../hooks/useSearchMovie';
import { useMovieGenreQuery } from '../hooks/useMovieGenre';
import './MoviePage.css';

const MoviePage = () => {
	const [query] = useSearchParams();
	const [page, setPage] = useState(1);
	const keyword = query.get('q');
	const [movies, setMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);
	const loader = useRef(null);

	const { data: movieData, isLoading: isMovieLoading, isError: isMovieError, error: movieError, refetch } = useSearchMovieQuery({ keyword, page });
	const { data: genres, isLoading: isGenreLoading } = useMovieGenreQuery();

	useEffect(() => {
		if (keyword) {
			setMovies([]);
			setFilteredMovies([]);
			setPage(1);
			refetch();
		}
	}, [keyword, refetch]);

	useEffect(() => {
		if (movieData && movieData.results) {
			setMovies((prevMovies) => [...prevMovies, ...movieData.results]);
			setFilteredMovies((prevMovies) => [...prevMovies, ...movieData.results]);
		}
	}, [movieData]);

	const filterByGenre = (genreId) => {
		const filtered = movies.filter((movie) => movie.genre_ids.includes(genreId));
		setFilteredMovies(filtered);
	};

	const resetFilter = () => {
		setFilteredMovies(movies);
	};

	const handleObserver = useCallback((entries) => {
		const target = entries[0];
		if (target.isIntersecting) {
			setPage((prev) => prev + 1);
		}
	}, []);

	useEffect(() => {
		const option = {
			root: null,
			rootMargin: '20px',
			threshold: 1.0,
		};

		const observer = new IntersectionObserver(handleObserver, option);
		if (loader.current) observer.observe(loader.current);

		return () => {
			if (loader.current) observer.unobserve(loader.current);
		};
	}, [handleObserver]);

	const sortMovies = (sortOrder) => {
		const sortedMovies = [...filteredMovies].sort((a, b) => {
			if (sortOrder === 'popularity.desc') {
				return b.popularity - a.popularity;
			} else {
				return a.popularity - b.popularity;
			}
		});
		setFilteredMovies(sortedMovies);
	};

	if ((isMovieLoading && page === 1) || isGenreLoading) {
		return (
			<div className='spinner-area'>
				<Spinner animation='border' variant='danger' style={{ width: '5rem', height: '5rem' }} />
			</div>
		);
	}

	if (isMovieError) {
		return <Alert variant='danger'>{movieError.message}</Alert>;
	}

	return (
		<Container className='search_list inner'>
			<Row>
				<Col lg={4} xs={12}>
					<h3>인기순 영화</h3>
					<div className='popularity_btn'>
						<button onClick={() => sortMovies('popularity.desc')}>인기 높은순</button>
						<button onClick={() => sortMovies('popularity.asc')}>인기 낮은순</button>
						<button onClick={resetFilter}>초기화</button>
					</div>

					<h3>장르별 영화</h3>
					<Dropdown>
						<Dropdown.Toggle variant='danger' id='dropdown-basic'>
							장르 선택
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item onClick={resetFilter}>모든 장르</Dropdown.Item>
							{genres &&
								genres.map((genre) => (
									<Dropdown.Item key={genre.id} onClick={() => filterByGenre(genre.id)}>
										{genre.name}
									</Dropdown.Item>
								))}
						</Dropdown.Menu>
					</Dropdown>
				</Col>
				<Col lg={8} xs={12}>
					<Row>
						{filteredMovies.map((movie) => (
							<Col key={movie.id} lg={4} xs={12}>
								<MovieCard movie={movie} />
							</Col>
						))}
					</Row>
					<div ref={loader} className='loader'>
						{' '}
						{isMovieLoading && <Spinner animation='border' variant='danger' />}
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default MoviePage;
