import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { Book } from '../types';

const { Option } = Select;

interface EditBookModalProps {
  visible: boolean;
  book: Book | null;
  onSave: (book: Book) => void;
  onCancel: () => void;
}

const EditBookModal: React.FC<EditBookModalProps> = ({ visible, book, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [grade, setGrade] = React.useState<string>('');
  const [category, setCategory] = React.useState<string>(''); // State for category

  // Sample categories
  const categories = ['Văn học', 'Toán học', 'Khoa học', 'Lịch sử', 'Địa lý'];

  React.useEffect(() => {
    if (book) {
      form.setFieldsValue(book);
      setGrade(book.grade || '');
      setCategory(book.category || ''); // Set initial category
    }
  }, [book, form]);

  const handleFinish = (values: any) => {
    const updatedBook: Book = {
      ...values,
      id: book?.id || Date.now(),
      grade,
      category, // Include category in the updated book object
    };
    onSave(updatedBook);
  };

  return (
    <Modal
      title="Sửa Sách"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
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
        {/* New category selection */}
        <Form.Item label="Thể loại" required>
          <Select
            value={category}
            onChange={setCategory}
            placeholder="Chọn thể loại"
            style={{ width: '100%' }}
          >
            {categories.map(cat => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditBookModal;
