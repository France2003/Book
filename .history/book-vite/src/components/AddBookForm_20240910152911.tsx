import React from 'react';
import { Form, Input, Button, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { Book } from '../types';

const { Option } = Select;

interface AddBookFormProps {
  onAddBook: (book: Book) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onAddBook }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    const newBook: Book = {
      id: Date.now(), // Tạo ID duy nhất, cần thay đổi khi tích hợp backend
      image: values.image.file?.response?.url || '', // Xử lý upload image URL
      title: values.title,
      author: values.author,
      price: values.price,
      grade: values.grade,
      description: values.description,
    };
    onAddBook(newBook);
    form.resetFields();
  };

  const handleFileUpload = (file: RcFile) => {
    // Xử lý tải lên hình ảnh
    return false; // Trả về false để không tự động upload
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        grade: '',
      }}
    >
      <Form.Item
        name="title"
        label="Tiêu đề"
        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề sách!' }]}
      >
        <Input placeholder="Nhập tiêu đề sách" />
      </Form.Item>

      <Form.Item
        name="author"
        label="Tác giả"
        rules={[{ required: true, message: 'Vui lòng nhập tên tác giả!' }]}
      >
        <Input placeholder="Nhập tên tác giả" />
      </Form.Item>

      <Form.Item
        name="price"
        label="Giá"
        rules={[{ required: true, message: 'Vui lòng nhập giá sách!' }]}
      >
        <Input type="number" placeholder="Nhập giá sách" />
      </Form.Item>

      <Form.Item
        name="grade"
        label="Lớp"
        rules={[{ required: true, message: 'Vui lòng chọn lớp học!' }]}
      >
        <Select placeholder="Chọn lớp học">
          {[...Array(12).keys()].map(num => (
            <Option key={num + 1} value={(num + 1).toString()}>
              Lớp {num + 1}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="description"
        label="Mô tả"
      >
        <Input.TextArea placeholder="Nhập mô tả sách" rows={4} />
      </Form.Item>

      <Form.Item
        name="image"
        label="Hình ảnh"
        valuePropName="file"
        getValueFromEvent={handleFileUpload}
      >
        <Upload
          listType="picture"
          beforeUpload={() => false} // Không upload lên server ngay lập tức
          showUploadList={false}
          customRequest={({ file, onSuccess }) => {
            setTimeout(() => {
              onSuccess?.(file);
              message.success('Tải lên hình ảnh thành công!');
            }, 1000);
          }}
        >
          <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
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
