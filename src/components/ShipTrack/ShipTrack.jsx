import React, { useState, useEffect } from 'react';
import { Polyline, Marker } from 'react-leaflet';
import '../ShipTrack/ShipTrack.css';
import L from 'leaflet';
import { FiNavigation2 } from "react-icons/fi";
import ReactDOMServer from "react-dom/server";

const ShipTrack = ({ track, showTrack, currentIndex }) => {
  const [displayedTrack, setDisplayedTrack] = useState([]);
  const [markerPosition, setMarkerPosition] = useState(null); // 新状态用于跟踪标记的实时位置

  useEffect(() => {
    if (currentIndex < track.length) {
      setDisplayedTrack(track.slice(0, currentIndex + 1));
      animateMarkerPosition(currentIndex);
    }
  }, [currentIndex, track]);

  // 动画函数用于平滑移动标记
  const animateMarkerPosition = (index) => {
    let nextIndex = index < track.length - 1 ? index + 1 : index;
    let progress = 0;
    const interval = 20; // 控制动画速度
    const step = 0.01; // 控制动画步长

    const animate = () => {
      if (progress < 1) {
        progress += step;
        const lat = track[index][0] + (track[nextIndex][0] - track[index][0]) * progress;
        const lng = track[index][1] + (track[nextIndex][1] - track[index][1]) * progress;
        setMarkerPosition([lat, lng]);
        setTimeout(animate, interval);
      } else {
        setMarkerPosition(track[nextIndex]);
      }
    };

    animate();
  };

  if (!showTrack) {
    return null;
  }

  const warshipIcon = () => {
    return L.divIcon({
      className: 'custom-icon',
      html: ReactDOMServer.renderToString(
      <FiNavigation2 style={{ strokeColor: "black", fill: 'blue' }} />)
    });
  };

  const getGradientColor = (index, total) => {
    const ratio = index / total;
    let r, g, b = 0;
    if (ratio < 0.5) {
      g = 255;
      r = Math.floor(510 * ratio);
    } else {
      r = 255;
      g = Math.floor(255 - 510 * (ratio - 0.5));
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  const renderTrackSegments = () => {
    const segmentLength = displayedTrack.length - 1;
    return displayedTrack.slice(0, -1).map((position, index) => {
      const color = getGradientColor(index, segmentLength);
      const glowStyle = {
        color: color,
        weight: 5,
        opacity: 0.7,
        dashArray: '1, 10',
        lineJoin: 'round',
        lineCap: 'round',
        fillColor: color,
        fillOpacity: 0.7,
        stroke: true,
        weight: 5,
        opacity: 0.8,
        smoothFactor: 1,
        className: 'glow-line'
      };
      return (
        <Polyline
          key={index}
          positions={[position, displayedTrack[index + 1]]}
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
