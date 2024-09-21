// components/BookList.tsx
import React from 'react';
import { Book } from '../types';
import { List, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  return (
    <List
      dataSource={books}
      renderItem={book => (
        <List.Item
          actions={[
            <Button
              key="edit"
              type="link"
              icon={<EditOutlined />}
              onClick={() => onEdit(book)}
            >
              Sửa
            </Button>,
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa sách này?"
              onConfirm={() => onDelete(book.id)}
              okText="Có"
              cancelText="Không"
            >
              <Button
                key="delete"
                type="link"
                icon={<DeleteOutlined />}
                danger
              >
                Xóa
              </Button>
            </Popconfirm>
          ]}
        >
          <List.Item.Meta
            title={book.title}
            description={`Giá: ${book.price} VND`}
          />
        </List.Item>
      )}
    />
  );
};

export default BookList;
