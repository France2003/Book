import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import BookList from '../components/BookList';
import { Helmet } from 'react-helmet';
import AdModal from '../components/AdModal';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import FeaturedBooks from './FeaturedAndPromotionalBooks';
const Home: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books);

  return (
    <div className='mt-11'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <AdModal />
      <BookList books={books} />
    </div>
  );
};

export default Home;
