import React, { useState, useEffect } from 'react';
import { Rate, Input, Button, List, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Book } from '../types';

const { TextArea } = Input;

const ReviewSection: React.FC<{ bookId: string }> = ({ bookId }) => {
  const books = useSelector((state: RootState) => state.books.booksByGrade);
  const allBooks = Object.values(books).flat();
  const book = allBooks.find(b => b.id.toString() === bookId);

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [reviews, setReviews] = useState<any[]>([]);

  // Load reviews from localStorage when the component mounts
  useEffect(() => {
    const savedReviews = localStorage.getItem(`reviews-${bookId}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [bookId]);

  // Save reviews to localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem(`reviews-${bookId}`, JSON.stringify(reviews));
  }, [reviews, bookId]);

  // Function to handle new review submission
  const handleReviewSubmit = () => {
    if (comment.trim() === '') {
      Modal.warning({
        title: 'Vui lòng nhập bình luận',
      });
      return;
    }

    const newReview = {
      rating,
      comment,
      date: new Date().toLocaleString(),
    };

    setReviews([newReview, ...reviews]);
    setComment('');
    setRating(5);
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Đánh giá sản phẩm</h3>
      <div className="mb-4">
        <Rate onChange={setRating} value={rating} />
      </div>
      <TextArea
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Nhập bình luận của bạn"
        className="mb-4"
      />
      <Button type="primary" onClick={handleReviewSubmit}>
        Gửi đánh giá
      </Button>

      <List
        className="mt-6"
        header={<div>{reviews.length} đánh giá</div>}
        itemLayout="horizontal"
        dataSource={reviews}
        renderItem={review => (
          <List.Item>
            <List.Item.Meta
              title={<Rate disabled defaultValue={review.rating} />}
              description={(
                <>
                  <p>{review.comment}</p>
                  <small>{review.date}</small>
                </>
              )}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ReviewSection;
