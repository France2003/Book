// SearchResults.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults: React.FC = () => {
  const query = new URLSearchParams(useLocation().search).get('query');

  // Simulated book data (replace this with your actual data source)
  const books = [
    { id: 1, title: 'Lịch sử Việt Nam' },
    { id: 2, title: 'Học lập trình React' },
    { id: 3, title: 'Lịch sử thế giới' },
    { id: 4, title: 'Mastering TypeScript' },
    { id: 5, title: 'Học JavaScript cơ bản' },
  ];

  // Filter books based on the query
  const filteredBooks = query
    ? books.filter((book) => book.title.toLowerCase().includes(query.toLowerCase()))
    : [];

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
