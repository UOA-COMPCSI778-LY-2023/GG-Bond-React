import React, { useState, useEffect } from 'react';
import { Button, Progress } from 'antd';
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
      width: '200%',
      padding: '15px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      borderRadius: '4px 4px 0 0',
      zIndex: 1000,
      borderTop: '1px solid #e8e8e8'
  }}>
      <ShipTrack track={mockTrack} showTrack={showTrack} currentIndex={currentIndex} />
      <Button onClick={handleStartPause}>{isAnimating ? 'Pause' : 'Start'}</Button>
      <Button onClick={handleShowHide}>{showHideButtonText}</Button>
      <Progress percent={parseFloat(progressPercent)} />
      <div>Current Time: {currentTime}</div>
      <Button onClick={handleClose}>Close</Button>
    </div>
  );
};

export default TrackPopup;
