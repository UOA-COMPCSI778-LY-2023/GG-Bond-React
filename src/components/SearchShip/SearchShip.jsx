import React, {useState} from 'react';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';





function SearchShip({setSelectedBoat}) {
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState("");

    const getShipsBySearch = async (searchTerm) => {
        console.log('Searching for:', searchTerm);
        
    
        const staticData = [
          { mmsi: '123456789', vesselName: 'Static Ship 1' },
          { mmsi: '987654321', vesselName: 'Static Ship 2' }
        ];
      
        setSearchResults(staticData); 
        setError(""); 
      };

      const onSelectShip = (ship) => {
        setSelectedBoat(ship);

        // 这里可以添加逻辑来移动地图到选定船只的位置
      };

  return (
    <div >
      {error && <div className="error-message">{error}</div>}
      <SearchBox onSearch={getShipsBySearch} />
    {/* <SearchResults results={searchResults} onSelectShip={onSelectShip}/> */}
    </div>
  );
}

export default SearchShip;
