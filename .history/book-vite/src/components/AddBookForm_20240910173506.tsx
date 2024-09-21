// components/AddBookForm.tsx
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
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

  useEffect(() => {
    if (editingBook) {
      form.setFieldsValue(editingBook);
      setGrade(editingBook.grade);
    }
  }, [editingBook, form]);

  const handleFinish = (values: any) => {
    const book: Book = { ...values, id: editingBook?.id || Date.now(), grade };

    if (editingBook) {
      onUpdateBook && onUpdateBook(book);
      setEditingBook && setEditingBook(null);
    } else {
      onAddBook(grade, book);
    }

    form.resetFields();
    setGrade('');
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề sách!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="author" label="Tác giả" rules={[{ required: true, message: 'Vui lòng nhập tác giả!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="description" label="Mô tả">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="image" label="Ảnh">
        <Input />
      </Form.Item>
      <Form.Item label="Lớp học" required>
        <Select
          value={grade}
          onChange={setGrade}
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {editingBook ? 'Cập nhật sách' : 'Thêm sách'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddBookForm;
