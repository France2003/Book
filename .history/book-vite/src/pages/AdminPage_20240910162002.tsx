// pages/AdminPage.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addBook } from '../redux/bookSlice';
import AddBookForm from '../components/AddBookForm';
import BookList from '../components/BookList';
import { Book } from '../types';
import { Tabs, Select, message } from 'antd';

const { TabPane } = Tabs;
const { Option } = Select;

const AdminPage: React.FC = () => {
  const dispatch = useDispatch();
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);
  
  // State để lưu lớp học được chọn
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>(undefined);

  const handleAddBook = (grade: string, book: Book) => {
    dispatch(addBook({ grade, book }));
    message.success('Sách đã được thêm thành công!');
  };

  // Lấy danh sách sách dựa trên lớp học được chọn
  const filteredBooks: Book[] = selectedGrade
    ? booksByGrade[selectedGrade] || [] // Nếu có lớp học được chọn, lấy sách của lớp đó
    : Object.values(booksByGrade).flat(); // Nếu không chọn lớp học, hiển thị tất cả sách

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Trang Quản Trị</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Thêm Sách" key="1">
          <AddBookForm onAddBook={handleAddBook} />
        </TabPane>
        <TabPane tab="Danh Sách Sách" key="2">
          {/* Dropdown để chọn lớp học */}
          <BookList books={filteredBooks} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminPage;
