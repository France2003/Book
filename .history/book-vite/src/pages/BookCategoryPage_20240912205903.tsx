import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Book } from '../types';
import { Card, List } from 'antd';
import { Helmet } from 'react-helmet';

const FilteredBooksPage: React.FC = () => {
  const { grade, subject } = useParams<{ grade?: string; subject?: string }>();
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);

  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

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

  return (
    <div className="p-6 m-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title className='uppercase'>Sách lớp {grade} - thể loại {subject}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <h1 className="text-2xl text-center font-bold uppercase mb-6">Sách lớp {grade} - thể loại {subject}</h1>
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

export default FilteredBooksPage;
