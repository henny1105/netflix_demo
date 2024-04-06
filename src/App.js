import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './Layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import MoviePage from './pages/Movies/MoviePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

// 홈페이지 /
// 영화 전체 보여주는 페이지(서치) / movies
// 영화 디테일 페이지 /movies/:id

function App() {
	return (
		<Routes>
			<Route path='/' element={<AppLayout />}>
				<Route index element={<Homepage />} />
				<Route path='movies' element={<MoviePage />} />
				<Route path='movies/:id' element={<MovieDetailPage />} />
			</Route>
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
