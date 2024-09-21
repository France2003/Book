import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addBook, updateBook, removeBook } from '../redux/bookSlice';
import AddBookForm from '../components/AddBookForm';
import AdminOrders from '../components/AdminOrders';
import { Book } from '../types';
import { Tabs, Select, message, Table } from 'antd';
import BookListAdmin from '../components/BookListAdmin';

const { TabPane } = Tabs;
const { Option } = Select;

const AdminPage: React.FC = () => {
    const dispatch = useDispatch();
    const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);

    const [selectedGrade, setSelectedGrade] = useState<string>('');
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const orders = useSelector((state: RootState) => state.orders.orders);

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Ngày', dataIndex: 'date', key: 'date' },
        { title: 'Tổng tiền', dataIndex: 'totalPrice', key: 'totalPrice' },
        { title: 'Sản phẩm', dataIndex: 'items', key: 'items', render: (items: any[]) => items.map(item => `Book ID: ${item.bookId}, Quantity: ${item.quantity}`).join(', ') }
    ];
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
                <div className="p-6 max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Danh Sách Đơn Hàng</h1>
                    <Table dataSource={orders} columns={columns} rowKey="id" />
                </div>
            </Tabs>
        </div>
    );
};

export default AdminPage;
