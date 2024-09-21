import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import BookList from '../components/BookList';
import { Helmet } from 'react-helmet';
import { BestSellers, FeaturedProducts } from './FeaturedProducts';
const Home: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books);

  return (
    <div className='mt-11'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <BookList books={books} />
      <FeaturedProducts/>
      <BestSellers/>
    </div>
  );
};

export default Home;
