import React from 'react';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import IntlMessages from '../../helpers/IntlMessages';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import Breadcrumb from '../../containers/navs/Breadcrumb';
import Map from '../../components/mapcomponent/map';
import MyFeatureLayer from '../../components/mapcomponent/Layers/MyFeatureLayer';

const BlankPage = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.blank-page" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <IntlMessages id="dashboards.map" />
              </CardTitle>
              <Map>
                <MyFeatureLayer />
              </Map>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default BlankPage;
