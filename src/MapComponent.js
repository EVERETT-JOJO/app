import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

const MapComponent = ({ map }) => {
  const guideLayers = useRef([]);

  useEffect(() => {
    if (map) {  // Only run this code if map is not null
      let drawnItems = new L.FeatureGroup().addTo(map);

      // Initialize the draw control and add it to the map
      map.pm.addControls({
        position: 'topleft',
        drawCircle: false,
        drawMarker: true,
        drawPolyline: true,
        drawRectangle: true,
        drawPolygon: true,
        drawCircleMarker: true,
        cutPolygon: true,
        editMode: true,
        removalMode: true,
      });

      // Set up the event handler for the 'created' event
      map.on('pm:create', function (event) {
        var layer = event.layer;

        guideLayers.current.push(layer);

        drawnItems.addLayer(layer);
      });

      // Clean up when the component is unmounted
      return () => {
        map.off('pm:create');
      }
    }
  }, [map]);  // Rerun this code whenever map changes

  // Rest of your component...
};

export default MapComponent;
