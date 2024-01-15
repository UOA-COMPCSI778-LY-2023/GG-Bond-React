import React, { useState, useEffect } from 'react';
import { Polyline, Marker } from 'react-leaflet';
import '../ShipTrack/ShipTrack.css';
import L from 'leaflet';
import { FiNavigation2 } from "react-icons/fi";
import ReactDOMServer from "react-dom/server";

const warshipIcon = () => {
  return L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(<FiNavigation2 style={{ stroke: "black", fill: 'blue' }} />)
  });
};

const ShipTrack = ({ track, showTrack, currentIndex, isAnimating }) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    if (isAnimating && currentIndex < track.length) {
      animateMarkerPosition(currentIndex);
    }
  }, [currentIndex, track, isAnimating]);

  
    // 动画标记的移动
    const animateMarkerPosition = (index) => {
      if (index < track.length - 1) {
        const start = track[index].position;
        const end = track[index + 1].position;
        const duration = 1000; // 动画持续时间，单位为毫秒
        const stepTime = 20; // 每一步的时间间隔，单位为毫秒
        let elapsedTime = 0;
  
        const animateStep = () => {
          elapsedTime += stepTime;
          const t = elapsedTime / duration;
          if (t < 1) {
            const lat = start[0] + (end[0] - start[0]) * t;
            const lng = start[1] + (end[1] - start[1]) * t;
            setMarkerPosition([lat, lng]);
            setTimeout(animateStep, stepTime);
          } else {
            setMarkerPosition(end);
            if (index + 1 < track.length) {
              animateMarkerPosition(index + 1);
            }
          }
        };
  
        animateStep();
      }
    };
  
    const getPollutionColor = (pollution) => {
      const percent = pollution / 100; // 将污染值转换为百分比
      const red = Math.floor(255 * percent);
      const green = Math.floor(255 * (1 - percent));
      return `rgb(${red}, ${green}, 0)`; // 绿色到红色的渐变
    };
  
    const renderTrackSegments = () => {
      return track.slice(0, -1).map((data, index) => {
        const nextData = track[index + 1];
        const color = getPollutionColor((data.pollution + nextData.pollution) / 2); // 计算两点间污染值的平均数
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
