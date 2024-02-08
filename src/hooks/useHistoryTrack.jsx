import { useState, useEffect } from 'react';
import { getHistoryTrack } from '../utils/api'; // 确保从正确的路径导入

const useHistoryTrack = (interval, mmsi) => {
    const [historicalTrackData, setHistoricalTrackData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('useHistoryTrack hook is called');
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            const { data, error } = await getHistoryTrack(mmsi, interval);

            if (!error) {
                setHistoricalTrackData(data);
            } else {
                setError(error);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [interval, mmsi]);

    return { historicalTrackData, isLoading, error };
};

export default useHistoryTrack;
