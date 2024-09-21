import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../types';
import { Card, List } from 'antd';

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className='mt-32'>
      <h1>Danh sách sách</h1>
      <List
        grid={{ gutter: 18, column: 3 }}
        dataSource={books}
        renderItem={book => (
          <List.Item>
            <Card 

            title={book.title}
            >
              <Link to={`/books/${book.id}`}>Xem chi tiết</Link>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default BookList;
