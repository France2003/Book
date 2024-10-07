import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addBook, removeBook, updateBook, } from '../redux/bookSlice';
import AddBookForm from '../components/AddBookForm';
import EditBookModal from '../components/EditBookModal';
import { Book } from '../types';
import { Tabs, Select, message } from 'antd';
import BookListAdmin from '../components/BookListAdmin';
import AdminOrders from '../components/AdminOrders';
import { Helmet } from 'react-helmet';

const { TabPane } = Tabs;
const { Option } = Select;

const AdminPage: React.FC = () => {
  const dispatch = useDispatch();
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);

  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleAddBook = (grade: string, book: Book) => {
    dispatch(addBook({ grade, book }));
    // message.success('Sách đã được thêm thành công!');
  };

  const handleUpdateBook = (updatedBook: Book) => {
    if (editingBook) {
      dispatch(updateBook(updatedBook));
      setEditingBook(null);
      setIsModalVisible(false);
      message.success('Sách đã được cập nhật thành công!');
    }
  };

  const handleDeleteBook = (bookId: number) => {
    dispatch(removeBook(bookId));
    message.success('Sách đã được xóa thành công!');
  };

  const handleEditClick = (book: Book) => {
    setEditingBook(book);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingBook(null);
  };

  const filteredBooks: Book[] = selectedGrade
    ? booksByGrade[selectedGrade] || []
    : Object.values(booksByGrade).flat();

  const handleAddFeatured = (book: Book) => {
    dispatch(updateBook({ ...book, isFeatured: true })); // Cập nhật trạng thái nổi bật
    message.success(`Sách "${book.title}" đã được thêm vào danh sách nổi bật!`);
  };

  const handleRemoveFeatured = (bookId: number) => {
    const book = booksByGrade[selectedGrade].find((b: Book) => b.id === bookId);
    if (book) {
      dispatch(updateBook({ ...book, isFeatured: false })); // Cập nhật trạng thái nổi bật
      message.success(`Sách đã được xóa khỏi danh sách nổi bật!`);
    }
  };

  const handleAddBestSeller = (book: Book) => {
    dispatch(updateBook({ ...book, isBestSeller: true })); // Cập nhật trạng thái bán chạy
    message.success(`Sách "${book.title}" đã được thêm vào danh sách khuyến mãi!`);
  };

  const handleRemoveBestSeller = (bookId: number) => {
    const book = booksByGrade[selectedGrade].find((b: Book) => b.id === bookId);
    if (book) {
      dispatch(updateBook({ ...book, isBestSeller: false })); // Cập nhật trạng thái bán chạy
      message.success(`Sách đã được xóa khỏi danh sách khuyến mãi!`);
    }
  };


  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>AdminPage</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <link rel="icon" type="image/svg+xml" href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIX0nplAl_XoBPHwfRpkqJaoNmrDSUw0IAQ&s" />
      </Helmet>
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
          <div className="mb-6">
            <Select
              placeholder="Chọn lớp học để xem sách"
              onChange={(value: string) => setSelectedGrade(value)}
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

          <BookListAdmin
            books={filteredBooks}
            onEdit={handleEditClick}
            onDelete={handleDeleteBook}
            onAddFeatured={handleAddFeatured} // Thêm prop
            onRemoveFeatured={handleRemoveFeatured} // Thêm prop
            onAddBestSeller={handleAddBestSeller} // Thêm prop
            onRemoveBestSeller={handleRemoveBestSeller} // Thêm prop
          />
        </TabPane>
        <TabPane tab="Đơn Hàng" key="3">
          <AdminOrders />
        </TabPane>
      </Tabs>
      {/* Modal chỉnh sửa sách */}
      <EditBookModal
        visible={isModalVisible}
        book={editingBook}
        onSave={handleUpdateBook}
        onCancel={handleModalCancel}
      />
    </div>
  );
};

export default AdminPage;
