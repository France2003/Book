import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Book } from '../types';

interface AddBookFormProps {
  onAddBook: (grade: string, book: Book) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onAddBook }) => {
  const [form] = Form.useForm();
  const [grade, setGrade] = useState<string>('1'); // Mặc định là lớp 1

  const handleFinish = (values: any) => {
    const newBook: Book = {
      id: Date.now(), // Tạo ID tạm thời hoặc sinh ID tự động từ backend
      image: values.image[0]?.response || '', // Xử lý upload hình ảnh
      title: values.title,
      author: values.author,
      price: values.price,
      description: values.description
    };

    onAddBook(grade, newBook);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item name="grade" label="Lớp" initialValue={grade}>
        <Input placeholder="Nhập lớp" onChange={(e) => setGrade(e.target.value)} />
      </Form.Item>

      <Form.Item name="title" label="Tiêu đề sách" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề sách!' }]}>
        <Input placeholder="Nhập tiêu đề sách" />
      </Form.Item>

      <Form.Item name="author" label="Tác giả" rules={[{ required: true, message: 'Vui lòng nhập tác giả!' }]}>
        <Input placeholder="Nhập tác giả" />
      </Form.Item>

      <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
        <Input placeholder="Nhập giá" />
      </Form.Item>

      <Form.Item name="description" label="Mô tả">
        <Input.TextArea placeholder="Nhập mô tả" />
      </Form.Item>

      <Form.Item name="image" label="Hình ảnh" valuePropName="fileList" getValueFromEvent={(e) => e.fileList}>
        <Upload name="image" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Thêm Sách
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddBookForm;
