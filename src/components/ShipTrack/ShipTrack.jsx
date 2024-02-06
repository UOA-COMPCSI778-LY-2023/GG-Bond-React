import React, { useState, useEffect } from 'react';
import { Polyline, Marker } from 'react-leaflet';
import L from 'leaflet';
import { FiNavigation2 } from "react-icons/fi";
import ReactDOMServer from "react-dom/server";

const warshipIcon = (heading) => {
  return L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(<FiNavigation2 style={{ stroke: "black", fill: 'blue', transform: `rotate(${heading}deg)` }} />),
    iconAnchor: [12.5, 12.5] // 这个值可能需要根据你的图标大小进行调整
  });
};

const ShipTrack = ({ track, showTrack, currentIndex }) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    console.log("current index",currentIndex);
    // 直接根据currentIndex设置标记的位置，而不是使用动画
    if (showTrack && track && track.length > 0 && currentIndex < track.length) {
      const newPosition = track[currentIndex].position;
      setMarkerPosition(newPosition);
    }
  }, [currentIndex, track, showTrack]); // 监听currentIndex, track, 和 showTrack的变化

  const getPollutionColor = (pollution) => {
    // 确保污染值在0到15的范围内
    const normalizedPollution = Math.min(Math.max(pollution, 0), 15);
    // 计算污染值对应的颜色比例
    const percent = normalizedPollution / 15;
  
    // 根据污染比例计算红色和绿色通道的值，以实现从绿色到红色的渐变
    // 红色值随污染值线性增加
    const red = Math.floor(255 * percent);
    // 绿色值随污染值线性减少
    const green = Math.floor(255 * (1 - percent));
  
    // 返回根据污染等级计算出的颜色
    return `rgb(${red}, ${green}, 0)`;
  };
  

  const renderTrackSegments = () => {
    if (!showTrack || !Array.isArray(track) || track.length === 0) {
      return null;
    }

    return track.slice(0, -1).map((data, index) => {
      const nextData = track[index + 1];
      const color = getPollutionColor((data.pollution + nextData.pollution) / 2);
      const glowStyle = {
        color: color,
        weight: 5,
        opacity: 0.7,
        dashArray: '1, 10',
        lineJoin: 'round',
        lineCap: 'round',
        smoothFactor: 1,
        className: 'glow-line'
      };
      return (
        <Polyline
          key={index}
          positions={[data.position, nextData.position]}
          {...glowStyle}
        />
      );
    });
  };

  return (
    <>
      {renderTrackSegments()}
      {markerPosition && (
        <Marker
          position={markerPosition}
          icon={warshipIcon(track[currentIndex].heading)}
        />
      )}
    </>
  );
};

export default ShipTrack;
