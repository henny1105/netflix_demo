import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import './AppLayout.css';

const AppLayout = () => {
	const [keyword, setKeyword] = useState('');
	const navigate = useNavigate();

	const searchByKeyword = (event) => {
		event.preventDefault();
		navigate(`/movies?q=${keyword}`);
	};

	return (
		<div>
			<Navbar expand='lg' className='bg-body-tertiary inner'>
				<Container fluid>
					<Navbar.Brand as={Link} to='/'>
						<img
							src='https://mblogthumb-phinf.pstatic.net/MjAyMDA0MjBfODIg/MDAxNTg3MzI2ODE2MjM1.voFzSB2MEmU7lIMdsY4mvckszWK3xrCPhvly5ftu9gEg._A-L_to3jbTBUv1szTmPS3cikFymBtZoATUiOaXde5sg.PNG.ch7000000/Netflix_2015_KOR_logo.png?type=w800'
							width={150}
							alt='로고 이미지'
						/>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='navbarScroll' />
					<Navbar.Collapse id='navbarScroll'>
						<Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '100px' }} navbarScroll>
							<Nav.Link as={Link} to='/'>
								Home
							</Nav.Link>
							<Nav.Link as={Link} to='/movies'>
								Movies
							</Nav.Link>
						</Nav>
						<Form className='d-flex' onSubmit={searchByKeyword}>
							<Form.Control type='search' placeholder='Search for movies' className='me-2' aria-label='Search' value={keyword} onChange={(event) => setKeyword(event.target.value)} />
							<Button variant='danger'>Search</Button>
						</Form>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Outlet />
		</div>
	);
};

export default AppLayout;
