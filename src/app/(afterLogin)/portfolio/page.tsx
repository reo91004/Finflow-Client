'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// AssetRowProps 인터페이스
interface AssetData {
  logo: string;
  name: string;
  symbol: string;
  amount: number;
  buyPrice: number;
  totalBuyPrice: number;
  currentPrice: number;
  dividend: number;
  dividendYield: number;
  totalProfit: number;
  dailyProfit: number;
}

// 검색 결과 타입 정의
interface SearchResult {
  logo?: string;
  name?: string;
  symbol?: string;
  currency: string;
  currentPrice?: number;
  changePercent?: number;
  high52Week?: number;
  low52Week?: number;
}

export default function PortfolioTable() {
  const [token, setToken] = useState<string | null>(null); // JWT 토큰 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [ticker, setTicker] = useState(''); // 검색할 티커
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null); // 검색 결과 상태

  // 포트폴리오 데이터 상태
  const [portfolioData, setPortfolioData] = useState<AssetData[]>([]);

  // 토큰 로드
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      window.location.href = '/auth/login';
    }
  }, []);

  // 포트폴리오 불러오기 함수
  const fetchPortfolio = async () => {
    if (!token) return;
    try {
      const response = await axios.get('http://localhost:8000/portfolio', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPortfolioData(response.data.portfolio);
      console.log(response.data.portfolio);
    } catch (error) {
      console.error(error);
      alert('포트폴리오 데이터를 가져오는 데 실패했습니다.');
    }
  };

  // 컴포넌트 마운트 시 포트폴리오 불러오기
  useEffect(() => {
    fetchPortfolio();
  }, [token]);

  const handleAddSuccess = (newStock: AssetData) => {
    setPortfolioData((prevData) => [...prevData, newStock]);
  };

  // 티커 데이터 검색 함수
  const fetchTickerData = async (ticker: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/searchStocks?query=${ticker}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      setSearchResult(response.data);
    } catch (error) {
      console.error(error);
      alert('티커 정보를 가져오는 데 실패했습니다.');
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div>
      <PortfolioHeader setIsModalOpen={setIsModalOpen} />
      <PortfolioTableContent
        portfolioData={portfolioData}
        onDeleteSuccess={fetchPortfolio}
      />
      {isModalOpen && (
        <SearchModal
          ticker={ticker}
          setTicker={setTicker}
          onSearch={fetchTickerData}
          onClose={() => setIsModalOpen(false)}
          searchResult={searchResult}
          onAddSuccess={handleAddSuccess}
        />
      )}
    </div>
  );
}

/**
 * PortfolioHeader 컴포넌트
 */
function PortfolioHeader({
  setIsModalOpen,
}: {
  setIsModalOpen: (v: boolean) => void;
}) {
  return (
    <div className='flex justify-between items-center mb-4'>
      <div className='flex items-center gap-6'>
        <Tabs defaultValue='계좌 합계'>
          <TabsList>
            <TabsTrigger value='계좌 합계'>계좌 합계</TabsTrigger>
            <TabsTrigger value='계좌1'>계좌1</TabsTrigger>
          </TabsList>
        </Tabs>
        <button className='bg-[#e1f0ff] hover:bg-[#3699ff] text-[#3699ff] hover:text-[#ffffff] flex justify-center items-center gap-2 px-3.5 py-2 text-sm rounded-[0.4rem] transition-all'>
          {/* 계좌 관리 아이콘 */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='#000000'
            height='14'
            width='14'
            viewBox='0 0 489.8 489.8'
          >
            <g>
              <g>
                <g>
                  <path
                    d='M469.1,182.95h-38.2c-3.1-8.3-6.2-16.6-10.3-23.8l26.9-26.9c8.3-8.2,8.3-20.6,0-28.9l-60-60c-8.2-8.3-20.6-8.3-28.9,0
                       l-27.9,27.9c-7.2-3.1-15.5-6.2-22.7-9.3v-39.3c0-11.4-9.3-20.7-20.7-20.7h-84.8c-11.4,0-20.7,9.3-20.7,20.7v37.1
                       c-8.2,3.1-15.5,6.2-22.7,9.3l-27.9-27.9c-8.2-8.3-20.6-8.3-28.9,0l-60,60c-8.3,8.2-8.3,20.6,0,28.9l26.9,26.9
                       c-4.1,8.3-7.2,15.5-10.3,23.8H20.7c-11.4,0-20.7,9.3-20.7,20.7v84.8c0,11.4,9.3,20.7,20.7,20.7h35.1c3.1,8.3,6.2,16.5,10.3,24.8
                       l-25.8,25.8c-4.1,4.1-11.6,16.3,0,28.9l60,60c8.2,8.3,20.6,8.3,28.9,0l24.8-24.8c8.2,5.2,16.5,8.3,25.8,11.4v34.1
                       c0,11.4,9.3,20.7,20.7,20.7h84.8c11.4,0,20.7-9.3,19.7-18.5v-34.1c8.2-3.1,17.5-7.3,25.8-11.4l24.8,24.8
                       c8.2,8.3,20.6,8.3,28.9,0l60-60c8.3-8.2,8.3-20.6,0-28.9l-25.8-25.8c4.1-8.3,7.2-16.5,10.3-24.8h40.1
                       c11.4,0,20.7-9.3,20.7-20.7v-84.8C489.8,192.25,480.5,182.95,469.1,182.95z M445.6,266.75h-31c-9.3,0-17.5,6.2-19.6,15.5
                       c-4.2,15.5-9.3,30-17.6,43.4c-5.2,8.3-3.1,18.6,3.1,24.8l21.7,21.7l-31,31l-20.7-20.7c-6.2-7.2-16.5-8.3-24.8-3.1
                       c-14.5,8.3-29,14.5-44.5,18.6c-9.3,2-15.5,10.3-15.5,19.6v30h-44.5v-0.1h-1v-30c0-9.3-6.2-17.5-15.5-19.6
                       c-15.6-4.1-31.1-10.3-44.5-18.6c-8.3-5.2-18.6-3.1-24.8,3.1l-20.7,20.7l-31-31l21.7-21.7c6.2-7.2,8.3-16.5,3.1-24.8
                       c-8.3-13.4-14.5-27.9-17.6-43.4c-2-9.3-10.3-15.5-19.6-15.5h-31v-44.5h33.1c9.3,0,17.5-6.2,19.6-15.5
                       c3.1-14.5,9.3-28,17.6-41.4c5.2-8.3,3.1-18.6-3.1-24.8l-23.8-23.8l31-31l23.8,23.8c7.2,6.2,16.5,8.3,24.8,3.1
                       c13.5-7.2,26.9-13.4,41.4-16.5c9.3-2,15.5-10.3,15.5-19.6v-34.1h44.5v35.2c0,9.3,6.2,17.5,15.5,19.6
                       c14.5,3.1,29,9.3,41.4,16.5c8.3,5.2,18.6,3.1,24.8-3.1l24.8-24.8l31,31l-23.8,23.8c-7.2,6.2-8.3,16.5-3.1,24.8
                       c7.3,12.5,13.5,26.9,17.6,41.4c2,9.3,10.3,15.5,19.6,15.5h33.1V266.75z'
                    fill='currentColor'
                  />
                  <path
                    d='M242.9,132.25c-62,0-112.7,50.7-112.7,112.7s50.7,112.7,112.7,112.7c62.1,0,112.7-50.7,112.7-112.7
                       S304.9,132.25,242.9,132.25z M242.9,317.35c-39.3,0-72.4-32.1-72.4-72.4c0-39.3,32.1-72.4,72.4-72.4
                       c40.3,0,72.4,32.1,72.4,72.4C315.3,284.25,282.2,317.35,242.9,317.35z'
                    fill='currentColor'
                  />
                </g>
              </g>
            </g>
          </svg>
          계좌 관리
        </button>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className='bg-white hover:bg-slate-100 text-slate-700 flex justify-center items-center gap-2 px-3.5 py-2 text-sm rounded-[0.4rem] transition-all drop-shadow-sm'
      >
        {/* 투자 추가 아이콘 */}
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          version='1.1'
          xmlns='http://www.w3.org/1999/xlink'
        >
          <g
            id='Stockholm-icons-/-Code-/-Plus'
            stroke='none'
            strokeWidth='1'
            fill='none'
            fillRule='evenodd'
          >
            <rect id='bound' x='0' y='0' width='24' height='24'></rect>
            <circle
              id='Oval-5'
              fill='currentColor'
              opacity='0.3'
              cx='12'
              cy='12'
              r='10'
            ></circle>
            <path
              d='M11,11 L11,7 C11,6.44771525 11.4477153,6 12,6 C12.5522847,6 13,6.44771525 13,7 L13,11 L17,11 C17.5522847,11 18,11.4477153 18,12 
                 C18,12.5522847 17.5522847,13 17,13 L13,13 L13,17 C13,17.5522847 12.5522847,18 12,18 
                 C11.4477153,18 11,17.5522847 11,17 L11,13 L7,13 
                 C6.44771525,13 6,12.5522847 6,12 
                 C6,11.4477153 6.44771525,11 7,11 L11,11 Z'
              fill='currentColor'
            ></path>
          </g>
        </svg>
        투자 추가
      </button>
    </div>
  );
}

/**
 * PortfolioTableContent 컴포넌트
 * onDeleteSuccess: 삭제 후 화면 갱신을 위한 콜백
 */
function PortfolioTableContent({
  portfolioData,
  onDeleteSuccess,
}: {
  portfolioData: AssetData[];
  onDeleteSuccess: () => void;
}) {
  return (
    <div className='p-12 bg-white rounded-[1rem] drop-shadow-xl'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[50px]'>
              <Checkbox />
            </TableHead>
            <TableHead className='text-slate-400'>보유 금융 자산</TableHead>
            <TableHead className='text-slate-400'>보유량</TableHead>
            <TableHead className='text-slate-400'>구매가</TableHead>
            <TableHead className='text-slate-400'>총 구매가</TableHead>
            <TableHead className='text-slate-400'>현재가</TableHead>
            <TableHead className='text-slate-400'>배당금</TableHead>
            <TableHead className='text-slate-400'>배당 수익률</TableHead>
            <TableHead className='text-slate-400'>총 수익</TableHead>
            <TableHead className='text-slate-400'>일간 수익</TableHead>
            <TableHead className='text-slate-400'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {portfolioData.map((asset, index) => (
            <AssetRow
              key={index}
              {...asset}
              onDeleteSuccess={onDeleteSuccess}
            />
          ))}
        </TableBody>
        <tfoot className='border-t'>
          <TableRow className='border-b-0'>
            <TableCell></TableCell>
            <TableCell className='font-medium text-slate-700'>Total</TableCell>
            <TableCell className='font-medium text-slate-700'>
              {portfolioData.reduce((acc, asset) => acc + asset.amount, 0)}
            </TableCell>
            <TableCell className='font-medium text-slate-700'></TableCell>
            <TableCell className='font-medium text-slate-700'>
              $
              {portfolioData
                .reduce((acc, asset) => acc + asset.totalBuyPrice, 0)
                .toFixed(2)}
            </TableCell>
            <TableCell className='font-medium text-slate-700'>
              $
              {portfolioData
                .reduce(
                  (acc, asset) => acc + asset.currentPrice * asset.amount,
                  0
                )
                .toFixed(2)}
            </TableCell>
            <TableCell className='font-medium text-slate-700'>
              $
              {portfolioData
                .reduce((acc, asset) => acc + asset.dividend, 0)
                .toFixed(2)}
            </TableCell>
            <TableCell className='font-medium text-slate-700'>
              {(
                portfolioData.reduce(
                  (acc, asset) => acc + asset.dividendYield,
                  0
                ) / (portfolioData.length || 1)
              ).toFixed(2)}
              %
            </TableCell>
            <TableCell className='font-medium text-[#1bc5bd]'>
              {portfolioData
                .reduce((acc, asset) => acc + asset.totalProfit, 0)
                .toFixed(2)}
            </TableCell>
            <TableCell className='font-medium text-[#1bc5bd]'>
              {portfolioData
                .reduce((acc, asset) => acc + asset.dailyProfit, 0)
                .toFixed(2)}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </div>
  );
}

function Checkbox() {
  return (
    <input
      type='checkbox'
      className="w-4 h-4 appearance-none bg-slate-200 text-white rounded-[0.2rem] 
        relative border-2 border-transparent checked:border-transparent 
        checked:bg-[#3699FE] checked:before:block checked:before:content-['✓'] 
        checked:before:absolute checked:before:inset-0 checked:before:text-white 
        checked:before:flex checked:before:items-center checked:before:justify-center transition-all"
    />
  );
}

/**
 * AssetRow 컴포넌트
 * - 개별 종목 정보를 한 행으로 표시
 * - 삭제 버튼 추가: 포트폴리오에서 해당 티커 삭제
 */
function AssetRow({
  logo,
  name,
  symbol,
  amount,
  buyPrice,
  totalBuyPrice,
  currentPrice,
  dividend,
  dividendYield,
  totalProfit,
  dailyProfit,
  onDeleteSuccess,
}: AssetData & { onDeleteSuccess: () => void }) {
  const profitColor = totalProfit >= 0 ? 'text-[#1bc5bd]' : 'text-red-500';
  const dailyProfitColor = dailyProfit >= 0 ? 'text-[#1bc5bd]' : 'text-red-500';

  // 주식 삭제 함수
  const deleteStock = async () => {
    if (!symbol) return;
    if (!confirm(`${symbol} 주식을 포트폴리오에서 삭제하시겠습니까?`)) return;
    try {
      await axios.delete(`http://localhost:8000/portfolio/${symbol}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      alert(`${symbol} 주식이 삭제되었습니다.`);
      // 삭제 후 화면 갱신
      onDeleteSuccess();
    } catch (error) {
      console.error(error);
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell className='flex items-center gap-2'>
        <img src={logo} alt={`${name} Logo`} className='w-6 h-6' />
        <div>
          <p className='font-medium text-slate-700'>{name}</p>
          <p className='text-xs text-slate-500'>{symbol}</p>
        </div>
      </TableCell>
      <TableCell className='text-slate-700'>{amount}</TableCell>
      <TableCell className='text-slate-700'>${buyPrice}</TableCell>
      <TableCell className='text-slate-700'>${totalBuyPrice}</TableCell>
      <TableCell className='text-slate-700'>${currentPrice}</TableCell>
      <TableCell className='text-slate-700'>${dividend}</TableCell>
      <TableCell className='text-slate-700'>{dividendYield}%</TableCell>
      <TableCell className={profitColor}>
        {totalProfit >= 0 ? '+' : ''}${totalProfit}
      </TableCell>
      <TableCell className={dailyProfitColor}>
        {dailyProfit >= 0 ? '+' : ''}${dailyProfit}
      </TableCell>
      <TableCell>
        <div className='flex gap-2'>
          {/* 옵션 버튼 */}
          <button className='p-2 bg-slate-100 hover:bg-slate-200 text-gray-400 hover:text-gray-600 rounded-[0.3rem] transition-all'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              viewBox='0 0 256 256'
              enableBackground='new 0 0 256 256'
              xmlSpace='preserve'
              width='16'
              height='16'
            >
              <g>
                <g>
                  <path
                    fill='#7E8299'
                    d='M10,128c0,13.4,10.9,24.3,24.3,24.3s24.2-10.9,24.2-24.3s-10.9-24.3-24.3-24.3S10,114.6,10,128z'
                  />
                  <path
                    fill='#7E8299'
                    d='M103.7,128c0,13.4,10.9,24.3,24.3,24.3c13.4,0,24.3-10.9,24.3-24.3s-10.9-24.3-24.3-24.3
                    C114.6,103.7,103.7,114.6,103.7,128L103.7,128z'
                  />
                  <path
                    fill='#7E8299'
                    d='M197.5,128c0,13.4,10.9,24.3,24.3,24.3c13.4,0,24.3-10.9,24.3-24.3c0-13.4-10.9-24.3-24.3-24.3
                    C208.3,103.7,197.5,114.6,197.5,128z'
                  />
                </g>
              </g>
            </svg>
          </button>
          {/* 삭제 버튼 */}
          <button
            onClick={deleteStock}
            className='p-2 bg-red-100 hover:bg-red-200 text-red-400 hover:text-red-600 rounded-[0.3rem] transition-all'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              width='16'
              height='16'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}

interface SearchModalProps {
  ticker: string;
  setTicker: (v: string) => void;
  onSearch: (ticker: string) => void;
  onClose: () => void;
  searchResult: SearchResult | null;
}

function SearchModal({
  ticker,
  setTicker,
  onSearch,
  onClose,
  searchResult,
  onAddSuccess,
}: SearchModalProps & { onAddSuccess: (newStock: AssetData) => void }) {
  const [quantity, setQuantity] = useState<number>(1);

  const addStockToPortfolio = async () => {
    if (!searchResult) return;

    if (quantity < 1) {
      alert('수량은 1 이상의 정수를 입력해주세요.');
      return;
    }

    try {
      const currency = searchResult.currency || 'USD';
      await axios.post(
        'http://localhost:8000/portfolio',
        {
          symbol: searchResult.symbol,
          name: searchResult.name,
          currentPrice: searchResult.currentPrice,
          currency: currency,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      // 새로 추가된 데이터를 반영
      const newStock: AssetData = {
        logo: searchResult.logo || 'https://via.placeholder.com/50',
        name: searchResult.name || 'Unknown',
        symbol: searchResult.symbol || 'Unknown',
        amount: quantity,
        buyPrice: searchResult.currentPrice || 0,
        totalBuyPrice: (searchResult.currentPrice || 0) * quantity,
        currentPrice: searchResult.currentPrice || 0,
        dividend: 0, // 배당금은 기본값으로 설정
        dividendYield: 0, // 배당 수익률은 기본값으로 설정
        totalProfit: 0, // 기본값
        dailyProfit: 0, // 기본값
      };

      // 상태 업데이트 콜백 호출
      onAddSuccess(newStock);

      alert(`${searchResult.name} 주식 ${quantity}주가 계좌에 추가되었습니다.`);
    } catch (error) {
      console.error(error);
      alert('계좌에 주식을 추가하는 데 실패했습니다.');
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-[1rem] shadow-lg w-[400px]'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold text-slate-700'>티커 검색</h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              width='24'
              height='24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <input
          type='text'
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder='티커를 입력하세요...'
          className='w-full border border-slate-200 p-2.5 rounded-lg mb-4 focus:ring focus:ring-blue-200 outline-none transition-shadow'
        />
        <div className='flex justify-end gap-2'>
          <button
            onClick={() => onSearch(ticker)}
            className='bg-[#3699ff] hover:bg-[#1a73e8] text-white px-4 py-2 rounded-lg transition-colors shadow-md'
          >
            검색
          </button>
          <button
            onClick={onClose}
            className='bg-gray-300 hover:bg-gray-400 text-slate-700 px-4 py-2 rounded-lg transition-colors shadow-md'
          >
            닫기
          </button>
        </div>

        {searchResult && (
          <div className='mt-6'>
            <h3 className='text-lg font-semibold text-slate-700 mb-4'>
              검색 결과:
            </h3>
            <div className='bg-white p-6 rounded-[1rem] shadow-lg border border-slate-200'>
              <div className='flex items-center gap-4 mb-4'>
                <img
                  src={searchResult.logo || 'https://via.placeholder.com/50'}
                  alt={`${searchResult.name} Logo`}
                  className='w-12 h-12 rounded-full'
                />
                <div>
                  <p className='text-xl font-semibold text-slate-700'>
                    {searchResult.name || 'Company Name'}
                  </p>
                  <p className='text-sm text-slate-500'>
                    {searchResult.symbol || 'TICKER'}
                  </p>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4 text-sm mb-4'>
                <div>
                  <p className='text-slate-500'>현재 가격</p>
                  <p className='font-semibold text-slate-700'>
                    {searchResult.currentPrice
                      ? `$${searchResult.currentPrice}`
                      : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className='text-slate-500'>변동률</p>
                  <p
                    className={`font-semibold ${
                      searchResult.changePercent &&
                      searchResult.changePercent > 0
                        ? 'text-[#1bc5bd]'
                        : 'text-red-500'
                    }`}
                  >
                    {searchResult.changePercent
                      ? `${searchResult.changePercent}%`
                      : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className='text-slate-500'>52주 최고가</p>
                  <p className='font-semibold text-slate-700'>
                    {searchResult.high52Week
                      ? `$${searchResult.high52Week}`
                      : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className='text-slate-500'>52주 최저가</p>
                  <p className='font-semibold text-slate-700'>
                    {searchResult.low52Week
                      ? `$${searchResult.low52Week}`
                      : 'N/A'}
                  </p>
                </div>
              </div>
              <div className='mb-4'>
                <label htmlFor='quantity' className='text-slate-600 block mb-1'>
                  수량
                </label>
                <input
                  id='quantity'
                  type='number'
                  min={1}
                  value={quantity || ''}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setQuantity(Number.isNaN(value) ? 1 : value);
                  }}
                  className='w-full border border-slate-200 p-2 rounded-lg focus:ring focus:ring-blue-200 outline-none transition-shadow'
                />
              </div>
              <button
                onClick={addStockToPortfolio}
                className='mt-4 w-full bg-[#1bc5bd] hover:bg-[#159b8c] text-white px-4 py-2 rounded-lg transition-colors shadow-md'
              >
                계좌에 추가
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
