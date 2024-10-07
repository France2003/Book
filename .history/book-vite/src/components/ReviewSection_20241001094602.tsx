import React, { useEffect, useState } from 'react';
import { Rate, Button, Input, Form } from 'antd';
import { useNavigate } from 'react-router-dom';

interface Review {
    id: number;
    bookId: string;
    content: string;
    rating: number;
    author: string;
    date: string;
    title:string;
}

interface ReviewSectionProps {
    bookId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ bookId }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    
    useEffect(() => {
        const savedReviews = localStorage.getItem(`reviews_${bookId}`);
        if (savedReviews) {
            setReviews(JSON.parse(savedReviews));
        }
    }, [bookId]);
    
    useEffect(() => {
        const storedUser = localStorage.getItem("userProfile");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        } else {
            navigate("/Book/profile");
        }
    }, [navigate]);

    if (!user) {
        return null;
    }
    
    const handleSubmit = () => {
        const newReviewObj: Review = {
            id: Date.now(),
            bookId,
            content: newReview,
            rating,
            author: user.name,
            title:'',
            date: new Date().toISOString(),
        };

        const updatedReviews = [...reviews, newReviewObj];
        setReviews(updatedReviews);
        localStorage.setItem(`reviews_${bookId}`, JSON.stringify(updatedReviews));
        form.resetFields();
        setRating(0);
    };

    return (
        <div>
            <h3 className="text-2xl font-semibold mb-4">Bình luận</h3>
            <Form form={form} onFinish={handleSubmit}>
                <Form.Item name="rating">
                    <Rate onChange={setRating} value={rating} />
                </Form.Item>
                <Form.Item name="content" rules={[{ required: true, message: 'Vui lòng nhập bình luận' }]}>
                    <Input.TextArea rows={4} onChange={(e) => setNewReview(e.target.value)} value={newReview} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Gửi bình luận
                    </Button>
                </Form.Item>
            </Form>

            <div className="mt-8">
                {reviews.map((review, index) => (
                    <div key={review.id} className="mb-6 leading-9">
                        <p className=" text-gray-600">Tên người dùng: <b className="pl-2">{user.name}</b></p>
                        <div className="flex items-center">
                            <Rate disabled defaultValue={review.rating} />
                        </div>
                        <p className="text-gray-800">Chất lượng sản phẩm: <b className="pl-2">{review.content}</b></p>
                        <p className="text-sm text-gray-500">Thời điểm đánh giá: <b className="pl-2">{new Date(review.date).toLocaleString()}</b></p>
                        {index < reviews.length - 1 && <hr className="my-6 border-t border-gray-300" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSection;
