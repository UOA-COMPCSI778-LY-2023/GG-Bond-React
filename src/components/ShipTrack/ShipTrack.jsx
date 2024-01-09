import React, { useState, useEffect } from 'react';
import { Polyline, Marker } from 'react-leaflet';
import '../ShipTrack/ShipTrack.css';
import L from 'leaflet';
import { FiNavigation2 } from "react-icons/fi";
import ReactDOMServer from "react-dom/server";

const ShipTrack = ({ track, showTrack, currentIndex }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [visibleSegmentCount, setVisibleSegmentCount] = useState(0);

  useEffect(() => {
    if (currentIndex < track.length) {
      updateMarkerPosition(currentIndex);
    }
  }, [currentIndex, track]);

  useEffect(() => {
    const interval = 50; // Interval for line drawing animation
    let currentSegment = 0;

    const animateLineDrawing = () => {
      if (currentSegment <= currentIndex) {
        setVisibleSegmentCount(currentSegment);
        currentSegment++;
        setTimeout(animateLineDrawing, interval);
      }
    };

    animateLineDrawing();
  }, [currentIndex]);

  const updateMarkerPosition = (index) => {
    let nextIndex = index + 1 < track.length ? index + 1 : index;
    let progress = 0;
    const interval = 20; // Adjust this for faster or slower animation
    const step = 0.01; // Adjust this for smoother animation steps

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
      <FiNavigation2
        style={{
          strokeColor: "black",
          fill: 'blue',

      }}
      />)
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
    return track.slice(0, visibleSegmentCount).map((position, index) => {
      if (index === track.length - 1) return null;
      const color = getGradientColor(index, track.length - 1);
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
          positions={[position, track[index + 1]]}
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
