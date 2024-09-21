import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../types';
import { Card, List } from 'antd';

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div>
      <h1>Danh sách sách</h1>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={books}
        renderItem={book => (
          <List.Item>
            <Card 
            hoverable
            style={{width:250}}

            cover={
              <img alt={book.title} src={book.image}/>
            }
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
