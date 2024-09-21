import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link, useParams } from 'react-router-dom';
import { Card, List } from 'antd';

const FilteredBooksPage: React.FC = () => {
    const { grade, category } = useParams<{ grade: string; category: string }>();
    const filteredBooks = useSelector((state: RootState) => {
        console.log("Filtered Books State:", state.books.filteredBooks);
        console.log("Books by Grade:", state.books.booksByGrade);
        return state.books.filteredBooks[`${grade}-${category}`] || [];
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Sách {category} lớp {grade}</h1>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={filteredBooks}
                renderItem={book => (
                    <List.Item>
                        <Card
                            hoverable
                            style={{ width: 250 }}
                            cover={
                                <img
                                    alt={book.title}
                                    src={book.image}
                                    style={{ height: '250px', objectFit: 'cover', paddingTop: 10 }}
                                />
                            }
                            className="shadow-lg rounded-md"
                        >
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <p className="font-semibold truncate max-w-200">{book.title}</p>
                                    <p className="text-base font-semibold text-red-600 mt-2">{book.price} VND</p>
                                </div>
                                <div className="mt-4">
                                    <Link to={`/books/${book.id}`} className="text-blue-500 hover:underline">
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default FilteredBooksPage;
