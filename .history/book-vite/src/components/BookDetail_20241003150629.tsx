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
import ReviewSection from './ReviewSection';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice'; // Import your favorite actions

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);
  const favoriteBooks = useSelector((state: RootState) => state.favorites.books);
  const dispatch = useDispatch();
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const allBooks = Object.values(booksByGrade).flat();
    const foundBook = allBooks.find(b => b.id.toString() === id);
    setBook(foundBook || null);

    if (foundBook) {
      const filteredBooks = allBooks.filter(b => b.category === foundBook.category && b.id !== foundBook.id);
      setRelatedBooks(filteredBooks);
    }
    window.scrollTo(0, 20);
  }, [id, booksByGrade]);

  useEffect(() => {
    if (book) {
      // Check if the book is already in favorites
      const existsInFavorites = favoriteBooks.some(favBook => favBook.id === book.id);
      setIsFavorite(existsInFavorites);
    }
  }, [book, favoriteBooks]);

  if (!book) return <p className="text-center text-lg font-medium">Không tìm thấy sách</p>;

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

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(book!.id)); // Remove from favorites
    } else {
      dispatch(addFavorite(book!)); // Add to favorites
    }
    setIsFavorite(!isFavorite); // Toggle the local state

    const message = !isFavorite
      ? `${book.title} đã được thêm vào danh sách yêu thích!`
      : `${book.title} đã bị xóa khỏi danh sách yêu thích!`;

    notification.success({
      message: 'Thông báo',
      description: message,
      placement: 'bottomRight',
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
            <Link to="/Book/" className="text-blue-600">Trang chủ</Link>
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

              {book?.isBestSeller && (
                <div className="text-red-600 font-semibold mb-4">
                  Đã giảm giá: 0.2%
                </div>
              )}
              <p className="text-xl font-semibold text-red-600 mb-4">{book?.price} VND</p>
              <div className="flex gap-4">
                <Button type="primary" icon={<ShoppingCartOutlined />} size="large" onClick={handleAddToCart}>
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  className={`${isFavorite ? 'bg-red-500 text-white hover:bg-red-500' : 'bg-gray-200 text-black'
                    } flex items-center px-4 py-2 rounded transition duration-200`}
                  icon={<HeartOutlined />}
                  size="large"
                  onClick={handleToggleFavorite}
                >
                  {isFavorite ? "Đã yêu thích" : "Yêu thích"}
                </Button>

                <Button type="default" icon={<ShareAltOutlined />} size="large">
                  Chia sẻ
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 p-6 ml-[50px] mr-[150px]">
            <ReviewSection bookId={id!} />
          </div>
        </div>
      </div>
      <div className="mt-8 p-6">
        <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
        <Carousel
          slidesToShow={5}
          slidesToScroll={1}
          arrows
          className="custom-carousel"
          dots={true}
        >
          {relatedBooks.slice(0, 8).map((relatedBook) => (
            <Card
              key={relatedBook.id}
              hoverable
              cover={
                <div className="relative">
                  <img
                    alt={relatedBook.title}
                    src={relatedBook.image}
                    className="object-cover custom-card-image"
                  />
                  {relatedBook.isBestSeller && (
                    <div className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1">Bán Chạy Nhất</div>
                  )}
                </div>
              }
            >
              <Card.Meta title={relatedBook.title} description={`${relatedBook.price} VND`} />
            </Card>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default BookDetail;
