import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link } from 'react-router-dom';
import './AppLayout.css';

const AppLayout = () => {
	return (
		<div>
			<Navbar expand='lg' className='bg-body-tertiary inner'>
				<Container fluid>
					<Navbar.Brand as={Link} to='/'>
						<img src='//i.namu.wiki/i/My20U8bGJMuTWnJE95eJcg2YvKqkEpIn3mZy-S-nApk0IwK1mBQnHlZA_rUgu7wNJGCMtlp_cPdWd7WcdTDBZQ.svg' width={150} alt='로고 이미지' />
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
						<Form className='d-flex'>
							<Form.Control type='search' placeholder='Search' className='me-2' aria-label='Search' />
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
