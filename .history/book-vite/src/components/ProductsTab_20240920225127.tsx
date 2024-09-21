import React, { useState } from 'react';
import { Tabs, List } from 'antd';
import BookCard from '../components/BookCard'; 
import { Book } from '../types';

const { TabPane } = Tabs;

const ProductsTab: React.FC<{ bestSellers: Book[], featuredProducts: Book[] }> = ({ bestSellers, featuredProducts }) => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Sản phẩm bán chạy" key="1">
        <List dataSource={bestSellers} renderItem={book => <BookCard book={book} />} />
      </TabPane>
      <TabPane tab="Sản phẩm nổi bật" key="2">
        <List dataSource={featuredProducts} renderItem={book => <BookCard book={book} />} />
      </TabPane>
    </Tabs>
  );
};

export default ProductsTab;
