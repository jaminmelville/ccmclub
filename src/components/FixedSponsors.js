import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Content from './Content';

export default class FixedSponsors extends Component {

  state = {
    index: 0
  }

  render() {
    const sortedSponsors = this.props.sponsors.sort((a, b) => Math.sign(b.acf.value - a.acf.value));
    const items = sortedSponsors.map((sponsor) => (
      <a
        key={sponsor.id}
        href={sponsor.acf.link}
        target="_blank"
        rel="noopener noreferrer"
        className="cell small-6 medium-4 large-3"
        title={sponsor.acf.name}
      >
        <div
          style={{
            paddingTop: "100%",
            backgroundImage: `url(${sponsor.acf.image.sizes.large})`,
            backgroundSize: "contain",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat"
          }}
        />
      </a>
    ));
    return (
      <Content
        title="Sponsors"
        background="https://s3-ap-southeast-2.amazonaws.com/ccmclub/manual/mud.jpg"
      >
        <div className="grid-x grid-margin-x grid-margin-y align-center-middle">
          {items}
        </div>
      </Content>
    );
  }

}

FixedSponsors.propTypes = {
  sponsors: PropTypes.array.isRequired,
};
