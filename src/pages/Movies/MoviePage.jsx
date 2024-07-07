import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, Dropdown, Button } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useSearchMovieQuery } from '../hooks/useSearchMovie';
import { useMovieGenreQuery } from '../hooks/useMovieGenre';
import './MoviePage.css';

// throttle 함수 구현
const throttle = (func, limit) => {
	let inThrottle;
	return function () {
		const args = arguments;
		const context = this;
		if (!inThrottle) {
			func.apply(context, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
};

const MoviePage = () => {
	const [query] = useSearchParams();
	const location = useLocation();
	const [page, setPage] = useState(1);
	const keyword = query.get('q');
	const [movies, setMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);
	const loader = useRef(null);
	const [showTopButton, setShowTopButton] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { data: movieData, isLoading: isMovieLoading, isError: isMovieError, error: movieError, refetch } = useSearchMovieQuery({ keyword, page });
	const { data: genres, isLoading: isGenreLoading } = useMovieGenreQuery();

	useEffect(() => {
		setMovies([]);
		setFilteredMovies([]);
		setPage(1);
		setIsLoading(true); // 데이터 로딩 시작
		refetch();
	}, [keyword, location, refetch]);

	useEffect(() => {
		if (movieData && movieData.results) {
			const uniqueMovies = (prevMovies) => {
				return [...prevMovies, ...movieData.results].filter((movie, index, self) => self.findIndex((m) => m.id === movie.id) === index);
			};
			setMovies(uniqueMovies);
			setFilteredMovies(uniqueMovies);
			setIsLoading(false); // 데이터 로딩 완료
		}
	}, [movieData]);

	const filterByGenre = (genreId) => {
		setFilteredMovies(movies.filter((movie) => movie.genre_ids.includes(genreId)));
	};

	const resetFilter = () => {
		setFilteredMovies(movies);
	};

	const observer = useRef();

	const handleObserver = useCallback(
		(entries) => {
			const target = entries[0];
			if (target.isIntersecting && !isLoading) {
				setIsLoading(true); // 데이터 로딩 시작
				setPage((prev) => prev + 1);
				console.log('실행중');
			}
		},
		[isLoading]
	);

	useEffect(() => {
		const throttledObserver = throttle(handleObserver, 1000);
		observer.current = new IntersectionObserver(throttledObserver, {
			root: null,
			rootMargin: '20px',
			threshold: 1.0,
		});

		const currentLoader = loader.current;
		if (currentLoader) {
			observer.current.observe(currentLoader);
		}

		return () => {
			if (currentLoader) observer.current.unobserve(currentLoader);
		};
	}, [handleObserver]);

	const sortMovies = (sortOrder) => {
		const sortedMovies = [...filteredMovies].sort((a, b) => {
			return sortOrder === 'popularity.desc' ? b.popularity - a.popularity : a.popularity - b.popularity;
		});
		setFilteredMovies(sortedMovies);
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleScroll = () => {
		setShowTopButton(window.pageYOffset > 300);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

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
						{isMovieLoading && <Spinner animation='grow' variant='danger' />}
					</div>
				</Col>
			</Row>
			{showTopButton && (
				<Button variant='danger' onClick={scrollToTop} className='top_btn'>
					Top
				</Button>
			)}
		</Container>
	);
};

export default MoviePage;
