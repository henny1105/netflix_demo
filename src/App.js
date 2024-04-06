import logo from './logo.svg';
import './App.css';
import { Route, Routes, Router } from 'react-router-dom';
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
		<Router>
			<Routes>
				<Route path='/' element={<AppLayout />} />
				<Route index element={<Homepage />} />

				<Route path='movies'>
					<Route index element={<MoviePage />} />
					<Route path=':id' element={<MovieDetailPage />} />
				</Route>
				<Route path='*' element={<NotFoundPage />} />

				{/* 
        <Route path='/movies' element={<MoviePage />} />
				<Route path='/movies/:id' element={<MovieDetailPage />} /> 
        */}
			</Routes>
		</Router>
	);
}

export default App;
