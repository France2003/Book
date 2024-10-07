import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust this import based on your file structure

const SearchResults: React.FC = () => {
  const query = new URLSearchParams(useLocation().search).get('query');
  
  // Fetch the allBooks array from the Redux store
  const allBooks = useSelector((state: RootState) => state.books.allBooks);
  
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
