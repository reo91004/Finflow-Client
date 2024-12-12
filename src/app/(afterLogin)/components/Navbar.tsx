'use client';

import Image from 'next/image';
import Logo from '../../../../public/images/logo.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('🇺🇸 USD');

  const getLinkClassName = (path: string) => {
    return pathname === path
      ? 'px-3 py-[0.4rem] rounded-[0.4rem] bg-slate-100 text-[#3699ff]'
      : 'px-3 py-[0.4rem] rounded-[0.4rem] text-slate-400 hover:bg-slate-100 hover:text-[#3699ff] transition-all';
  };

  const toggleCurrencyDropdown = () => {
    setCurrencyOpen(!currencyOpen);
    setProfileOpen(false); // Profile 드롭다운을 닫음
  };

  const toggleProfileDropdown = () => {
    setProfileOpen(!profileOpen);
    setCurrencyOpen(false); // Currency 드롭다운을 닫음
  };

  return (
    <nav className='w-full h-[4.25rem] fixed bg-white flex justify-between items-center drop-shadow-xl z-50'>
      <div className='mx-5 flex gap-[2rem] items-center'>
        <Link href='/'>
          <Image src={Logo} alt='logo' width={180} />
        </Link>
        <Link href='/' className={getLinkClassName('/')}>
          홈
        </Link>
        <Link href='/news' className={getLinkClassName('/news')}>
          뉴스
        </Link>
        <Link href='/stats' className={getLinkClassName('/stats')}>
          분석
        </Link>
        <Link href='/portfolio' className={getLinkClassName('/portfolio')}>
          포트폴리오
        </Link>
        <Link href='/community' className={getLinkClassName('/community')}>
          커뮤니티
        </Link>
      </div>
      <div className='mx-7 flex gap-[1.5rem] items-center'>
        {/* Currency Dropdown */}
        <div className='relative'>
          <button
            onClick={toggleCurrencyDropdown}
            className='flex items-center px-3 py-[0.4rem] rounded-[0.4rem] text-slate-400 hover:bg-slate-100 hover:text-[#3699ff] transition-all'
          >
            {selectedCurrency}
            <svg
              className={`-mr-1 size-5 text-gray-400 transition-transform ${
                currencyOpen ? 'rotate-180' : ''
              }`}
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
                clipRule='evenodd'
              />
            </svg>
          </button>
          {currencyOpen && (
            <div className='absolute right-0 mt-1 w-24 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
              <div className='py-1' role='menu'>
                {['🇺🇸 USD', '🇰🇷 KRW', '🇪🇺 EUR', '🇬🇧 GBP', '🇯🇵 JPY'].map(
                  (currency) => (
                    <button
                      key={currency}
                      onClick={() => {
                        setSelectedCurrency(currency);
                        setCurrencyOpen(false);
                      }}
                      className='block w-full px-4 py-2 text-sm text-slate-400 hover:bg-slate-100 hover:text-[#3699ff] text-left'
                      role='menuitem'
                    >
                      {currency}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className='relative'>
          <button
            onClick={toggleProfileDropdown}
            className='p-1 rounded-[0.4rem] text-slate-400 hover:bg-slate-100 hover:text-[#3699ff] transition-all'
          >
            <svg
              width='24px'
              height='24px'
              viewBox='0 0 24 24'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id='Stockholm-icons-/-General-/-User'
                stroke='none'
                strokeWidth='1'
                fill='none'
                fillRule='evenodd'
              >
                <polygon id='Shape' points='0 0 24 0 24 24 0 24'></polygon>
                <path
                  d='M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z'
                  id='Mask'
                  fill='currentColor'
                  fillRule='nonzero'
                  opacity='0.3'
                ></path>
                <path
                  d='M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z'
                  id='Mask-Copy'
                  fill='currentColor'
                  fillRule='nonzero'
                ></path>
              </g>
            </svg>
          </button>
          {profileOpen && (
            <div className='absolute right-0 mt-1 w-52 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
              <div className='py-1' role='menu'>
                {['프로필 정보', '내 계정', '알림', 'FAQ', '로그아웃'].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => {
                        if (item === '로그아웃') {
                          localStorage.clear(); // localStorage를 모두 삭제
                          alert('로그아웃되었습니다.'); // 사용자 알림 (선택 사항)
                          window.location.href = '/'; // 홈으로 리다이렉트 (선택 사항)
                        }
                      }}
                      className='block w-full px-4 py-2 text-sm text-slate-400 hover:bg-slate-100 hover:text-[#3699ff] text-left'
                      role='menuitem'
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
