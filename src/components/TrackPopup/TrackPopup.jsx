import React, { useState, useEffect } from 'react';
import { Button, Progress } from 'antd';
import { CloseOutlined, PlayCircleOutlined, PauseCircleOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import ShipTrack from '../ShipTrack/ShipTrack';
import useHistoryTrack from "../../hooks/useHistoryTrack";
import "./TrackPopup.css";

const TrackPopup = ({ isAnimating, setIsAnimating, mmsi, shipName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTrack, setShowTrack] = useState(true);
  console.log("sppp", shipName);
  console.log("mmsi is ", mmsi);
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
        pollution: parseFloat(item.lv),
        heading: parseFloat(item.heading)
      }));
      const newRealtimestamps = historicalTrackData.data.map(item => item.dtStaticUtc);

      setTransformedTrackData(newTransformedTrackData);
      setRealtimestamps(newRealtimestamps);
    }
  }, [historicalTrackData]);
  console.log("data total", transformedTrackData);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let interval;
    console.log('www', transformedTrackData);
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
      bottom: '2%',
      left: '900px',
      transform: 'translateX(-50%)',
      width: '30%',
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
          heading={transformedTrackData[currentIndex] ? transformedTrackData[currentIndex].heading : 0}
          shipName={shipName}
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
          style={{ fontSize: '18px', border: 'none' }} // No border
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', justifyContent: 'space-between' }}>
        <Progress
          percent={parseFloat(progressPercent)}
          className="custom-progress" // 应用自定义样
          style={{ width: '100%' }} // 使进度条填满容器
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          showInfo={false} // 隐藏默认百分比文本
        />
        <div style={{ minWidth: '50px', textAlign: 'center', marginLeft: '10px', color: '#595959', fontSize: '18px' }}>
          {progressPercent}%
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px', justifyContent: 'space-between' }}>
        {/* 污染值提示的渐变条，保持原始颜色，视觉优化版 */}
        <div style={{
          height: '15px',
          borderRadius: '10px', // 更圆润的边角
          background: 'linear-gradient(to right, #00ff00 0%, #ff0000 100%)', // 保持原始的绿到红的渐变
          border: '1px solid #d9d9d9', // 更细腻的边框颜色
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // 轻微的阴影效果
          flex: 1, // 使渐变条填满除了显示"pollution"文字部分的容器
          marginRight: '10px' // 保持与进度条旁数字的间距一致
        }}>
          <span style={{ position: 'absolute', color: 'black', left:'4%',fontWeight: 'bold',fontSize: '12px' }}>0</span> {/* 左侧的0 */}
          {/* 使用绝对定位并将left设置为90%，使其接近右侧边缘 */}
          <span style={{ position: 'absolute', left: '70%', color: 'black',fontWeight: 'bold', fontSize: '12px' }}>100</span> {/* 右侧的100 */}
        </div>
        <div style={{ minWidth: '50px', textAlign: 'center', color: '#595959', fontSize: '18px' }}>
          Pollution Level
        </div>
      </div>


      <div style={{ marginTop: '15px', fontSize: '18px', textAlign: 'center', color: '#595959' }}>Current Time: {currentTime}</div>
    </div>
  );
};


export default TrackPopup;
