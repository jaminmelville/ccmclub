import React from 'react';
import PropTypes from 'prop-types';
import Content from './Content';

const Map = function Map(props) {
  const mid = props.data.acf.map_embed.match(/mid=([^&]*)/)[1];
  return (
    <Content title={`${props.data.title.rendered} Map`} >
      <div className="map">
        <iframe
          className="map__frame"
          src={`https://www.google.com/maps/d/embed?mid=${mid}`}
          title="youtube"
        />
      </div>
    </Content>
  );
};

/* eslint-disable react/forbid-prop-types */
Map.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Map;
