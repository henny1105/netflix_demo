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
		<div className='inner'>
			<Navbar expand='lg' className='bg-body-tertiary'>
				<Container fluid>
					<Navbar.Brand as={Link} to='/'>
						<img src='https://images.ctfassets.net/4cd45et68cgf/4nBnsuPq03diC5eHXnQYx/d48a4664cdc48b6065b0be2d0c7bc388/Netflix-Logo.jpg' width={150} alt='로고 이미지' />
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
