// components/BookList.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Book } from '../types';
import { Card, List, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const BookList: React.FC = () => {
  const { grade, subject } = useParams<{ grade: string; subject: string }>();
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (grade && subject) {
      const books = booksByGrade[grade] || [];
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [booksByGrade, grade, subject, searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Danh sách sách</h1>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Tìm kiếm sách..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-1/4"
        />
      </div>

      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={filteredBooks}
        renderItem={book => (
          <List.Item>
            <Card
              hoverable
              style={{ width: 250 }}
              cover={
                <img
                  alt={book.title}
                  src={book.image}
                  style={{ height: '250px', objectFit: 'cover', paddingTop: 10 }}
                />
              }
              className="shadow-lg rounded-md"
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <p className="font-semibold truncate max-w-200">{book.title}</p>
                  <p className="text-base font-semibold text-red-600 mt-2">{book.price} VND</p>
                </div>
                <div className="mt-4">
                  <Link to={`/books/${book.id}`} className="text-blue-500 hover:underline">Xem chi tiết</Link>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default BookList;
