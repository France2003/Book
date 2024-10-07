import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import BookList from '../components/BookList';
import { Helmet } from 'react-helmet';
import AdModal from '../components/AdModal';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
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
      <Tabs defaultActiveKey='1'>
        <TabPane tab="Danh sách sách" key="1">
          <BookList books={books} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Home;
