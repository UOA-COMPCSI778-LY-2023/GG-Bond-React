import React, { useState, useEffect } from 'react';
import { Button, Progress } from 'antd';
import { CloseOutlined, PlayCircleOutlined, PauseCircleOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import ShipTrack from '../ShipTrack/ShipTrack';
import mockTrack from '../ShipTrack/MockTrack';
import timestamps from '../ShipTrack/timestamps';

const TrackPopup = ({ isAnimating, setIsAnimating }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTrack, setShowTrack] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [showHideButtonText, setShowHideButtonText] = useState('Hide');

  useEffect(() => {
    let interval;
    if (isAnimating && mockTrack && mockTrack.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % mockTrack.length);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnimating, mockTrack]);

  const handleStartPause = () => {
    setIsAnimating(!isAnimating);
  };

  const handleShowHide = () => {
    setShowTrack(!showTrack);
    setShowHideButtonText(showTrack ? 'Show' : 'Hide');
  };

  const handleClose = () => {
    setIsAnimating(false);
    setShowTrack(false);
    setIsVisible(false);
  };

  const progressPercent = ((currentIndex / (timestamps.length - 1)) * 100).toFixed(2); // Limit to two decimal places
  const currentTime = timestamps[currentIndex];

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
      <ShipTrack track={mockTrack} showTrack={showTrack} currentIndex={currentIndex} />

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
