import React, { Component } from 'react';
import PropTypes from 'prop-types';
import svgs from './Svgs';

export default class Tags extends Component {

  render() {
    const tags = this.props.tags.map(tag => svgs[tag.name]({ fill: this.props.color }));
    return (
      <div className="tags">
        {tags}
      </div>
    );
  }

}

Tags.propTypes = {
  tags: PropTypes.array.isRequired,
  color: PropTypes.string
};

Tags.defaultProps = {
  color: '#ffffff'
};
