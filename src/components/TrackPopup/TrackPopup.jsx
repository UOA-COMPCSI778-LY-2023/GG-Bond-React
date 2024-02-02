import React, { useState, useEffect } from 'react';
import { Button, Progress } from 'antd';
import { CloseOutlined, PlayCircleOutlined, PauseCircleOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import ShipTrack from '../ShipTrack/ShipTrack';
import useHistoryTrack from "../../hooks/useHistoryTrack";

const TrackPopup = ({ isAnimating, setIsAnimating, mmsi }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTrack, setShowTrack] = useState(true);

  console.log("mmsi is ",mmsi);
  // 使用useHistoryTrack获取历史轨迹数据
  const { historicalTrackData } = useHistoryTrack(0, mmsi); // 使用固定的间隔和mmsi

  // 定义状态来存储转换后的轨迹数据和时间戳
  const [transformedTrackData, setTransformedTrackData] = useState([]);
  const [realtimestamps, setRealtimestamps] = useState([]);
  useEffect(() => {
    console.log("Historical Track Data:", historicalTrackData);
    if (historicalTrackData && historicalTrackData.data) {
      const newTransformedTrackData = historicalTrackData.data.map(item => ({
        position: [parseFloat(item.latitude), parseFloat(item.longitude)],
        pollution: 10 // 举例，根据需要调整
      }));
      const newRealtimestamps = historicalTrackData.data.map(item => item.dtStaticUtc);

      setTransformedTrackData(newTransformedTrackData);
      setRealtimestamps(newRealtimestamps);
    }
  }, [historicalTrackData]);
  
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let interval;
    console.log('www',transformedTrackData);
    if (isAnimating && Array.isArray(transformedTrackData) && transformedTrackData.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % transformedTrackData.length);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnimating, transformedTrackData]);

  const progressPercent = transformedTrackData && realtimestamps
    ? ((currentIndex / (realtimestamps.length - 1)) * 100).toFixed(2)
    : 0;
  const currentTime = realtimestamps && realtimestamps[currentIndex];


  const handleStartPause = () => {
    setIsAnimating(!isAnimating);
  };

  const handleShowHide = () => {
    setShowTrack(!showTrack);
  };

  const handleClose = () => {
    setIsAnimating(false);
    setShowTrack(false);
    setIsVisible(false);
    setCurrentIndex(0); // Reset currentIndex
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '-520px',
      left: '900px',
      transform: 'translateX(-50%)',
      width: '180%',
      padding: '15px',
      backgroundColor: '#f7f7f7',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderRadius: '8px 8px 0 0',
      zIndex: 1000,
      borderTop: '1px solid #e0e0e0'
    }}>
      {transformedTrackData && realtimestamps && Array.isArray(transformedTrackData) && (
        <ShipTrack
        track={transformedTrackData}
          showTrack={showTrack}
          currentIndex={currentIndex}
          isAnimating={isAnimating}
        />
      )}


      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '10px' }}>
        <Button
          onClick={handleStartPause}
          icon={isAnimating ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          style={{ fontSize: '18px', padding: '6px 20px', border: 'none' }} // No border
        >
          {isAnimating ? 'Pause' : 'Start'}
        </Button>

        <Button
          onClick={handleShowHide}
          icon={showTrack ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          style={{ fontSize: '18px', padding: '6px 20px', border: 'none' }} // No border
        >
          {showTrack ? 'Hide Track' : 'Show Track'}
        </Button>

        <Button
          onClick={handleClose}
          type="default"
          icon={<CloseOutlined />}
          style={{ fontSize: '18px', padding: '6px 20px', border: 'none' }} // No border
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <Progress
          percent={parseFloat(progressPercent)}
          style={{ width: '90%' }}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          showInfo={false} // Hide default percentage text
        />
        <div style={{ marginLeft: '10px', fontSize: '18px', color: '#595959' }}>
          {progressPercent}%
        </div>
      </div>

      <div style={{ marginTop: '15px', fontSize: '18px', textAlign: 'center', color: '#595959' }}>Current Time: {currentTime}</div>
    </div>
  );
};


export default TrackPopup;
