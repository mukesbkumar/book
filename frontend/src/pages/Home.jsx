import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksCard from '../components/home/BooksCard';
import BooksTable from '../components/home/BooksTable';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 text-center">
      <div className='flex justify-center items-center gap-x-4'>
        <button className='bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-700'
          onClick={() => setShowType('table')}>
          Table
        </button>
        <button className='bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-700'
          onClick={() => setShowType('card')}>
          Card
        </button>
      </div>
      <div className="flex justify-between items-center my-8">
        <h1 className="text-4xl font-bold">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-blue-800 text-4xl hover:text-blue-600" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        showType === 'table' ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )
      )}
    </div>
  );
};

export default Home;
