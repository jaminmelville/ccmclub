import React from 'react';
import PropTypes from 'prop-types';

const Map = function Map(props) {
  const mid = props.data.acf.map_embed.match(/mid=([^&]*)/)[1];
  return (
    <iframe
      className="map"
      src={`https://www.google.com/maps/d/embed?mid=${mid}`}
      title="map"
    />
  );
};

/* eslint-disable react/forbid-prop-types */
Map.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Map;
