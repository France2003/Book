import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useParams } from 'react-router-dom';

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
            <div>
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <div key={book.id} className="mb-4">
                            <h2 className="text-lg font-semibold">{book.title}</h2>
                            <p>{book.author}</p>
                            <p>Giá: {book.price}</p>
                            <img src={book.image} alt={book.title} className="w-32 h-40 object-cover" />
                        </div>
                    ))
                ) : (
                    <p>Không có sách nào cho thể loại và lớp học này.</p>
                )}
            </div>
        </div>
    );
};

export default FilteredBooksPage;
