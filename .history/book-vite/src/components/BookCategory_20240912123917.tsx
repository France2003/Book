import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Collapse } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { textbookCategories } from '../data/categories';

const { Panel } = Collapse;

const BookCategory: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleSubjectClick = (grade: number, subject: string) => {
    setSelectedGrade(grade);
    setSelectedSubject(subject);
  };

  return (
    <div className="p-6 max-w-xs border-r">
      <h1 className="text-2xl font-bold mb-6">Danh mục sách giáo khoa</h1>
      <Collapse accordion>
        {textbookCategories.map((category) => (
          <Panel
            header={`Lớp ${category.grade}`}
            key={category.grade}
            extra={<BookOutlined />}
          >
            <Menu
              mode="inline"
              items={category.subjects.map((subject) => ({
                key: subject,
                label: (
                  <span
                    onClick={() => handleSubjectClick(category.grade, subject)}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Sách {subject}
                  </span>
                ),
              }))}
            />
          </Panel>
        ))}
      </Collapse>
      {selectedGrade && selectedSubject && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Sách cho {selectedSubject} lớp {selectedGrade}</h2>
          {/* Hiển thị sách đã lọc ở đây */}
          {/* Ví dụ: */}
          {/* {filteredBooks.map((book) => (
            <div key={book.id}>{book.title}</div>
          ))} */}
        </div>
      )}
    </div>
  );
};

export default BookCategory;
