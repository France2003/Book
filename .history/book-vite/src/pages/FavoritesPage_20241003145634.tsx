import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Card, Button } from 'antd';

const FavoritesPage: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.books);

  if (favorites.length === 0) {
    return <p className="text-center text-lg font-medium">Chưa có sản phẩm nào trong danh sách yêu thích!</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {favorites.map(book => (
        <Card key={book.id} title={book.title}>
          <img src={book.image} alt={book.title} />
          <p>{book.price} VND</p>
          <Button type="primary">Xem chi tiết</Button>
        </Card>
      ))}
    </div>
  );
};

export default FavoritesPage;
