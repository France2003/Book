// // pages/AdminPage.tsx
// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../redux/store';
// import { addBook } from '../redux/bookSlice';
// import AddBookForm from '../components/AddBookForm';
// import BookList from '../components/BookList';
// import { Book } from '../types';
// import { Tabs, message } from 'antd';

// const { TabPane } = Tabs;

// const AdminPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);
//   const handleAddBook = (grade: string, book: Book) => {
//     dispatch(addBook({ grade, book }));
//     message.success('Sách đã được thêm thành công!');
//   };

//   // Chuyển đổi thành mảng sách để truyền vào BookList
//   const allBooks = Object.values(booksByGrade).flat();

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Trang Quản Trị</h1>
//       <Tabs defaultActiveKey="1">
//         <TabPane tab="Thêm Sách" key="1">
//           <AddBookForm onAddBook={handleAddBook} />
//         </TabPane>
//         <TabPane tab="Danh Sách Sách" key="2">
//           <BookList books={allBooks} /> {/* Truyền đúng props books */}
//         </TabPane>
//       </Tabs>
//     </div>
//   );
// };

// export default AdminPage;
