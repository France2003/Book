import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust the import as necessary

const SearchResults: React.FC = () => {
  const query = new URLSearchParams(useLocation().search).get('query');
  
  // Use your existing book data from Redux
  const books = useSelector((state: RootState) => state.books.allBooks); // Adjust this line as necessary
  
  // Flatten the book data if it's organized by grades or categories
  const allBooks = Object.values(books).flat();

  // Filter books based on the query
  const filteredBooks = query
    ? allBooks.filter((book) => book.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kết quả tìm kiếm cho: "{query}"</h1>
      {filteredBooks.length > 0 ? (
        <ul className="list-disc list-inside">
          {filteredBooks.map((book) => (
            <li key={book.id}>
              <Link to={`/Book/books/${book.id}`} className="text-blue-500 hover:underline">
                {book.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Không có kết quả nào.</p>
      )}
    </div>
  );
};

export default SearchResults;
