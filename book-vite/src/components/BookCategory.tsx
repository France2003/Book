// components/BookCategory.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Collapse } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { textbookCategories } from '../data/categories';

const { Panel } = Collapse;

const BookCategory: React.FC = () => {
  return (
    <div className="p-6 max-w-xs border-r border-gray-200">
      <h1 className="text-2xl font-bold mb-6">Danh mục sách giáo khoa</h1>
      <Collapse accordion>
        {textbookCategories.map((category) => (
          <Panel
            header={`Lớp ${category.id}`}
            key={category.id}
            extra={<BookOutlined />}
          >
            <Menu
              mode="inline"
              className="space-y-2"
            >
              {category.name.map((subject) => (
                <Menu.Item
                  key={subject}
                  className="hover:bg-gray-100"
                >
                  <Link
                    to={`/books/grade/${category.id}/subject/${encodeURIComponent(subject.toLowerCase())}`}
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
