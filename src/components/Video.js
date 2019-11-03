import React from 'react';
import PropTypes from 'prop-types';
import Content from './Content';

const Video = function Video(props) {
  const id = props.data.acf.youtube_url.match(/v=([^&]*)/)[1];
  return (
    <Content title={`${props.data.title.rendered} Video`}>
      <div className="responsive-embed widescreen">
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&controls=0modestbranding=1&showinfo=0`}
          allowFullScreen
          title="youtube"
        />
      </div>
    </Content>
  );
};

/* eslint-disable react/forbid-prop-types */
Video.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Video;
