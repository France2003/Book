import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import BookList from '../components/BookList';
import { Helmet } from 'react-helmet';
import ProductsTab from '../components/ProductsTab';
const Home: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books);
  const bestSellers = books.filter(book => book.isBestSeller);
  const featuredProducts = books.filter(book => book.isFeatured);

  return (
    <div className='mt-11'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <BookList books={books}  />
      <ProductsTab bestSellers={bestSellers} featuredProducts={featuredProducts} />
    </div>
  );
};

export default Home;
