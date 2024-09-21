// // components/FilteredBooksPage.tsx
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { Book } from '../types'; // Đảm bảo bạn đã tạo file này

// const FilteredBooksPage: React.FC = () => {
//   const { grade, subject } = useParams<{ grade: string; subject: string }>();

//   // Lọc sách dựa trên grade và subject
//   const filteredBooks = getBooksByGradeAndSubject(parseInt(grade, 10), subject);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Sách cho {subject} lớp {grade}</h1>
//       <div>
//         {filteredBooks.length > 0 ? (
//           filteredBooks.map((book:any) => (
//             <div key={book.id} className="mb-4">
//               <h2 className="text-lg font-semibold">{book.title}</h2>
//               {/* Thêm thông tin sách ở đây */}
//             </div>
//           ))
//         ) : (
//           <p>Không có sách nào cho môn học và lớp này.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// // Hàm lọc sách dựa trên lớp và môn học
// const getBooksByGradeAndSubject = (grade: number, subject: string) => {
//   return book.filter(
//     (book:any) => book.grade === grade && book.subject.toLowerCase() === subject.toLowerCase()
//   );
// };

// export default FilteredBooksPage;
