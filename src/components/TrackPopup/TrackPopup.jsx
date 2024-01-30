import React, { useState, useEffect } from 'react';
import { Button, Progress } from 'antd';
import { CloseOutlined, PlayCircleOutlined, PauseCircleOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import ShipTrack from '../ShipTrack/ShipTrack';


const TrackPopup = ({ isAnimating, setIsAnimating, trackData, realtimestamps }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTrack, setShowTrack] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let interval;
    if (isAnimating && Array.isArray(trackData) && trackData.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % trackData.length);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnimating, trackData]);

  const progressPercent = trackData && realtimestamps
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
      {trackData && Array.isArray(trackData) && (
        <ShipTrack
          track={trackData}
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
