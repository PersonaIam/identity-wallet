/**
 * Created by vladtomsa on 09/11/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { geolocated } from 'react-geolocated';
import { withStyles } from '@material-ui/core/styles';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import debounce from 'lodash/debounce';

import AddressDisplay from './AddressDisplay';
import LocationSearch from './LocationSearch';
import ZoomControl from './ZoomControl';

const provider = new OpenStreetMapProvider();

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

  UNSAFE_componentWillReceiveProps(newProps) {
    const {coords} = this.props;

    if (!coords && newProps.coords) {
      const { latitude, longitude } = newProps.coords;

      this.setState(
        { lat: latitude, lng: longitude },
        () => this.onQueryForLocation(this.state),
      );
    }
  }

  componentDidMount() {
    this.onQueryForLocation(this.state)
  }


  onMove = async (event) => {
    const { lat, lng } = event.target.getCenter();

    this.setState({ lat, lng });
  };

  onMoveEnd = debounce(() => {
    this.onQueryForLocation(this.state);
  }, 300);

  onQueryForLocation = async ({ lat, lng }) => {
    const results = await provider.search({ query: `${lat},${lng}` });
    let country = '';
    let address = '';

    if (results && results[0]) {
      const label = results[0].label;
      const labelInfo = label.split(', ');

      country= labelInfo.splice(labelInfo.length - 1, 1)[0];
      address = labelInfo.join(', ');
    }

    this.setState(
      { country, address },
      () => this.props.input.onChange({ address, country, lat, lng }),
    );
  };

  onSearchSubmit = ({ address,  country, lat, lng }) => {
    this.setState(
      { address,  country, lat, lng  },
      () => this.props.input.onChange({ address, country, lat, lng }),
    );
  };

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

  handleClick = (e, xy, y) => {
  };

  render() {
    const { address, country, lat, lng, zoom } = this.state;
    const { t } = this.props;

    const position = [lat, lng];

    return (
      <div>
        <Map
          onClick={this.handleClick}
          onMove={this.onMove}
          onMoveend={this.onMoveEnd}
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
          <Marker position={position}>
            {/*<Popup>*/}
              {/*A pretty CSS3 popup. <br /> Easily customizable.*/}
            {/*</Popup>*/}
          </Marker>

          <ZoomControl
            zoomIn={this.onZoomIn}
            zoomOut={this.onZoomOut}
          />

          <LocationSearch
            onSubmit={this.onSearchSubmit}
            provider={provider}
            t={t}
          />
        </Map>

        <AddressDisplay
          address={address}
          country={country}
          t={t}
        />
      </div>
    )
  }
}

LocationSelector.propTypes = {
  t: PropTypes.func.isRequired,
};

const withStyle = withStyles(styles)(LocationSelector);

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: null,
})(withStyle);
