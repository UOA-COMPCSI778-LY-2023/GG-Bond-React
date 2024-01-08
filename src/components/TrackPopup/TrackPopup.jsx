import React, { useState, useEffect } from 'react';
import { Modal, Button, Progress } from 'antd';
import ShipTrack from '../ShipTrack/ShipTrack';
import mockTrack from '../ShipTrack/MockTrack';
import timestamps from '../ShipTrack/timestamps';

const TrackPopup = ({ visible, onClose, isAnimating, setIsAnimating }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTrack, setShowTrack] = useState(false);
  const [showHideButtonText, setShowHideButtonText] = useState('Show');
  

  useEffect(() => {
    let interval;
    if (isAnimating && mockTrack && mockTrack.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % mockTrack.length);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnimating, mockTrack]);

  useEffect(() => {
    if (!visible) {
      setIsAnimating(false);
      setShowTrack(false);
      setShowHideButtonText('Show');
    }
    else {
      setShowTrack(true);
      setShowHideButtonText('Hide');
    }
  }, [visible]);

  const handleStartPause = () => {
    setIsAnimating(!isAnimating);
  };

  const handleShowHide = () => {
    setShowTrack(!showTrack);
    setShowHideButtonText(showTrack ? 'Show' : 'Hide');
  };

  const progressPercent = ((currentIndex / (timestamps.length - 1)) * 100).toFixed(2); // Limit to two decimal places
  const currentTime = timestamps[currentIndex];

  return (
    <Modal
      title="Track Control"
      visible={visible}
      onCancel={() => {
        setIsAnimating(false);
        setShowTrack(false);
        setShowHideButtonText('Show');
        onClose();
      }}
      footer={null}
      mask={false}
      style={{
        top: '80%', // 将 Modal 定位到屏幕下方中间
        margin: 'auto',
        // 你可以在这里添加其他样式，比如最大宽度或内边距等
      }}
    >
      <ShipTrack track={mockTrack} showTrack={showTrack} currentIndex={currentIndex} />
      <Button onClick={handleStartPause}>{isAnimating ? 'Pause' : 'Start'}</Button>
      <Button onClick={handleShowHide}>{showHideButtonText}</Button>
      <Progress percent={parseFloat(progressPercent)} /> {/* Parse back to float */}
      <div>Current Time: {currentTime}</div>
    </Modal>
  );
};

export default TrackPopup;
