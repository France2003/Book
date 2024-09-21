// components/FilteredBooksPage.tsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Book } from '../types';
import { Card, List } from 'antd';

const FilteredBooksPage: React.FC = () => {
  const { grade, subject } = useParams<{ grade: string; subject: string }>();

  // Lọc sách dựa trên grade và subject
  const filteredBooks = getBooksByGradeAndSubject(parseInt(grade, 10), subject);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Sách cho {subject} lớp {grade}</h1>
      <div>
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

// Hàm lọc sách dựa trên lớp và môn học
const getBooksByGradeAndSubject = (grade: number, subject: string) => {
  return books.filter(
    (book) => book.grade === grade && book.subject.toLowerCase() === subject.toLowerCase()
  );
};

export default FilteredBooksPage;
