import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import BookList from '../components/BookList';
import { Helmet } from 'react-helmet';
import AdModal from '../components/AdModal';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import FeaturedBooks from './FeaturedAndPromotionalBooks';

import BestSellersBooks from './BestSeller';
const Home: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books);
  const [activeTab, setActiveTab] = useState<string>('1');

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };
  return (
    <div className='mt-11'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <AdModal />
      <div className=''>
        <Tabs defaultActiveKey="1" onChange={handleTabChange}>
          <TabPane className='mt-[150px]' tab="Danh Sách" key="1">
            {activeTab === '1' && <BookList books={books} />}
          </TabPane>
          <TabPane tab="Nổi Bật" key="2">
            {activeTab === '2' && <FeaturedBooks />}
          </TabPane>
          <TabPane tab="Khuyến Mãi" key="3">
            {activeTab === '3' && <BestSellersBooks />}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
