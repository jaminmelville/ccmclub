import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tags extends Component {

  render() {
    const tags = this.props.tags.map(tag => (
      <img
        className="tags__item"
        key={tag.term_id}
        title={tag.name}
        src={`https://s3-ap-southeast-2.amazonaws.com/ccmclub/manual/${tag.name}-icon.png`}
        alt=""
      />
    ));
    return (
      <div className="tags">
        {tags}
      </div>
    );
  }

}

/* eslint-disable react/forbid-prop-types */
Tags.propTypes = {
  tags: PropTypes.array.isRequired,
};
