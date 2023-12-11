import React from 'react';
import { Polyline, Marker } from 'react-leaflet';

const ShipTrack = ({ track, showTrack, currentIndex }) => {
  if (!showTrack) {
    return null;
  }

  const polylineOptions = {
    color: 'green',
    weight: 5,
    opacity: 0.7
  };

  return (
    <>
      <Polyline positions={track} {...polylineOptions} />
      <Marker position={track[currentIndex]} />
    </>
  );
};

export default ShipTrack;
