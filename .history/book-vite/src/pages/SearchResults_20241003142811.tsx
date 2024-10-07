import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'; 
import { setBooks } from '../redux/bookSlice'; // Import action setBooks

const SearchResults: React.FC = () => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search).get('query') || '';
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);

  useEffect(() => {
    const allBooks = Object.values(booksByGrade).flat();
    dispatch(setBooks(allBooks));
  }, [booksByGrade, dispatch]);
  const allBooks = useSelector((state: RootState) => state.books.allBooks);
  const filteredBooks = allBooks?.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  if (!query.trim()) {
    return <p>Vui lòng nhập một truy vấn tìm kiếm.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kết quả tìm kiếm cho: "{query}"</h1>
      {filteredBooks.length > 0 ? (
        <ul className="list-disc list-inside">
          {filteredBooks.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      ) : (
        <p>Không có kết quả nào.</p>
      )}
    </div>
  );
};

export default SearchResults;
