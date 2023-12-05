import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import MapController from '../MapController/MapController';
import Menuoptions from '../MenuOptions/MenuOptions';

const containerStyle = {
    width: '100%',
    height: '100vh'
};

const center = {
  lat: -36.842, 
  lng: 174.760
};


function Gmap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDwr4BTNTe-fH1AH0yOjuTfXxAItSANRXw"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    const zoom = 17;
    map.setZoom(zoom);
    setMap(map);
  }, []);
  
  

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { <Marker
            position={{
                lat: -36.842, 
                lng: 174.760
              }}
        />}
        <Menuoptions />
        <MapController />
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Gmap)