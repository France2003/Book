import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { textbookCategories } from '../data/categories';

const BookCategory: React.FC = () => {
  const menu = (
    <Menu>
      {textbookCategories.map((category) => (
        <Menu.SubMenu key={category.grade} title={`Lớp ${category.grade}`}>
          {category.subjects.map((subject) => (
            <Menu.Item key={subject}>
              <Link to={`/books/grade/${category.grade}/subject/${subject.toLowerCase()}`}>
                Sách {subject}
              </Link>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  );

  return (
    <div className="p-6">
      <Dropdown overlay={menu} trigger={['click']}>
        <Button className="w-full" icon={<DownOutlined />}>
          Danh mục sách
        </Button>
      </Dropdown>
    </div>
  );
};

export default BookCategory;
