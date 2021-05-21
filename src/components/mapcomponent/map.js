/* eslint-disable */
import React, { useRef, useEffect } from 'react';
import ArcGISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';
import Search from '@arcgis/core/widgets/Search';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import Fullscreen from '@arcgis/core/widgets/Fullscreen';
import Measurement from '@arcgis/core/widgets/Measurement';
import Sketch from '@arcgis/core/widgets/Sketch';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

import '../../assets/css/map.css';

const Map = () => {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */

      const graphicsLayer = new GraphicsLayer();

      const map = new ArcGISMap({
        basemap: 'streets-navigation-vector',
        layers: [graphicsLayer],
      });

      /* eslint-disable no-unused-vars */
      const view = new MapView({
        map,
        container: mapDiv.current,
        center: [-95.7129, 37.0902],
        scale: 25000000,
        ui: {
          components: ['zoom', 'compass'],
        },
      });
      /* eslint-enable no-unused-vars */

      const toggle = new BasemapToggle({
        view: view,
        nextBasemap: 'hybrid',
      });

      const searchWidget = new Search({
        view: view,
      });

      searchWidget.on('select-result', function (event) {
        console.log('The selected search result: ', event);
      });

      const FullScreen = new Fullscreen({
        view: view,
      });

      view.ui.add(FullScreen, 'bottom-right');

      const measurement = new Measurement({
        view: view,
        //activeTool: "distance"
      });

      const sketch = new Sketch({
        view: view,
        layer: graphicsLayer,
        creationMode: 'update',
      });

      view.ui.add([sketch, measurement, searchWidget, toggle], 'top-right');

      const scaleBar = new ScaleBar({
        view: view,
      });

      view.ui.add(scaleBar, 'bottom-left');
    }
  }, []);
  return <div className="mapDiv" ref={mapDiv} />;
};

export default Map;
