import React, { useState } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

import IntlMessages from '../../helpers/IntlMessages';

import Map from '../../components/mapcomponent/map';
import MyFeatureLayer from '../../components/mapcomponent/Layers/MyFeatureLayer';

const SalesChartCard = () => {
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
      <div className="position-absolute card-top-buttons">
        <button
          className="header-icon btn btn-empty d-none d-sm-inline-block"
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
      </div>
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.map" />
        </CardTitle>
        <Map>
          <MyFeatureLayer />
        </Map>
      </CardBody>
    </Card>
  );
};

export default SalesChartCard;
