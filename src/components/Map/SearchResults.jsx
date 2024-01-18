import React from 'react';
import './MarineTrafficStyle.css';

function SearchResults({ results, onSelectShip }) {
  // 使用静态测试数据
  const staticResults = [
    { mmsi: '123456789', vesselName: 'Static Ship 1' },
    { mmsi: '987654321', vesselName: 'Static Ship 2' }
  ];

  return (
    <div className="search-results-container">
      {/* 使用静态测试数据代替动态结果 */}
      {staticResults.map((result, index) => (
        <div key={index} className="dropdown-item" onClick={() => onSelectShip(result)}>
          <p><strong>MMSI:</strong> {result.mmsi}</p>
          <p><strong>Name:</strong> {result.vesselName}</p>
          {/* 其他信息 */}
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
