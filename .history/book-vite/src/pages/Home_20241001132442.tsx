import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import BookList from '../components/BookList';
import { Helmet } from 'react-helmet';
import AdModal from '../components/AdModal';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import FeaturedBooks from './FeaturedAndPromotionalBooks';
import { Book } from '../types';
interface HomePageProps {
  isFeatured: Book[];
  isBestSeller: Book[];
  // other props as needed
}
const Home: React.FC<HomePageProps> = ({isFeatured, isBestSeller}) => {
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
      <Tabs defaultActiveKey="1">
        <TabPane tab="Nổi Bật" key="1">
          <BookList books={isFeatured} />
        </TabPane>
        <TabPane tab="Khuyến Mãi" key="2">
          <BookList books={isBestSeller} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Home;
