import React, { useState } from 'react';
import { Book } from '../types';
import { List, Button, Popconfirm, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons';

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void;
  onAddFeatured: (book: Book) => void; // Thêm thuộc tính này
  onRemoveFeatured: (bookId: number) => void; // Thêm thuộc tính này
  onAddBestSeller: (book: Book) => void; // Thêm thuộc tính này
  onRemoveBestSeller: (bookId: number) => void; // Thêm thuộc tính này
}

const BookListAdmin: React.FC<BookListProps> = ({
  books,
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 15; // Số sản phẩm mỗi trang

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Tính toán các sản phẩm hiển thị trên trang hiện tại
  const currentBooks = books.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <List
        dataSource={currentBooks}
        renderItem={(book, index) => (
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
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              title={`${(currentPage - 1) * pageSize + index + 1}. ${book.title}`}
              description={`Giá: ${book.price} VND`}
            />
            <p>{book.category}</p>
          </List.Item>
        )}
      />
      <div className="mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={books.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default BookListAdmin;
