// components/AddBookForm.tsx
import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { Book } from '../types';

interface AddBookFormProps {
    onAddBook: (grade: string, book: Book) => void;
}

const { Option } = Select;

const AddBookForm: React.FC<AddBookFormProps> = ({ onAddBook }) => {
    const [form] = Form.useForm();
    // const [selectedGrade, setSelectedGrade] = useState<string>('');

    const onFinish = (values: any) => {
        const newBook: Book = {
            id: Date.now(), // Hoặc dùng một phương pháp khác để sinh ID
            image: values.image,
            title: values.title,
            author: values.author,
            price: values.price,
            description: values.description,
        };

        onAddBook(values.grade, newBook); // Truyền giá trị lớp trực tiếp từ form
        form.resetFields();
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="grade" label="Lớp" rules={[{ required: true, message: 'Vui lòng chọn lớp!' }]}>
                <Select placeholder="Chọn lớp">
                    <Option value="1">Lớp 1</Option>
                    <Option value="2">Lớp 2</Option>
                    <Option value="3">Lớp 3</Option>
                    <Option value="4">Lớp 4</Option>
                    <Option value="5">Lớp 5</Option>
                    <Option value="6">Lớp 6</Option>
                    <Option value="7">Lớp 7</Option>
                    <Option value="8">Lớp 8</Option>
                    <Option value="9">Lớp 9</Option>
                    <Option value="10">Lớp 10</Option>
                    <Option value="11">Lớp 11</Option>
                    <Option value="12">Lớp 12</Option>
                    {/* Các lớp khác */}
                </Select>
            </Form.Item>
            <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề sách!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="author" label="Tác giả" rules={[{ required: true, message: 'Vui lòng nhập tác giả!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá sách!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="image" label="Ảnh" rules={[{ required: true, message: 'Vui lòng nhập liên kết ảnh!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Mô tả">
                <Input.TextArea />
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
