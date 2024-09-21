import React from 'react';
import { Card, List } from 'antd';
import { Book } from '../types';

interface FeaturedProductsProps {
  products: Book[];
}


const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  return (
    <div>
      <h2>Sản phẩm nổi bật</h2>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={products}
        renderItem={book => (
          <List.Item>
            <Card
              hoverable
              cover={<img alt={book.title} src={book.image} className='w-[250px] h-[250px]' />}
            >
              <Card.Meta title={book.title} description={`Giá: ${book.price} VND`} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default FeaturedProducts;
