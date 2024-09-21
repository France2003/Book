import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Book } from '../types';
import { Card, List, Select, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';

const { Option } = Select;

const BookList: React.FC = () => {
  // Lấy tham số grade từ URL
  const { grade } = useParams<{ grade: string }>();
  // Lấy dữ liệu sách từ Redux store
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);

  // Các state để lưu dữ liệu và trạng thái tìm kiếm
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>(grade);

  // Khi booksByGrade hoặc selectedGrade thay đổi
  useEffect(() => {
    if (selectedGrade) {
      // Lọc sách theo lớp học
      const books = booksByGrade[selectedGrade] || [];
      setFilteredBooks(books);
    } else {
      // Hiển thị tất cả sách nếu không có lớp học được chọn
      const allBooks = Object.values(booksByGrade).flat();
      setFilteredBooks(allBooks);
    }
  }, [booksByGrade, selectedGrade]);

  // Khi thay đổi tìm kiếm
  useEffect(() => {
    filterBooks(searchTerm);
  }, [searchTerm, filteredBooks]);

  // Hàm lọc sách dựa trên từ khóa tìm kiếm
  const filterBooks = (term: string = '') => {
    let updatedBooks = filteredBooks;

    if (term) {
      updatedBooks = updatedBooks.filter(book =>
        book.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredBooks(updatedBooks);
  };

  // Xử lý thay đổi từ ô tìm kiếm
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  // Xử lý thay đổi lớp học
  const handleGradeChange = (value: string | null) => {
    setSelectedGrade(value || undefined);
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
          placeholder="Chọn lớp"
          onChange={handleGradeChange}
          className="w-full max-w-xs"
          allowClear
          value={selectedGrade}
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
                  <Link to={`/books/${book.id}`} className="text-blue-500 hover:underline">
                    Xem chi tiết
                  </Link>
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
