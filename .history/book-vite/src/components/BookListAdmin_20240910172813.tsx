// components/BookTable.tsx
import React from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { Book } from '../types';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface BookTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const BookTable: React.FC<BookTableProps> = ({ books, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => <img src={text} alt="Book" style={{ width: 50, height: 75 }} />,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Book) => (
        <div className="flex gap-2">
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => onEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sách này không?"
            onConfirm={() => onDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button 
              type="link" 
              icon={<DeleteOutlined />} 
              danger
            >
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table 
      dataSource={books} 
      columns={columns} 
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  );
};

export default BookTable;
