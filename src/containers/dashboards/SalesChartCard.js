import React, { useState, useRef, useEffect } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import ArcGISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import esriConfig from '@arcgis/core/config';

import '../../assets/css/map.css';

const SalesChartCard = () => {
  esriConfig.assetsPath = '/assets';

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
        extent: {
          spatialReference: {
            wkid: 102100,
          },
          xmax: -13581772,
          xmin: -13584170,
          ymax: 4436367,
          ymin: 4435053,
        },
      });
      /* eslint-enable no-unused-vars */
    }
  }, []);

  const [isInFullScreen, setIsInFullScreen] = useState(false);

  const isInFullScreenFn = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  const toggleFullScreen = () => {
    const isFS = isInFullScreenFn();

    const docElm = document.documentElement;
    if (!isFS) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsInFullScreen(!isFS);
  };

  return (
    <Card>
      <button
        className="position-absolute card-top-buttons header-icon btn btn-empty d-none d-sm-inline-block"
        type="button"
        id="fullScreenButton"
        onClick={toggleFullScreen}
      >
        {isInFullScreen ? (
          <i className="simple-icon-size-actual d-block" />
        ) : (
          <i className="simple-icon-size-fullscreen d-block" />
        )}
      </button>
      <CardBody>
        <CardTitle>Map</CardTitle>
        <div className="mapDiv" ref={mapDiv} />
      </CardBody>
    </Card>
  );
};

export default SalesChartCard;
