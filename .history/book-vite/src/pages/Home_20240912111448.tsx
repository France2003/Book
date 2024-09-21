import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import BookList from '../components/BookList';
import HeaderCommitment from '../components/HeaderCommitment';

const Home: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books);

  return (
    <div className='mt-11'>
      <div className='mt-[-45px]'>
        <HeaderCommitment />
      </div>
      <BookList books={books} />
    </div>
  );
};

export default Home;
