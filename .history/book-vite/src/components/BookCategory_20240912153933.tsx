// components/BookCategory.tsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Menu, Collapse } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { textbookCategories } from '../data/categories';

const { Panel } = Collapse;

const BookCategory: React.FC = () => {
    const { grade } = useParams<{ grade: string }>();
    return (
        <div className="p-6 max-w-xs border-r">
            <h1 className="text-2xl font-bold mb-6">Danh mục sách giáo khoa</h1>
            <Collapse accordion>
                {textbookCategories.map((category) => (
                    <Panel
                        header={`Lớp ${category.id}`}
                        key={category.id}
                        extra={<BookOutlined />}
                    >
                        <Menu
                            mode="inline"
                            items={category.name.map((subject) => ({
                                key: subject,
                                label: (
                                    <Link
                                        to={`/books/grade/${id}/name/${subject.toLowerCase()}`} // Sử dụng grade thay vì category.id
                                        className="text-blue-600 hover:underline"
                                    >
                                        Sách {subject}
                                    </Link>

                                ),
                            }))}
                        />
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default BookCategory;
