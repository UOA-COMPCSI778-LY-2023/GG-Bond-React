import React, { useState, useEffect } from 'react';
import { Polyline, Marker } from 'react-leaflet';
import L from 'leaflet';
import { FiNavigation2 } from "react-icons/fi";
import ReactDOMServer from "react-dom/server";

const warshipIcon = () => {
  return L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(<FiNavigation2 style={{ stroke: "black", fill: 'blue' }} />)
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
    const percent = pollution / 100; // 将污染值转换为百分比
    const red = Math.floor(255 * percent);
    const green = Math.floor(255 * (1 - percent));
    return `rgb(${red}, ${green}, 0)`; // 绿色到红色的渐变
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
          icon={warshipIcon()}
        />
      )}
    </>
  );
};

export default ShipTrack;
