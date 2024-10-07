import React from 'react';
import { Modal, Form, Input, Button, Select, Checkbox } from 'antd';
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
  const [category, setCategory] = React.useState<string>('');
  const [isFeatured, setIsFeatured] = React.useState<boolean>(false);
  const [isBestSeller, setIsBestSeller] = React.useState<boolean>(false); // Thay đổi từ isOnPromotion thành isBestSeller

  const categories = ['Bộ Cánh Diều', 'Bộ Chân Trời', 'Bộ Kết Nối', 'Bộ Bình Đẳng', 'Bộ Cùng Học'];

  React.useEffect(() => {
    if (book) {
      form.setFieldsValue(book);
      setGrade(book.grade || '');
      setCategory(book.category || '');
      setIsFeatured(!!book.isFeatured);
      setIsBestSeller(!!book.isBestSeller); // Cập nhật trạng thái Bán chạy
    }
  }, [book, form]);

  const handleFinish = (values: any) => {
    const updatedBook: Book = {
      ...values,
      id: book?.id || Date.now(),
      grade,
      category,
      isFeatured,
      isBestSeller, // Đảm bảo trạng thái Bán chạy được bao gồm
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
        <Form.Item name="productcode" label="Mã sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm!' }]}>
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
          <Checkbox
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          >
            Sản phẩm nổi bật
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={isBestSeller} // Sử dụng isBestSeller thay cho isOnPromotion
            onChange={(e) => setIsBestSeller(e.target.checked)}
          >
            Sản phẩm khuyến mãi
          </Checkbox>
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
