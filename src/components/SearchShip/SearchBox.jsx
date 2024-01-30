import React, { useState, useCallback } from 'react';
import './MarineTrafficStyle.css'; // 保留CSS样式引入
import { Input } from 'antd';
import debounce from 'lodash/debounce';

const { Search } = Input;

function SearchBox({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // 使用 useCallback 和 debounce 来减少不必要的搜索请求
    const debouncedSearch = useCallback(debounce((value) => {
        handleSearch(value);
    }, 800), []); // 800ms 是防抖延迟时间

    const handleSearch = async (value) => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            await onSearch(value);
        } catch (error) {
            // 错误处理逻辑保持不变
        } finally {
            setIsLoading(false);
        }
    };

    const onChange = (e) => {
        setSearchTerm(e.target.value);
        debouncedSearch(e.target.value);
    };

    return (
        <div className="search-box-container">
            <Search
                placeholder="Search ships by MMSI/Vessel Name"
                allowClear
                enterButton={false} 
                loading={isLoading}
                value={searchTerm}
                onChange={onChange}
            />
        </div>
    );
}

export default SearchBox;
