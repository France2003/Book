import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Book } from '../types';
import { Card, Input, List, Select } from 'antd';
import { Helmet } from 'react-helmet';
import BookCategory from '../components/BookCategory';
import { Option } from 'antd/es/mentions';
import { SearchOutlined } from '@ant-design/icons';

const FilteredBooksPage: React.FC = () => {
  const { grade, subject } = useParams<{ grade?: string; subject?: string }>();
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>(grade);

  useEffect(() => {
    filterBooksByCategory(grade, subject);
  }, [grade, subject, booksByGrade]);

  const filterBooksByCategory = (grade?: string, category?: string) => {
    let updatedBooks: Book[] = [];

    if (grade) {
      updatedBooks = booksByGrade[grade] || [];
    } else {
      updatedBooks = Object.values(booksByGrade).flat();
    }

    if (category) {
      updatedBooks = updatedBooks.filter(book =>
        (book.category ?? '').toLowerCase() === category.toLowerCase()
      );
    }

    setFilteredBooks(updatedBooks);
  };
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
    <div className="flex p-6 m-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title className='uppercase'>Sách Lớp {grade} - Thể Loại {subject}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="w-1/4 pr-6 border-gray-200">
        <BookCategory />
      </div>
      <div className="w-3/4 pl-6">
        <h1 className="text-2xl text-center font-bold uppercase mb-6">
          Sách lớp {grade} - thể loại {subject}
        </h1>
        <div className="mb-6">
          <Select
            placeholder="Chọn thể loại sách"
            onChange={handleGradeChange}
            className="w-full"
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
        <div className="mb-6">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm sách..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full"
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
    </div>
  );
};

export default FilteredBooksPage;
