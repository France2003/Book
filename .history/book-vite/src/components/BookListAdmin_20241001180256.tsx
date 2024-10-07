import React, { useState } from 'react';
import { Book } from '../types';
import { List, Button, Popconfirm, Pagination, message } from 'antd';
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
  const pageSize = 15;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Hàm tính giá sau giảm
  const calculateDiscountedPrice = (price: string | number, discountPercentage: string | number): number => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    const numericDiscount = typeof discountPercentage === 'string' ? parseFloat(discountPercentage) : discountPercentage;
  
    return numericPrice - (numericPrice * numericDiscount) / 100;
  };

  // Các sách hiển thị trên trang hiện tại
  const currentBooks = books.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      {books.length === 0 ? (
        <p>Không có sách nào để hiển thị</p>
      ) : (
        <>
          <List
            grid={{ gutter: 16, column: 4 }} // Thay đổi số cột tại đây
            dataSource={currentBooks}
            renderItem={(book, index) => (
              <List.Item>
                <div className="flex flex-col p-4 border rounded-md shadow-md">
                  <List.Item.Meta
                    title={`${(currentPage - 1) * pageSize + index + 1}. ${book.title}`}
                    description={
                      <>
                        <p>Giá: {book.price} VND</p>
                        {book.discountPercentage ? (
                          <p>
                            Giảm giá: {book.discountPercentage}% - Giá sau giảm: {calculateDiscountedPrice(book.price, book.discountPercentage)} VND
                          </p>
                        ) : (
                          <p>Không có khuyến mãi</p>
                        )}
                      </>
                    }
                  />
                  <p>{book.category}</p>
                  <div className="flex justify-between mt-auto">
                    <Button key="edit" type="link" icon={<EditOutlined />} onClick={() => onEdit(book)}>
                      Sửa
                    </Button>
                    <Popconfirm
                      title="Bạn có chắc chắn muốn xóa sách này?"
                      onConfirm={() => {
                        onDelete(book.id);
                        message.success('Sách đã được xóa thành công!');
                      }}
                      okText="Có"
                      cancelText="Không"
                    >
                      <Button key="delete" type="link" icon={<DeleteOutlined />} danger>
                        Xóa
                      </Button>
                    </Popconfirm>
                    {book.isFeatured ? (
                      <Button
                        key="removeFeatured"
                        type="link"
                        icon={<StarFilled />}
                        onClick={() => {
                          onRemoveFeatured(book.id);
                          // message.success(`Sách "${book.title}" đã được xóa khỏi danh sách nổi bật!`);
                        }}
                      >
                        Đã thêm vào nổi bật
                      </Button>
                    ) : (
                      <Button
                        key="addFeatured"
                        type="link"
                        icon={<StarOutlined />}
                        onClick={() => {
                          onAddFeatured(book);
                          // message.success(`Sách "${book.title}" đã được thêm vào danh sách nổi bật!`);
                        }}
                      >
                        Thêm vào Nổi Bật
                      </Button>
                    )}
                    {book.isBestSeller ? (
                      <Button
                        key="removeBestSeller"
                        type="link"
                        onClick={() => {
                          onRemoveBestSeller(book.id);
                          // message.success(`Sách "${book.title}" đã được xóa khỏi danh sách khuyến mãi!`);
                        }}
                      >
                        Đã thêm vào khuyến mãi
                      </Button>
                    ) : (
                      <Button
                        key="addBestSeller"
                        type="link"
                        onClick={() => {
                          onAddBestSeller(book);
                          // message.success(`Sách "${book.title}" đã được thêm vào danh sách khuyến mãi!`);
                        }}
                      >
                        Thêm vào khuyến mãi
                      </Button>
                    )}
                  </div>
                </div>
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
