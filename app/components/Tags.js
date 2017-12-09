import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tags extends Component {

  render() {
    const tags = this.props.tags.map(tag => (
      <img
        className="tags__item"
        key={tag.term_id}
        title={tag.name}
        src={`/wp-content/themes/ccmclub/images/${tag.name}-icon.png}`}
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
