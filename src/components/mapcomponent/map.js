/* eslint-disable */
import React, { useRef, useEffect } from 'react';
import ArcGISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

import '../../assets/css/map.css';

const Map = () => {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */
      const map = new ArcGISMap({
        basemap: 'gray-vector',
      });

      /* eslint-disable no-unused-vars */
      const view = new MapView({
        map,
        container: mapDiv.current,
        center: [-95.7129, 37.0902],
        zoom: 3,
      });
      /* eslint-enable no-unused-vars */
      view.ui.move('zoom', 'bottom-left');
    }
  }, []);
  return <div className="mapDiv" ref={mapDiv} />;
};

export default Map;
