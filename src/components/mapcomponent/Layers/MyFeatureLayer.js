import { useEffect, useState } from 'react';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

function MyFeatureLayer(props) {
  console.log(props);
  const [myFeatureLayer, setMyFeatureLayer] = useState(null);
  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const myFeatureLayer = new FeatureLayer({
      url:
        'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2',
    });

    setMyFeatureLayer(myFeatureLayer);
    props.map.add(myFeatureLayer);

    return function cleanup() {
      props.map.remove(myFeatureLayer);
    };
  }, [myFeatureLayer, props]);
  return null;
}

export default MyFeatureLayer;
