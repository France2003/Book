import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addBook } from '../redux/bookSlice';
import AddBookForm from '../components/AddBookForm';
import BookList from '../components/BookList'; // Giả sử bạn đã có component BookList
import { Book } from '../types';
import { Tabs, message } from 'antd';

const { TabPane } = Tabs;

const AdminPage: React.FC = () => {
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.booksByGrade);

  const handleAddBook = (book: Book) => {
    dispatch(addBook(book));
    message.success('Sách đã được thêm thành công!');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Trang Quản Trị</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Thêm Sách" key="1">
          <AddBookForm onAddBook={handleAddBook} />
        </TabPane>
        <TabPane tab="Danh Sách Sách" key="2">
          <BookList books={books} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminPage;
