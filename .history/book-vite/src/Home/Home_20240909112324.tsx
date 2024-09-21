import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';

const { Meta } = Card;

const Home: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books);

  return (
    <div className="home">
      <h1>Welcome to BookStore</h1>
      <Row gutter={16}>
        {books.map((book) => (
          <Col span={8} key={book.id}>
            <Card
              hoverable
              cover={<img alt={book.title} src={book.coverImage} />}
              actions={[
                <Link to={`/books/${book.id}`}>View Details</Link>
              ]}
            >
              <Meta title={book.title} description={`by ${book.author}`} />
              <p>Price: ${book.price}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
