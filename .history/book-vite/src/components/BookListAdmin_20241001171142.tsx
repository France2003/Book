import React, { useState } from 'react';
import { Book } from '../types';
import { List, Button, Popconfirm, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined, StarOutlined, StarFilled } from '@ant-design/icons';

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void;
  onAddFeatured: (book: Book) => void;
  onRemoveFeatured: (bookId: number) => void;
  onAddBestSeller: (book: Book) => void;
  onRemoveBestSeller: (bookId: number) => void;
}

const BookListAdmin: React.FC<BookListProps> = ({
  books,
  onEdit,
  onDelete,
  onAddFeatured,
  onRemoveFeatured,
  onAddBestSeller,
  onRemoveBestSeller,
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
      {books.length === 0 ? (
        <p>Không có sách nào để hiển thị</p>
      ) : (
        <>
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
                  book.isFeatured ? (
                    <Button
                      key="removeFeatured"
                      type="link"
                      icon={<StarFilled />}
                      onClick={() => onRemoveFeatured(book.id)}
                    >
                      Xóa khỏi Nổi Bật
                    </Button>
                  ) : (
                    <Button
                      key="addFeatured"
                      type="link"
                      icon={<StarOutlined />}
                      onClick={() => onAddFeatured(book)}
                    >
                      Thêm vào Nổi Bật
                    </Button>
                  ),
                  book.isBestSeller ? (
                    <Button
                      key="removeBestSeller"
                      type="link"
                      onClick={() => onRemoveBestSeller(book.id)}
                    >
                      Đã hết khuyến mãi
                    </Button>
                  ) : (
                    <Button
                      key="addBestSeller"
                      type="link"
                      onClick={() => onAddBestSeller(book)}
                    >
                      Thêm vào khuyến mãi
                    </Button>
                  ),
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
        </>
      )}
    </div>
  );
};

export default BookListAdmin;
