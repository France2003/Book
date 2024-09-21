// components/BookCategory.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Collapse } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { textbookCategories } from '../data/categories';

const { Panel } = Collapse;

const BookCategory: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>(undefined);
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(undefined);

  const handleSubjectClick = (grade: string, subject: string) => {
    setSelectedGrade(grade);
    setSelectedSubject(subject);
    const url = `/books/grade/${grade}/subject/${subject.toLowerCase()}`;
    console.log(`Navigating to: ${url}`); // Debug: Kiểm tra URL
    navigate(url);
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
                    onClick={() => handleSubjectClick(category.grade.toString(), subject)}
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
    </div>
  );
};

export default BookCategory;
