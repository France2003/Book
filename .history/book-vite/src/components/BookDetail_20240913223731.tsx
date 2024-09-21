import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Book } from '../types';
import { Button, Rate, Modal, notification, Carousel, Card } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { addToCart } from '../redux/cartSlice';
import BookCategory from './BookCategory'; 
import { Helmet } from 'react-helmet';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);
  const dispatch = useDispatch();
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);

  useEffect(() => {
    const allBooks = Object.values(booksByGrade).flat();
    const foundBook = allBooks.find(b => b.id.toString() === id);
    setBook(foundBook || null);

    // Tìm các sản phẩm liên quan theo cùng loại sách (category)
    if (foundBook) {
      const filteredBooks = allBooks.filter(b => b.category === foundBook.category && b.id !== foundBook.id);
      setRelatedBooks(filteredBooks);
    }
  }, [id, booksByGrade]);

  if (!book) return <p className="text-center text-lg font-medium">Không tìm thấy sách</p>;

  // Hàm thêm sách hiện tại vào giỏ hàng
  const handleAddToCart = () => {
    Modal.confirm({
      title: 'Xác nhận',
      content: `Bạn có muốn thêm sản phẩm "${book.title}" vào giỏ hàng không?`,
      okText: 'Có',
      cancelText: 'Không',
      onOk() {
        dispatch(addToCart(book));
        notification.success({
          message: 'Thêm vào giỏ hàng',
          description: `${book.title} đã được thêm vào giỏ hàng thành công!`,
          placement: 'bottomRight',
        });
      }
    });
  };

  // Hàm thêm sách liên quan vào giỏ hàng
  const handleAddRelatedBookToCart = (relatedBook: Book) => {
    Modal.confirm({
      title: 'Xác nhận',
      content: `Bạn có muốn thêm sản phẩm "${relatedBook.title}" vào giỏ hàng không?`,
      okText: 'Có',
      cancelText: 'Không',
      onOk() {
        dispatch(addToCart(relatedBook));
        notification.success({
          message: 'Thêm vào giỏ hàng',
          description: `${relatedBook.title} đã được thêm vào giỏ hàng thành công!`,
          placement: 'bottomRight',
        });
      }
    });
  };

  return (
    <div className="flex flex-col">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{book?.title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="flex">
        <div className="w-1/4 p-6 border-r border-gray-200">
          <BookCategory />
        </div>
        <div className="flex-1 p-6">
          <div className="mb-4 text-base flex items-center">
            <Link to="/" className="text-blue-600">Trang chủ</Link>
            <IoHome className="mx-2" />
            <span className="text-gray-400 mx-2">|</span>
            <p>Sách Giáo Khoa</p>
            <span className="text-gray-400 mx-2">|</span>
            <p>{book?.category}</p>
            <span className="text-gray-400 mx-2">|</span>
            <p>{book?.title}</p>
          </div>
          <div className="flex flex-col mt-10 md:flex-row">
            <div className="flex-shrink-0 mb-6 md:mb-0 md:w-1/2">
              <img src={book?.image} alt={book?.title} className="w-full h-auto rounded-lg shadow-lg" />
            </div>
            <div className="md:ml-6 md:w-1/2">
              <h1 className="text-3xl font-bold mb-4">{book?.title}</h1>
              <p><strong>Mã sản phẩm:</strong> {book?.productcode}</p>
              <Rate disabled defaultValue={4} className="mb-4 mt-3" />
              <p className="text-base mb-4"><strong>Tác giả:</strong> {book?.author}</p>
              <p className="text-base mb-4">{book?.description}</p>
              <p className="text-xl font-semibold text-red-600 mb-4">{book?.price} VND</p>
              <div className="flex gap-4">
                <Button type="primary" icon={<ShoppingCartOutlined />} size="large" onClick={handleAddToCart}>
                  Thêm vào giỏ hàng
                </Button>
                <Button type="default" icon={<HeartOutlined />} size="large">
                  Yêu thích
                </Button>
                <Button type="default" icon={<ShareAltOutlined />} size="large">
                  Chia sẻ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      <div className="mt-8 p-6">
        <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
        <Carousel
          slidesToShow={4}
          slidesToScroll={1}
          // arrows
          className="custom-carousel"
          dots={true}
        >
          {relatedBooks.slice(0, 8).map((relatedBook) => (
            <Card
              key={relatedBook.id}
              hoverable
              cover={<img alt={relatedBook.title} src={relatedBook.image} className="object-cover custom-card-image" />}
              className="mx-2"
            >
              <Card.Meta title={relatedBook.title} description={`${relatedBook.price} VND`} />
              <Button type="primary" block className="mt-4" onClick={() => handleAddRelatedBookToCart(relatedBook)}>
                Thêm vào giỏ hàng
              </Button>
            </Card>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default BookDetail;
