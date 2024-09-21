// components/BookCategory.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Menu } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { textbookCategories } from '../data/categories';

const { Panel } = Collapse;

const BookCategory: React.FC<{ onSubjectSelect: (grade: string, subject: string) => void }> = ({ onSubjectSelect }) => {
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
            >
              {category.subjects.map((subject) => (
                <Menu.Item
                  key={`${category.grade}-${subject}`}
                >
                  <Link
                    to="#"
                    onClick={() => onSubjectSelect(category.grade, subject.toLowerCase())}
                    className="text-blue-600 hover:underline"
                  >
                    Sách {subject}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default BookCategory;
