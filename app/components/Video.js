import React from 'react';
import PropTypes from 'prop-types';

const Video = function Video(props) {
  const id = props.data.acf.youtube_url.match(/v=([^&]*)/)[1];
  return (
    <iframe
      className="video"
      src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&controls=0modestbranding=1&playsinline=1&showinfo=0`}
      allowFullScreen
      title="youtube"
    />
  );
};

/* eslint-disable react/forbid-prop-types */
Video.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Video;
