import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../types';
import { Card, List, Select, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface BookListProps {
  books: Book[];
}

const { Option } = Select;

const BookList: React.FC<BookListProps> = ({ books }) => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>(undefined);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterBooks(selectedGrade, term);
  };

  const handleGradeChange = (value: string) => {
    setSelectedGrade(value);
    filterBooks(value, searchTerm);
  };

  const filterBooks = (grade?: string, term: string = '') => {
    let updatedBooks = books;

    if (grade) {
      updatedBooks = updatedBooks.filter(book => book.grade === grade);
    }

    if (term) {
      updatedBooks = updatedBooks.filter(book =>
        book.title.toLowerCase().includes(term)
      );
    }

    setFilteredBooks(updatedBooks);
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

      <div className="mb-6">
        <Select
          placeholder="Chọn thể loại sách"
          onChange={handleGradeChange}
          className="w-full max-w-xs"
          allowClear
        >
          <Option value="1">Lớp 1</Option>
          <Option value="2">Lớp 2</Option>
          <Option value="3">Lớp 3</Option>
          <Option value="4">Lớp 4</Option>
          <Option value="5">Lớp 5</Option>
          <Option value="6">Lớp 6</Option>
          <Option value="7">Lớp 7</Option>
          <Option value="8">Lớp 8</Option>
          <Option value="9">Lớp 9</Option>

          <Option value="10">Lớp 10</Option>
          <Option value="11">Lớp 11</Option>
          <Option value="12">Lớp 12</Option>
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
              cover={<img alt={book.title} src={book.image} />}
              // title={book.title}
              className="shadow-lg rounded-md"
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <p>{book.title}</p>
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
