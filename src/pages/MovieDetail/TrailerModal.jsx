import { Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { useYoutubeMoviesQuery } from '../hooks/useMovieYoutube';
import { Spinner } from 'react-bootstrap';

const TrailerModal = ({ movieId, show, handleClose }) => {
	const { data: trailerData, isLoading, isError } = useYoutubeMoviesQuery(movieId);

	if (isLoading) return <Spinner animation='border' variant='danger' style={{ width: '5rem', height: '5rem' }} />;
	if (isError) return <p>Error loading trailer.</p>;

	const trailerUrl = trailerData?.results.find((video) => video.site === 'YouTube' && video.type === 'Trailer')?.key;
	const youtubeUrl = `https://www.youtube.com/watch?v=${trailerUrl}`;

	return (
		<Modal show={show} onHide={handleClose} size='lg' centered>
			<Modal.Header closeButton>
				<Modal.Title>예고편</Modal.Title>
			</Modal.Header>
			<Modal.Body>{trailerUrl ? <ReactPlayer url={youtubeUrl} controls width='100%' /> : <p>예고편이 없습니다.</p>}</Modal.Body>
		</Modal>
	);
};

export default TrailerModal;
