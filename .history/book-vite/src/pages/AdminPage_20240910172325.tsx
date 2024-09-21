// pages/AdminPage.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addBook, deleteBook, updateBook } from '../redux/bookSlice';
import AddBookForm from '../components/AddBookForm';
import BookList from '../components/BookList';
import BookTable from '../components/BookTable';
import { Book } from '../types';
import { Tabs, Select, message, Modal } from 'antd';

const { TabPane } = Tabs;
const { Option } = Select;

const AdminPage: React.FC = () => {
  const dispatch = useDispatch();
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);
  
  // State để lưu lớp học được chọn
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>(undefined);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const handleAddBook = (grade: string, book: Book) => {
    dispatch(addBook({ grade, book }));
    message.success('Sách đã được thêm thành công!');
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
  };

  const handleDeleteBook = (id: string) => {
    dispatch(deleteBook(id));
    message.success('Sách đã được xóa thành công!');
  };

  const handleUpdateBook = (updatedBook: Book) => {
    dispatch(updateBook(updatedBook));
    message.success('Sách đã được cập nhật thành công!');
    setEditingBook(null);
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
          <div className="mb-6">
            <Select
              placeholder="Chọn lớp học để xem sách"
              onChange={value => setSelectedGrade(value)} // Cập nhật lớp học được chọn
              className="w-full max-w-xs"
              allowClear
            >
              <Option value="">Tất cả lớp</Option>
              {[...Array(12).keys()].map(num => (
                <Option key={num + 1} value={(num + 1).toString()}>
                  Lớp {num + 1}
                </Option>
              ))}
            </Select>
          </div>
          
          {/* Truyền danh sách sách đã lọc vào BookTable */}
          <BookTable 
            books={filteredBooks} 
            onEdit={handleEditBook} 
            onDelete={handleDeleteBook} 
          />
        </TabPane>
      </Tabs>

      {/* Modal để sửa sách */}
      <Modal
        title="Sửa sách"
        visible={!!editingBook}
        onCancel={() => setEditingBook(null)}
        footer={null}
      >
        {editingBook && (
          <AddBookForm 
            book={editingBook} 
            onAddBook={(grade, book) => handleUpdateBook(book)} 
          />
        )}
      </Modal>
    </div>
  );
};

export default AdminPage;
