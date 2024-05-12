import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <>
    <header className='shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='text-sm sm:text-xl flex flex-wrap'>
            <span className='text-black font-bold'>Real</span>
            <span className='text-black'>Estate</span> 
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='border-[1px] border-black p-1 sm:p-2 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent placeholder:text-black focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-black' />
          </button>
        </form>
        <ul className='flex gap-4 items-center'>
          <Link to='/'>
            <li className='hidden sm:inline text-black hover:animate-pulse'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-black hover:animate-pulse'>
              About
            </li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-100 hover:underline'> 
              <button type="button" class="text-white bg-black font-medium rounded-lg text-sm px-5 py-2 text-center me-2">Sign in</button>
              </li>
            )}
          </Link>
        </ul>
      </div> 
    </header>
   
  </>
    
  );
}
