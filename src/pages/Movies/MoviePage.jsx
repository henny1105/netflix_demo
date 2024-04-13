import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, Dropdown } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import { useSearchMovieQuery } from '../hooks/useSearchMovie';
import { useMovieGenreQuery } from '../hooks/useMovieGenre';
import './MoviePage.css';

const MoviePage = () => {
	const [query] = useSearchParams();
	const [page, setPage] = useState(1);
	const keyword = query.get('q');
	const [movies, setMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);

	const { data: movieData, isLoading: isMovieLoading, isError: isMovieError, error: movieError, refetch } = useSearchMovieQuery({ keyword, page });
	const { data: genres, isLoading: isGenreLoading } = useMovieGenreQuery();

	useEffect(() => {
		if (movieData && movieData.results) {
			setMovies(movieData.results);
			setFilteredMovies(movieData.results);
		}
	}, [movieData]);

	useEffect(() => {
		if (keyword) {
			refetch();
		}
	}, [keyword]);

	const filterByGenre = (genreId) => {
		const filtered = movies.filter((movie) => movie.genre_ids.includes(genreId));
		setFilteredMovies(filtered);
	};

	const resetFilter = () => {
		setFilteredMovies(movies);
	};

	const handlePageClick = ({ selected }) => {
		setPage(selected + 1);
	};

	const sortMovies = (sortOrder) => {
		const sortedMovies = [...movies].sort((a, b) => {
			if (sortOrder === 'popularity.desc') {
				return b.popularity - a.popularity;
			} else {
				return a.popularity - b.popularity;
			}
		});
		setFilteredMovies(sortedMovies);
	};

	if (isMovieLoading || isGenreLoading) {
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
					<ReactPaginate
						nextLabel='다음 >'
						onPageChange={handlePageClick}
						pageRangeDisplayed={3}
						marginPagesDisplayed={2}
						pageCount={movieData?.total_pages}
						previousLabel='< 이전'
						pageClassName='page-item'
						pageLinkClassName='page-link'
						previousClassName='page-item'
						previousLinkClassName='page-link'
						nextClassName='page-item'
						nextLinkClassName='page-link'
						breakLabel='...'
						breakClassName='page-item'
						breakLinkClassName='page-link'
						containerClassName='pagination'
						activeClassName='active'
						forcePage={page - 1}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default MoviePage;
