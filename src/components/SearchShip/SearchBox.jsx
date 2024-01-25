import React, { useState } from 'react';
import './MarineTrafficStyle.css';
import { Input, Button, message } from 'antd';

const { Search } = Input;

function SearchBox({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (value) => {
        if (isLoading) return;
    
        // 当输入为空时，不进行搜索并清除当前搜索结果
        if (!value) {
            message.error('Please enter a valid MMSI.');
            setSearchTerm(''); // 清除当前的搜索词
            onSearch(null);    // 调用 onSearch 函数并传入 null 来清除搜索结果
            return;
        }
    
        setIsLoading(true);
    
        try {
            await onSearch(value);
        } catch (error) {
            message.error('Error occurred while searching.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="search-box-container">
            <Search
                placeholder="Search ships by mmsi/vessel name"
                allowClear
                onSearch={handleSearch}
                enterButton="Search"
                loading={isLoading}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}

export default SearchBox;