import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import BookList from '../components/BookList';
import { Helmet } from 'react-helmet';
import FeaturedProducts from './FeaturedProducts';
import { Book } from '../types';
const Home: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books);
  const featuredProducts: Book[] = [
    {
      id: 1,
      title: 'Bài học STEM - Lớp 1',
      author: 'Tưởng Duy Hải',
      price: '30.000',
      description: 'Sách giáo khoa lớp 1',
      image: 'https://ebdbook.vn/upload/untitled-2.jpg?v=1.0.1',
      category: 'Bộ Cánh Diều',
    },
    // Thêm các sản phẩm nổi bật khác
  ];
  return (
    <div className='mt-11'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <BookList books={books} />
      <FeaturedProducts products={featuredProducts} />
      {/* <BestSellers/> */}
    </div>
  );
};

export default Home;
