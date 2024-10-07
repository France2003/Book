import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Book } from '../types';
import { Card, List, Select, Pagination } from 'antd';
import { Link, useParams } from 'react-router-dom';
import BookCategory from './BookCategory';
import SwiperGallery from './SwiperGallery';
import SmallAdModal from './SmallAdModal';
import Header from './Header'; // Import Header component

const { Option } = Select;

const BookList: React.FC = () => {
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);
  const { grade } = useParams<{ grade: string }>();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>(grade);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 12;

  useEffect(() => {
    if (grade) {
      const books = booksByGrade[grade] || [];
      setFilteredBooks(books);
    } else {
      const allBooks = Object.values(booksByGrade).flat();
      setFilteredBooks(allBooks);
    }
  }, [booksByGrade, grade]);

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

  const handleGradeChange = (value: string | null) => {
    setSelectedGrade(value || undefined);
    filterBooks(value || undefined, '');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (term: string) => {
    filterBooks(selectedGrade, term);
  };

  const currentBooks = filteredBooks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="flex flex-col md:flex-row">
      <Header onSearch={handleSearch} /> Pass the search function to Header
      <div className="md:w-1/4 p-4 md:p-6 border-r border-gray-300">
        <BookCategory />
      </div>
      <div className="md:w-3/4 p-4 md:p-6">
        <SwiperGallery />
        {/* Filter */}
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
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={currentBooks}
          renderItem={item => (
            <List.Item>
              <Card title={item.title}>
                <Link to={`/Book/detail/${item.id}`}>
                  <img src={item.image} alt={item.title} />
                </Link>
                <p>{item.description}</p>
              </Card>
            </List.Item>
          )}
        />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredBooks.length}
          onChange={handlePageChange}
        />
      </div>
      <SmallAdModal />
    </div>
  );
};

export default BookList;
