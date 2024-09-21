
// components/BookCategory.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { textbookCategories } from '../data/categories';

const BookCategory: React.FC = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Danh mục sách giáo khoa từ lớp 1 đến lớp 12</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {textbookCategories.map((category) => (
          <div key={category.grade} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Lớp {category.grade}</h2>
            <ul className="list-disc pl-6">
              {category.subjects.map((subject) => (
                <li key={subject} className="mb-2">
                  <Link to={`/books/grade/${category.grade}/subject/${subject.toLowerCase()}`} className="text-blue-600 hover:underline">
                    Sách {subject}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCategory;
