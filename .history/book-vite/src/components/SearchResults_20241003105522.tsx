import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { List, Typography } from 'antd';
import { RootState } from '../redux/store';

const { Title, Paragraph } = Typography;

const SearchResults: React.FC = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const allBooks = useSelector((state: RootState) => state.books.allBooks);
    const filteredBooks = allBooks.filter(book =>
        book.title.toLowerCase().includes(query?.toLowerCase() || '')
    );

    return (
        <div>
            <Title level={1}>Kết quả tìm kiếm cho: <span style={{ color: '#1890ff' }}>{query}</span></Title>
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
                <Paragraph>Kết quả không tìm thấy cho truy vấn này.</Paragraph>
            )}
        </div>
    );
};

export default SearchResults;
