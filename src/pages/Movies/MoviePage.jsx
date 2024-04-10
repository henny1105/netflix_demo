import { useSearchMovieQuery } from '../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import './MoviePage.css';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';

// 경로 2가지
// nav바에서 클릭해서 온 경우 => popularMovie 보여주기
// keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌

// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭할 때마다 page 변경
// 페이지 값이 바뀔 때 마다 useSearchMovie에 page까지 넣어서 fetch 한다

const MoviePage = () => {
	const [query] = useSearchParams();
	const [page, setPage] = useState(1);
	const keyword = query.get('q');

	const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword });

	const handlePageClick = () => {};

	if (isLoading) {
		return (
			<div className='spinner-area'>
				<Spinner animation='border' variant='danger' style={{ width: '5rem', height: '5rem' }} />
			</div>
		);
	}

	if (isError) {
		return <Alert variant='danger'>{error.message}</Alert>;
	}

	return (
		<Container className='search_list'>
			<Row>
				<Col lg={4} xs={12}>
					{' '}
					filter{' '}
				</Col>
				<Col lg={8} xs={12}>
					<Row>
						{data?.results.map((movie) => (
							<Col key={movie.id} lg={4} xs={12}>
								<MovieCard movie={movie} />
							</Col>
						))}
					</Row>
					<ReactPaginate
						nextLabel='next >'
						onPageChange={handlePageClick}
						pageRangeDisplayed={3}
						marginPagesDisplayed={2}
						pageCount={page} // 전체 페이지
						previousLabel='< previous'
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
						renderOnZeroPageCount={null}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default MoviePage;
