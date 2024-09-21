import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addBook, updateBook, removeBook } from '../redux/bookSlice';
import AddBookForm from '../components/AddBookForm';
import AdminOrders from '../components/AdminOrders';
import { Book } from '../types';
import { Tabs, Select, message } from 'antd';
import BookListAdmin from '../components/BookListAdmin';

const { TabPane } = Tabs;
const { Option } = Select;

const AdminPage: React.FC = () => {
  const dispatch = useDispatch();
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);
  
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const handleAddBook = (grade: string, book: Book) => {
    dispatch(addBook({ grade, book }));
    message.success('Sách đã được thêm thành công!');
  };

  const handleUpdateBook = (updatedBook: Book) => {
    if (editingBook) {
      dispatch(updateBook(updatedBook));
      setEditingBook(null);
      message.success('Sách đã được cập nhật thành công!');
    }
  };

  const handleDeleteBook = (bookId: number) => {
    dispatch(removeBook(bookId));
    message.success('Sách đã được xóa thành công!');
  };

  const filteredBooks: Book[] = selectedGrade
    ? booksByGrade[selectedGrade] || []
    : Object.values(booksByGrade).flat();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Trang Quản Trị</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Thêm Sách" key="1">
          <AddBookForm
            onAddBook={handleAddBook}
            onUpdateBook={handleUpdateBook}
            editingBook={editingBook}
            setEditingBook={setEditingBook}
          />
        </TabPane>
        <TabPane tab="Danh Sách Sách" key="2">
          <Select
            placeholder="Chọn lớp học để xem sách"
            onChange={setSelectedGrade}
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
          <BookListAdmin
            books={filteredBooks}
            onEdit={setEditingBook}
            onDelete={handleDeleteBook}
          />
        </TabPane>
        <TabPane tab="Đơn Hàng" key="3">
          <AdminOrders />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminPage;
