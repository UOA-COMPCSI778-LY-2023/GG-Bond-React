import { useState, useEffect } from 'react';
import axios from 'axios';

const useHistoryTrack = (interval, mmsi) => {
    const [historicalTrackData, setHistoricalTrackData] = useState(null);  // Renamed shipData to historicalTrackData
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('useHistoryTrack hook is called');
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Replace with your actual API endpoint
                const url = `/rest/v1/ship/history/${interval}/${mmsi}`;
                const response = await axios.get(url);

                if (response.status === 200) {
                    setHistoricalTrackData(response.data);  // Update here
                } else {
                    setError('Error fetching data');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [interval, mmsi]);

    return { historicalTrackData, isLoading, error };  // Update the return statement
};

export default useHistoryTrack;
