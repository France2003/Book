import React from 'react';
import { Link } from 'react-router-dom';
import { textbookCategories } from '../data/categories';

const BookCategory: React.FC = () => {
  return (
    <div className="p-6 max-w-xs border-r">
      <h1 className="text-2xl font-bold mb-6">Danh mục sách giáo khoa</h1>
      {textbookCategories.map((category) => (
        <div key={category.grade} className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Lớp {category.grade}</h2>
          <ul className="list-disc pl-6">
            {category.subjects.map((subject) => (
              <li key={subject} className="mb-2">
                <Link 
                  to={`/books/grade/${category.grade}/subject/${subject.toLowerCase()}`}
                  className="text-blue-600 hover:underline"
                >
                  Sách {subject}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BookCategory;
