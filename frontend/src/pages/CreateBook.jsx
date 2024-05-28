import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  
import { useSnackbar } from 'notistack';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const saveBook = () => {
    if (!title || !author || !publishYear) {
      enqueueSnackbar('Please fill in all fields', { variant: 'error' });
      return;
    }

    const data = {
      title,
      author,
      publishYear,
    };

    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created Successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please try again later.', { variant: 'error' });
        console.error('Error creating book:', error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto bg-white shadow-lg'>
        <input type='text' placeholder='Title' className='mb-4 p-2 rounded-lg border border-gray-300'
          value={title} onChange={(event) => setTitle(event.target.value)} />
        <input type='text' placeholder='Author' className='mb-4 p-2 rounded-lg border border-gray-300'
          value={author} onChange={(event) => setAuthor(event.target.value)} />
        <input type='text' placeholder='Publish Year' className='mb-4 p-2 rounded-lg border border-gray-300'
          value={publishYear} onChange={(event) => setPublishYear(event.target.value)} />
        <button className='bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700'
          onClick={saveBook}>Save</button>
      </div>
    </div>
  );
};

export default CreateBook;
