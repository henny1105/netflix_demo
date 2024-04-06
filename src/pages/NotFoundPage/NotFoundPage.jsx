import React from 'react';
import './NotFoundPage.css';

const NotFoundPage = () => {
	return (
		<div className='NotFoundPage'>
			<div class='error_header'>
				<div class='error_logo'>
					<a href='/'>Netflix</a>
				</div>
			</div>
			<div className='error_box'>
				<h1>길을 잃으셨나요?</h1>
				<p>죄송합니다. 해당 페이지를 찾을 수 없습니다. 홈페이지로 이동해 다양한 콘텐츠를 만나보세요.</p>
				<button>Netflix 홈</button>
				<div className='error_code'>
					<span>
						오류 코드: <strong>NSES-404</strong>
					</span>
				</div>
			</div>
			{/* <img src='https://assets.nflxext.com/ffe/siteui/pages/errors/bg-lost-in-space.png' alt='배경화면 이미지' /> */}
		</div>
	);
};

export default NotFoundPage;
