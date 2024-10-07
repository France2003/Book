import React from 'react';
import { Book } from '../types';
import { List, Button, Popconfirm, message } from 'antd';
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
  
  const handleRemoveFeatured = (bookId: number) => {
    const book = books.find((b) => b.id === bookId);
    if (book) {
      onRemoveFeatured(bookId);
      message.success(`Sách "${book.title}" đã được xóa khỏi danh sách nổi bật!`);
    } else {
      message.warning(`Không tìm thấy sách với ID ${bookId}`);
    }
  };

  const handleRemoveBestSeller = (bookId: number) => {
    const book = books.find((b) => b.id === bookId);
    if (book) {
      onRemoveBestSeller(bookId);
      message.success(`Sách "${book.title}" đã được xóa khỏi danh sách khuyến mãi!`);
    } else {
      message.warning(`Không tìm thấy sách với ID ${bookId}`);
    }
  };

  return (
    <div>
      {books.length === 0 ? (
        <p>Không có sách nào để hiển thị</p>
      ) : (
        <List
          dataSource={books}
          renderItem={(book) => (
            <List.Item
              actions={[
                <Button key="edit" type="link" icon={<EditOutlined />} onClick={() => onEdit(book)}>
                  Sửa
                </Button>,
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
                </Popconfirm>,
                book.isFeatured ? (
                  <Button
                    key="removeFeatured"
                    type="link"
                    icon={<StarFilled />}
                    onClick={() => handleRemoveFeatured(book.id)}
                  >
                    Xóa khỏi Nổi Bật
                  </Button>
                ) : (
                  <Button
                    key="addFeatured"
                    type="link"
                    icon={<StarOutlined />}
                    onClick={() => {
                      onAddFeatured(book);
                      message.success(`Sách "${book.title}" đã được thêm vào danh sách nổi bật!`);
                    }}
                  >
                    Thêm vào Nổi Bật
                  </Button>
                ),
                book.isBestSeller ? (
                  <Button
                    key="removeBestSeller"
                    type="link"
                    onClick={() => handleRemoveBestSeller(book.id)}
                  >
                    Đã hết khuyến mãi
                  </Button>
                ) : (
                  <Button
                    key="addBestSeller"
                    type="link"
                    onClick={() => {
                      onAddBestSeller(book);
                      message.success(`Sách "${book.title}" đã được thêm vào danh sách khuyến mãi!`);
                    }}
                  >
                    Thêm vào khuyến mãi
                  </Button>
                ),
              ]}
            >
              <List.Item.Meta
                title={book.title}
                description={`Giá: ${book.price} VND`}
              />
              <p>{book.category}</p>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default BookListAdmin;
