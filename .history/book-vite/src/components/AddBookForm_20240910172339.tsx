// components/AddBookForm.tsx
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Book } from '../types';

const { Option } = Select;

interface AddBookFormProps {
  onAddBook: (grade: string, book: Book) => void;
  book?: Book; // Thêm prop book để hỗ trợ sửa
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onAddBook, book }) => {
  const [form] = Form.useForm();
  
  useEffect(() => {
    if (book) {
      form.setFieldsValue(book);
    }
  }, [book, form]);

  const handleFinish = (values: any) => {
    const book: Book = {
      ...values,
      id: book?.id || Date.now().toString(), // Nếu đang sửa, giữ id cũ
    };
    onAddBook(values.grade, book);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      initialValues={book || {}}
      layout="vertical"
    >
      <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="author" label="Tác giả" rules={[{ required: true, message: 'Vui lòng nhập tác giả!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="description" label="Mô tả">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item name="image" label="Hình ảnh">
        <Upload name="image" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Tải lên</Button>
        </Upload>
      </Form.Item>
      <Form.Item name="grade" label="Lớp học" rules={[{ required: true, message: 'Vui lòng chọn lớp học!' }]}>
        <Select>
          {[...Array(12).keys()].map(num => (
            <Option key={num + 1} value={(num + 1).toString()}>
              Lớp {num + 1}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {book ? 'Cập nhật sách' : 'Thêm sách'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddBookForm;
