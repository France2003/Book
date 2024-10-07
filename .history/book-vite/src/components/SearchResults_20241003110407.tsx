import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { List } from 'antd';
import { RootState } from '../redux/store';

const SearchResults: React.FC = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || '';
    const allBooks = useSelector((state: RootState) => state.books.allBooks);
    
    const filteredBooks = allBooks.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <h1>Kết quả tìm kiếm cho: {query}</h1>
            {filteredBooks.length > 0 ? (
                <List
                    itemLayout="horizontal"
                    dataSource={filteredBooks}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<Link to={`/Book/${item.id}`}>{item.title}</Link>}
                                description={item.author}
                            />
                        </List.Item>
                    )}
                />
            ) : (
                <p>Không có kết quả nào.</p>
            )}
        </div>
    );
};

export default SearchResults;
