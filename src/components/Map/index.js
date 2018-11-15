/**
 * Created by vladtomsa on 12/11/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import ZoomControl from './ZoomControl';

const styles = {
  '@global .leaflet-container': {
    height: 350,
    width: '100%',
  }
};

class LocationSelector extends Component {
  state = {
    address: '',
    country: null,
    lat: 0,
    lng: 0,
    zoom: 16,
  };

  componentDidMount() {
    const { markers } = this.props;

    const nearestMarker = markers[0];

    this.setState({
      lat: nearestMarker.lat,
      lng: nearestMarker.lng,
    })
  }

  onZoom = (event) => {
    const zoom = event.target.getZoom();

    this.setState({ zoom });
  };

  onZoomIn = () => {
    this.setState(prevState => ({ ...prevState, zoom: prevState.zoom + 1 }));
  };

  onZoomOut = () => {
    this.setState(prevState => ({ ...prevState, zoom: prevState.zoom > 0 ? prevState.zoom - 1 : prevState.zoom }));
  };

  render() {
    const { lat, lng, zoom } = this.state;
    const { markers} = this.props;

    const position = [lat, lng];

    return (
      <div>
        <Map
          onZoom={this.onZoom}
          center={position}
          zoom={zoom}
          zoomControl={false}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {
            markers && markers.length
              ? (
                markers.map((marker, index) => {
                  return (
                    <Marker key={index} position={[marker.lat, marker.lng]}>
                      <Popup>
                        { marker.label }
                      </Popup>
                    </Marker>
                  );
                })
              )
              : null
          }

          <ZoomControl
            zoomIn={this.onZoomIn}
            zoomOut={this.onZoomOut}
          />
        </Map>
      </div>
    )
  }
}

LocationSelector.propTypes = {
  markers: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
};

const withStyle = withStyles(styles)(LocationSelector);

export default withStyle
