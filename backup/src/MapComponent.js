import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-snap';
import 'leaflet-geometryutil';
import 'leaflet-draw';


const MapComponent = ({ map }) => {  // Receive the map instance as a prop
  const guideLayers = [];  // This will hold your guide layers

  useEffect(() => {
    let drawnItems = new L.FeatureGroup().addTo(map);

    new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
        poly: { allowIntersection: false },
      },
      draw: {
        polygon: { allowIntersection: false, showArea: true },
      },
    }).addTo(map);

    map.on(L.Draw.Event.CREATED, function (event) {
      var layer = event.layer;

      guideLayers.push(layer);  // Add the newly created layer to the guide layers

      drawnItems.addLayer(layer);
      layer.snapediting = new L.Handler.PolylineSnap(map, layer);
      layer.snapediting.addGuideLayer(guideLayers);  // Pass in your guide layers here
      layer.snapediting.enable();
    });

    return () => {
      // Perform any cleanup here
      map.off(L.Draw.Event.CREATED);
    }
  }, [map]);

  // Rest of your component...
};

export default MapComponent;



