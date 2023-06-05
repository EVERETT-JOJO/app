import React, { useRef, useCallback } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import SearchControl from './SearchControl';  // Import SearchControl

const Map = () => {
  const position = [43.6121, -116.3915];
  const mapRef = useRef();

  const handleZoomEnd = useCallback(() => {
    const mapInstance = mapRef.current;
    if (mapInstance) {
      const zoomLevel = mapInstance.getZoom();
      console.log("Zoom level is now:", zoomLevel);
    }
  }, []);

  return (
    <MapContainer center={position} zoom={18} maxZoom={22} style={{ height: "100vh", width: "100%" }} whenCreated={mapInstance => { mapRef.current = mapInstance; }} onzoomend={handleZoomEnd}>
      <TileLayer maxZoom={22}
        url="https://api.mapbox.com/styles/v1/everettcass208/clhq7sj9w00op01rh7u2zao8x/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXZlcmV0dGNhc3MyMDgiLCJhIjoiY2xncnB5NmNrMDVkZjNkbnpieTNxYnFxaSJ9.VVbC3VwgVWT_jzzQkrTFSQ"  // Use your MapBox style URL here"
        attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
      />

      <FeatureGroup>
        <EditControl
          position='topright'
          onCreated={(e) => console.log(e)}
          draw={{
            rectangle: false
          }}
        />
      </FeatureGroup>

      <SearchControl />
      {/* // Use SearchControl */}
    </MapContainer>
  );
};

export default Map;
