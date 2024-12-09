'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';

type StockData = {
	name: string;
	symbol: string;
	price: number;
	currency: string;
} | null;

export default function StockPortfolio() {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState<StockData>(null); // 타입 명시적으로 설정해서 빨간줄 없앰
	const [token, setToken] = useState<string | null>(null);

	// JWT 토큰 로드
	useEffect(() => {
		const storedToken = localStorage.getItem('access_token');
		if (storedToken) {
			setToken(storedToken);
		} else {
			alert('로그인이 필요합니다.');
			window.location.href = '/auth/login'; // 로그인 페이지로 리디렉션
		}
	}, []);

	// 검색어 입력 시 상태를 업데이트
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	// FastAPI 호출하여 주식 데이터를 검색
	const fetchStockData = async () => {
		if (searchTerm.trim() === '' || !token) return;

		try {
			const response = await axios.get(
				`http://localhost:8000/searchStocks?query=${encodeURIComponent(
					searchTerm,
				)}`,
				{
					headers: {
						Authorization: `Bearer ${token}`, // JWT 토큰 포함
					},
				},
			);
			setSearchResults(response.data);
		} catch (error) {
			console.error('주식 데이터를 가져오는 중 오류 발생:', error);
			setSearchResults(null);
		}
	};

	return (
		<div className='bg-white min-h-screen'>
			<Head>
				<title>주식 포트폴리오</title>
				<meta
					name='description'
					content='나주식 포트폴리오 페이지에 오신 것을 환영합니다.'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='pt-[4.25rem] p-6'>
				{/* 검색 섹션 */}
				<section id='stock-search' className='my-12'>
					<h2 className='text-2xl font-semibold text-center'>주식 검색</h2>
					<div className='mt-6 flex flex-col items-center'>
						<input
							type='text'
							placeholder='주식 이름 또는 심볼 입력'
							value={searchTerm}
							onChange={handleSearchChange}
							className='border border-gray-300 rounded-lg p-2 w-full max-w-md'
						/>
						<button
							onClick={fetchStockData}
							className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-4'>
							검색
						</button>
					</div>

					{/* 검색 결과 표시 */}
					<div className='mt-8'>
						{searchResults ? (
							<div className='bg-gray-100 p-6 rounded-lg shadow-md'>
								<h3 className='text-xl font-bold'>검색 결과</h3>
								<p className='mt-2'>
									<strong>이름:</strong> {searchResults.name}
								</p>
								<p>
									<strong>심볼:</strong> {searchResults.symbol}
								</p>
								<p>
									<strong>종가:</strong> {searchResults.price} {searchResults.currency}
								</p>
							</div>
						) : (
							<p className='text-center text-gray-500'>검색 결과가 없습니다.</p>
						)}
					</div>
				</section>

				<section id='overview' className='my-12'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<div className='bg-gray-100 p-6 rounded-lg shadow-md'>
							<h3 className='text-xl font-bold'>총 가치</h3>
							<p className='mt-2 text-gray-800'>$0.00</p>
							<p className='text-gray-500'>$0.00 투자됨</p>
						</div>
						<div className='bg-gray-100 p-6 rounded-lg shadow-md'>
							<h3 className='text-xl font-bold'>총 손익</h3>
							<p className='mt-2 text-gray-800'>$0.00 (0%)</p>
							<p className='text-gray-500'>$0.00 (0% 일일)</p>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
