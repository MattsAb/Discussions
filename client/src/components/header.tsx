import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Bars3Icon } from '@heroicons/react/16/solid';
import { useAuth } from '../hooks/authHook'

type HeaderProps = {
  toggleSidebar: () => void;
};

export default function Header({ toggleSidebar }: HeaderProps) {

    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState('');

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const menuRef = useRef<HTMLDivElement>(null);

    const handleGoBack = () => navigate('/');
    const handleGoToAuth = () => navigate('/auth')

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function showSearch () {
    if (search !== '')
    {
        navigate(`/search?q=${search}`);
    }
  }

  return (
    <header className="h-16 bg-slate-200 text-black dark:bg-slate-900 dark:text-white flex items-center justify-between px-6 border-b border-black dark:border-slate-500 fixed right-0 left-0 top-0">
      <div className="flex items-center">

        <button
          className="p-3 cursor-pointer mr-4 rounded-full active:bg-slate-50 hover:bg-slate-100 dark:active:bg-blue-900 dark:hover:bg-slate-800"
          onClick={toggleSidebar}
        >
          <Bars3Icon className="h-6 w-6 text-black dark:text-white" />
        </button>

        <button className="cursor-pointer font-bold text-2xl" onClick={handleGoBack}>
          Disussions
        </button>

      </div>

      <div className="flex items-center">

        <input
          className="h-10 w-72 rounded-2xl border  border-black dark:border-slate-400 px-3 bg-white dark:bg-gray-950"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          placeholder="Search..."
        />

        <button className="h-10 p-2 ml-2 bg-white dark:bg-slate-800 rounded-full cursor-pointer dark:active:bg-blue-900"
        onClick={showSearch}
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-black dark:text-white" />
        </button>

      </div>

      {user ? (
      <div className="relative" ref={menuRef}>

        <button
          className="cursor-pointer px-3 py-2 rounded hover:bg-white dark:hover:bg-slate-800 font-bold"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {user!.username}
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-slate-300 dark:bg-slate-800 border border-black dark:border-slate-600 rounded shadow-lg z-50">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-slate-200 dark:hover:bg-slate-700"
              onClick={() => {
                logout();
                handleGoToAuth();
                setMenuOpen(false);
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>) : (
      <button className='cursor-pointer'
      onClick={handleGoToAuth}
      > Sign In </button>)}
    </header>
  );
}
