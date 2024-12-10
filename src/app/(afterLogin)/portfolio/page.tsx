'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';

type StockData = {
  name?: string;
  symbol: string;
  price?: number;
  currency?: string;
};

export default function StockPortfolio() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<StockData | null>(null);
  const [portfolio, setPortfolio] = useState<StockData[]>([]);
  const [token, setToken] = useState<string | null>(null);

  // JWT 토큰 로드 및 초기 데이터 가져오기
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (!storedToken) {
      // 토큰이 없는 경우 바로 로그인 페이지로 리다이렉션
      window.location.href = '/auth/login';
    } else {
      setToken(storedToken);
      fetchPortfolio(storedToken); // 포트폴리오 데이터 가져오기
    }
  }, []);

  // 포트폴리오 데이터 가져오기
  const fetchPortfolio = async (token: string) => {
    try {
      const response = await axios.get('http://localhost:8000/portfolio', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPortfolio(response.data.portfolio);
    } catch (error) {
      console.error('포트폴리오 데이터를 가져오는 중 오류 발생:', error);
    }
  };

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
          searchTerm
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error('주식 데이터를 가져오는 중 오류 발생:', error);
      setSearchResults(null);
    }
  };

  // 검색한 주식을 Firebase에 저장
  const addStockToPortfolio = async () => {
    if (!searchResults || !token) return;

    try {
      await axios.post(
        'http://localhost:8000/portfolio',
        {
          symbol: searchResults.symbol,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('포트폴리오에 추가되었습니다!');
      fetchPortfolio(token); // 업데이트된 포트폴리오 다시 가져오기
    } catch (error) {
      console.error('포트폴리오에 추가하는 중 오류 발생:', error);
    }
  };

  // 포트폴리오에서 주식 삭제
  const deleteStockFromPortfolio = async (symbol: string) => {
    if (!token) return;

    try {
      await axios.delete(`http://localhost:8000/portfolio/${symbol}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(`${symbol}이(가) 포트폴리오에서 삭제되었습니다.`);
      fetchPortfolio(token); // 업데이트된 포트폴리오 다시 가져오기
    } catch (error) {
      console.error('포트폴리오에서 삭제하는 중 오류 발생:', error);
    }
  };

  // 토큰 확인 중에는 아무것도 렌더링하지 않음
  if (!token) {
    return null;
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
      <Head>
        <title>Stock Portfolio</title>
        <meta name='description' content='Manage your stock portfolio' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='max-w-5xl mx-auto pt-20 px-6'>
        <section id='stock-search' className='mb-12'>
          <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>
            주식 검색
          </h2>
          <div className='flex flex-col items-center'>
            <input
              type='text'
              placeholder='주식 이름 또는 심볼 입력'
              value={searchTerm}
              onChange={handleSearchChange}
              className='border border-gray-300 rounded-lg p-4 w-full max-w-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
              onClick={fetchStockData}
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mt-4 shadow-lg transition-transform transform hover:scale-105'
            >
              검색
            </button>
          </div>
          <div className='mt-8'>
            {searchResults ? (
              <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
                <h3 className='text-2xl font-semibold text-gray-700'>
                  검색 결과
                </h3>
                <p>
                  <strong>이름:</strong> {searchResults.name}
                </p>
                <p>
                  <strong>심볼:</strong> {searchResults.symbol}
                </p>
                <p>
                  <strong>종가:</strong> {searchResults.price}{' '}
                  {searchResults.currency}
                </p>
                <button
                  onClick={addStockToPortfolio}
                  className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-4'
                >
                  포트폴리오에 추가
                </button>
              </div>
            ) : (
              <p className='text-center text-gray-500'>검색 결과가 없습니다.</p>
            )}
          </div>
        </section>

        <section id='portfolio' className='mt-12'>
          <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>
            나의 포트폴리오
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {portfolio.map((stock, index) => (
              <div
                key={index}
                className='bg-white p-4 rounded-lg shadow-md border border-gray-200'
              >
                <p className='text-lg font-semibold text-gray-700'>
                  심볼: {stock.symbol}
                </p>
                <button
                  onClick={() => deleteStockFromPortfolio(stock.symbol)}
                  className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-4'
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 포트폴리오 개요 섹션 */}
        <section
          id='overview'
          className='mt-20 grid grid-cols-1 md:grid-cols-2 gap-8'
        >
          <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-200'>
            <h3 className='text-xl font-semibold text-gray-700'>총 가치</h3>
            <p className='mt-4 text-3xl font-bold text-gray-800'>$0.00</p>
            <p className='text-sm text-gray-500 mt-2'>$0.00 투자됨</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-200'>
            <h3 className='text-xl font-semibold text-gray-700'>총 손익</h3>
            <p className='mt-4 text-3xl font-bold text-gray-800'>$0.00 (0%)</p>
            <p className='text-sm text-gray-500 mt-2'>$0.00 (0% 일일)</p>
          </div>
        </section>
      </main>
    </div>
  );
}
