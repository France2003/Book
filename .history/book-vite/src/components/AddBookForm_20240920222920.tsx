import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import { Book } from '../types';

const { Option } = Select;

interface AddBookFormProps {
  onAddBook: (grade: string, book: Book) => void;
  onUpdateBook?: (book: Book) => void;
  editingBook?: Book | null;
  setEditingBook?: (book: Book | null) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({
  onAddBook,
  onUpdateBook,
  editingBook,
  setEditingBook
}) => {
  const [form] = Form.useForm();
  const [grade, setGrade] = useState<string>(''); 
  const [category, setCategory] = useState<string>(''); 

  const categories = ['Bộ Cánh Diều', 'Bộ Chân Trời', 'Bộ Kết Nối', 'Bộ Bình Đẳng', 'Bộ Cùng Học'];

  useEffect(() => {
    if (editingBook) {
      form.setFieldsValue(editingBook);
      setGrade(editingBook.grade || ''); 
      setCategory(editingBook.category || ''); 
    }
  }, [editingBook, form]);

  const handleFinish = (values: any) => {
    const book: Book = {
      ...values,
      id: editingBook?.id || Date.now(),
      grade,
      category, 
    };

    if (editingBook) {
      onUpdateBook && onUpdateBook(book);
      notification.success({ message: 'Cập nhật sách thành công!' });
      setEditingBook && setEditingBook(null);
    } else {
      onAddBook(grade, book);
      notification.success({ message: 'Thêm sách thành công!' });
    }

    form.resetFields();
    setGrade('');
    setCategory('');
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        name="title"
        label="Tiêu đề"
        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề sách!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="author"
        label="Tác giả"
        rules={[{ required: true, message: 'Vui lòng nhập tác giả!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="productcode"
        label="Mã sản phẩm"
        rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="price"
        label="Giá"
        rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item name="description" label="Mô tả">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="image" label="Ảnh">
        <Input />
      </Form.Item>
      <Form.Item
        label="Lớp học"
        rules={[{ required: true, message: 'Vui lòng chọn lớp học!' }]}
        required
      >
        <Select
          value={grade}
          onChange={(value: string) => setGrade(value)}
          placeholder="Chọn lớp học"
          style={{ width: '100%' }}
        >
          {[...Array(12).keys()].map(num => (
            <Option key={num + 1} value={(num + 1).toString()}>
              Lớp {num + 1}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Thể loại"
        rules={[{ required: true, message: 'Vui lòng chọn thể loại!' }]}
        required
      >
        <Select
          value={category}
          onChange={(value: string) => setCategory(value)}
          placeholder="Chọn thể loại"
          style={{ width: '100%' }}
        >
          {categories.map((cat) => (
            <Option key={cat} value={cat}>
              {cat}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {editingBook ? 'Cập nhật sách' : 'Thêm sách'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddBookForm;
