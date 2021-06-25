/* eslint-disable */
import React, { useRef, useEffect } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/Map';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Draw from '@arcgis/core/views/draw/Draw';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Point from '@arcgis/core/geometry/Point';
import MultiPoint from '@arcgis/core/geometry/Multipoint';
import Search from '@arcgis/core/widgets/Search'

import '../../assets/css/map.css';

const Map = () => {
  const mapDiv = useRef(null);
  const click_ref = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */
      const pntGraphics = new GraphicsLayer();

      let renderer = {
        type: 'simple', // autocasts as new SimpleRenderer()
        symbol: {
          type: 'simple-fill', // autocasts as new SimpleFillSymbol()
          color: [255, 255, 255, 0.5],
          style: 'none',
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: 'white',
            width: 2,
          },
        },
      };

      let drawPnt,
        graphic,
        ctrlKey = false,
        highlight,
        statesLyrView;

      const webmap = new WebMap({
        basemap: 'streets-vector',
      });

      const view = new MapView({
        container: mapDiv.current,
        map: webmap,
        center: [-98.43750059604514, 38.1986442207947],
        scale: 25000000,
        ui: {
          components: ['zoom', 'compass'],
        },
      });

      const searchWidget = new Search({
        view: view
      });

      view.ui.add(searchWidget, "top-right");

      const stateFeatureLayer = new FeatureLayer({
        url:
          'https://services2.arcgis.com/JoecHEvChY6qFe2m/arcgis/rest/services/USA_States/FeatureServer/0',
        outFields: ['*'],
      });

      const cityFeatureLayer = new FeatureLayer({
        url:
          'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0',
        outFields: ['*'],
      });

      webmap.addMany([stateFeatureLayer, cityFeatureLayer]);

      stateFeatureLayer.when(function () {
        view.whenLayerView(stateFeatureLayer).then(function (layerView) {
          statesLyrView = layerView;
        });
      });

      const draw = new Draw({
        view: view,
      });

      var sym = {
        type: 'simple-marker',
        style: 'circle',
        color: [0, 255, 255, 0.6],
        size: '8px',
        outline: {
          color: [0, 255, 255, 1],
          width: 1,
        },
      };

      view.ui.add('point-button', 'top-left');

      const drawPoint = () => {
        console.log('in ');
        if (highlight) {
          highlight.remove();
        }
        const action = draw.create('point');
        action.on('cursor-update', function (evt) {
          view.graphics.removeAll();
          drawPnt = new Point({
            x: evt.coordinates[0],
            y: evt.coordinates[1],
            spatialReference: view.spatialReference,
          });
          graphic = new Graphic({
            geometry: drawPnt,
            symbol: sym,
          });
          view.graphics.add(graphic);
          /*if (ctrlKey && !evt.native.ctrlKey) {
              draw.reset();
              view.graphics.removeAll();
              selectStates();
          }*/
        });
        action.on('draw-complete', function (evt) {
          if (evt.native.ctrlKey) {
            ctrlKey = true;
          } else {
            ctrlKey = false;
          }
          drawPnt = new Point({
            x: evt.coordinates[0],
            y: evt.coordinates[1],
            spatialReference: view.spatialReference,
          });
          graphic = new Graphic({
            geometry: drawPnt,
            symbol: sym,
          });
          pntGraphics.add(graphic);
          if (evt.native.ctrlKey) {
            drawPoint();
          } else {
            view.graphics.removeAll();
            selectStates();
          }
        });
        view.focus();
      }

      function selectStates() {
        console.log('in selectstate');
      }

      click_ref.current = drawPoint;
      //document.getElementById('point-button').onclick = drawPoint;
    }
  }, []);

  return (
    <div className="mapDiv" ref={mapDiv}>
      <button
        id="point-button"
        className="esri-widget esri-widget--button esri-interactive"
        title="Select Countries"
        onClick={()=>click_ref.current()}
      >
        <span className="esri-icon-map-pin"></span>
      </button>
    </div>
  );
};

export default Map;