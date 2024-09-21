// components/BookList.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Book } from '../types';
import { Card, List, Select, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Option } = Select;

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>(undefined);

  useEffect(() => {
    const allBooks = Object.values(booksByGrade).flat();
    setFilteredBooks(allBooks);
  }, [booksByGrade]);

  const filterBooks = (grade?: string, term: string = '') => {
    let updatedBooks: Book[] = [];

    if (grade) {
      updatedBooks = booksByGrade[grade] || [];
    } else {
      updatedBooks = Object.values(booksByGrade).flat();
    }

    if (term) {
      updatedBooks = updatedBooks.filter(book =>
        book.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredBooks(updatedBooks);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterBooks(selectedGrade, term);
  };

  const handleGradeChange = (value: string | null) => {
    setSelectedGrade(value || undefined);
    filterBooks(value || undefined, searchTerm);
  };

  return (
    <div className="p-6 flex-1">
      <div className="flex flex-col mb-6">
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

        <Select
          placeholder="Chọn lớp"
          onChange={handleGradeChange}
          className="w-full max-w-xs mb-6"
          allowClear
        >
          <Option value="">Tất cả lớp</Option>
          {[...Array(12).keys()].map(num => (
            <Option key={num + 1} value={(num + 1).toString()}>
              Lớp {num + 1}
            </Option>
          ))}
        </Select>
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
