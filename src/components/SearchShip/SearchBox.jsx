import React, { useState } from 'react';
import './MarineTrafficStyle.css';

function SearchBox({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        if (!searchTerm) {
            setError('Please enter a valid MMSI.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await onSearch(searchTerm); // 确保这里正确地传递了搜索词
        } catch (error) {
            setError('Error occurred while searching.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="search-box-container">
            <form onSubmit={handleSearch} className="search-box">
            <input
  type="text"
  placeholder="Search ships by mmsi/vessal name"
  value={searchTerm}
  className="search-input"
  onChange={(e) => setSearchTerm(e.target.value)}
  disabled={isLoading}
  style={{
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    border: 'none',
    borderRadius: '20px',
    width: '700px',
    padding: '1px', // 减少垂直内边距，使搜索框变扁
    fontSize: '14px',}} // 内联样式
/>

                <button type="submit" className="search-button" disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default SearchBox;
