import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Cập nhật đường dẫn tới RootState

const SearchResults: React.FC = () => {
  const query = new URLSearchParams(useLocation().search).get('query') || '';

  const books = useSelector((state: RootState) => state.books.allBooks) || [];
  if (!query.trim()) {
    return <p>Vui lòng nhập một truy vấn tìm kiếm.</p>;
  }

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

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
