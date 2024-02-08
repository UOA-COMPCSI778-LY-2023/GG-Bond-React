import React, { useState, useEffect } from 'react';
import { Button, Progress } from 'antd';
import { CloseOutlined, PlayCircleOutlined, PauseCircleOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import ShipTrack from '../ShipTrack/ShipTrack';
import useHistoryTrack from "../../hooks/useHistoryTrack";
import "./TrackPopup.css";

const TrackPopup = ({ isAnimating, setIsAnimating, mmsi, shipName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTrack, setShowTrack] = useState(true);
  const { historicalTrackData } = useHistoryTrack(0, mmsi);
  const [transformedTrackData, setTransformedTrackData] = useState([]);
  const [realtimestamps, setRealtimestamps] = useState([]);

  useEffect(() => {
    if (historicalTrackData && historicalTrackData.data) {
      const newTransformedTrackData = historicalTrackData.data.map(item => ({
        position: [parseFloat(item.latitude), parseFloat(item.longitude)],
        pollution: parseFloat(item.lv),
        heading: parseFloat(item.heading)
      }));
      const newRealtimestamps = historicalTrackData.data.map(item => item.dtStaticUtc);
      setTransformedTrackData(newTransformedTrackData);
      setRealtimestamps(newRealtimestamps);
    }
  }, [historicalTrackData]);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let interval;
    if (isAnimating && Array.isArray(transformedTrackData) && transformedTrackData.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % transformedTrackData.length);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnimating, transformedTrackData]);

  const progressPercent = transformedTrackData && realtimestamps
  ? Math.min(((currentIndex / (realtimestamps.length - 1)) * 100), 100).toFixed(3)
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
    setCurrentIndex(0);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '2%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '30%',
      padding: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // 将背景颜色设置为带有透明度的白色
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      borderRadius: '10px',
      zIndex: 1000,
      border: '3px solid #4A90E2', // 添加这一行来设置四周的边框
      fontWeight: 'bold'
    }}>
      {transformedTrackData && realtimestamps && Array.isArray(transformedTrackData) && (
        <ShipTrack
          track={transformedTrackData}
          showTrack={showTrack}
          currentIndex={currentIndex}
          isAnimating={isAnimating}
          heading={transformedTrackData[currentIndex] ? transformedTrackData[currentIndex].heading : 0}
          shipName={shipName}
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '10px' }}>
        <Button
        className={`button-start-pause ${isAnimating ? 'isAnimating' : ''}`}
          onClick={handleStartPause}
          icon={isAnimating ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          style={{
            fontSize: '18px',
            padding: '6px 20px',
            border: 'none',
            backgroundColor: isAnimating ? '#F5A623' : '#7ED321',
            color: '#FFFFFF',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.3s'
          }}
        >
          {isAnimating ? 'Pause' : 'Start'}
        </Button>

        <Button
          onClick={handleShowHide}
          className={`button-show-hide ${showTrack ? 'showTrack' : ''}`}
          icon={showTrack ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          style={{
            fontSize: '18px',
            padding: '6px 20px',
            border: 'none',
            backgroundColor: showTrack ? '#3498db' : '#9b59b6',
            color: '#FFFFFF',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.3s'
          }}
        >
          {showTrack ? 'Hide Track' : 'Show Track'}
        </Button>

        <Button
          onClick={handleClose}
          className="button-close"
          type="default"
          icon={<CloseOutlined />}
          style={{
            fontSize: '18px',
            border: 'none',
            backgroundColor: '#e74c3c',
            color: '#FFFFFF',
            borderRadius: '5px',
            transition: 'all 0.3s'
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', justifyContent: 'space-between' }}>
        <Progress
          percent={parseFloat(progressPercent)}
          style={{ width: '550px' }}
          strokeColor={{
            '0%': '#34C759',
            '100%': '#FF3B30',
          }}
          showInfo={false}
        />
        <div style={{ minWidth: '50px', textAlign: 'center', marginLeft: '10px', color: '#595959', fontSize: '18px' }}>
          {progressPercent}%
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px', justifyContent: 'space-between' }}>
        <div style={{
          position: 'relative', // 确保子元素的绝对定位基于此容器
          height: '15px',
          borderRadius: '10px',
          background: 'linear-gradient(to right, #34C759 0%, #FF3B30 100%)',
          border: '1px solid #d9d9d9',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          flex: 1,
          marginRight: '10px',
          display: 'flex',
          alignItems: 'center'
        }}>
          {/* 使用数组生成0到100的标签 */}
          {[...Array(11)].map((_, index) => (
            <span key={index} style={{
              position: 'absolute',
              left: `${index * 10}%`,
              transform: index === 0 ? 'translateX(0%)' : index === 10 ? 'translateX(-100%)' : 'translateX(-50%)', // 对首尾数值特殊处理
              color: 'black',
              fontWeight: 'bold',
              fontSize: '12px',
              userSelect: 'none', // 防止文本被选中
            }}>
              {index * 10}
            </span>
          ))}
        </div>
        <div style={{ minWidth: '50px', textAlign: 'center', color: '#595959', fontSize: '18px' }}>
          Pollution
        </div>
      </div>


      <div style={{ marginTop: '15px', fontSize: '18px', textAlign: 'center', color: '#595959' }}>Current Time: {currentTime}</div>
    </div>
  );
};

export default TrackPopup;
