import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className='p-4 bg-sky-800 text-white flex justify-between'>
      <h1 className='text-xl'>Bookstore</h1>
      <div>
        <Link to='/login' className='mr-4'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </div>
    </nav>
  );
};

export default Navigation;
