import React from 'react';
import { Polyline } from 'react-leaflet';

const ShipTrack = ({ track, showTrack }) => {
  return showTrack ? <Polyline positions={track} color="red" /> : null;
};

export default ShipTrack;
