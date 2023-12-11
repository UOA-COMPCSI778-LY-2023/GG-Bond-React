import React, { useState, useEffect } from 'react';
import { Modal, Button, Progress } from 'antd';
import ShipTrack from '../ShipTrack/ShipTrack';
import mockTrack from '../ShipTrack/MockTrack';
import timestamps from '../ShipTrack/timestamps';

const TrackPopup = ({ visible, onClose, isAnimating, setIsAnimating }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTrack, setShowTrack] = useState(false); // 默认隐藏轨迹
  const [showHideButtonText, setShowHideButtonText] = useState('Show'); // 默认按钮文本为 "Show"

  useEffect(() => {
    let interval;
    if (isAnimating && mockTrack && mockTrack.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % mockTrack.length);
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
  }, [visible]);

  const handleStartPause = () => {
    setIsAnimating(!isAnimating);
  };

  const handleShowHide = () => {
    if (showHideButtonText === 'Show') {
      setShowTrack(true);
      setShowHideButtonText('Hide');
    } else {
      setIsAnimating(false);
      setShowTrack(false);
      setShowHideButtonText('Show');
    }
  };

  const progressPercent = (currentIndex / (timestamps.length - 1)) * 100;
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
    >
      <ShipTrack track={mockTrack} showTrack={showTrack} currentIndex={currentIndex} />
      <Button onClick={handleStartPause}>{isAnimating ? 'Pause' : 'Start'}</Button>
      <Button onClick={handleShowHide}>{showHideButtonText}</Button>
      <Progress percent={progressPercent} />
      <div>Current Time: {currentTime}</div>
    </Modal>
  );
};

export default TrackPopup;
