import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import ShipMarker from './ShipMarker';
import ShipTypeFilter from './ShipTypeFilter';
import ShipInfoBody from './ShipInfoBody';

const ShipMapContainer = ({ shipsData }) => {
  const [selectedFilters, setSelectedFilters] = useState([]); // 选中的船只类型
  const [selectedBoat, setSelectedBoat] = useState(null); // 选中的船只
  const [shipsData, setShipsData] = useState([]); // 储存船只数据的状态

  // 处理过滤器选择的函数
  const handleFilterSelect = (type) => {
    setSelectedFilters(filters =>
      filters.includes(type) ? filters.filter(f => f !== type) : [...filters, type]
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://13.236.117.100:8888/doc.html#/home');
        const data = await response.json();
        // 假设返回的数据是一个船只对象的数组
        setShipsData(data);
      } catch (error) {
        console.error('Error fetching ship data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div>
      <ShipTypeFilter
        selectedFilters={selectedFilters}
        handleFilterSelect={handleFilterSelect}
        shipTypes={Object.keys(shipTypeDic)}
      />
      <MapContainer center={[0, 0]} zoom={3} style={{ height: '100vh', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {shipsData.filter(ship => selectedFilters.length === 0 || selectedFilters.includes(ship.type))
                  .map(ship => (
                    <ShipMarker key={ship.mmsi} boatData={ship} setSelectedBoat={setSelectedBoat} />
        ))}
      </MapContainer>
      {selectedBoat && <ShipInfoBody ship={selectedBoat} />}
    </div>
  );
};

export default ShipMapContainer;
