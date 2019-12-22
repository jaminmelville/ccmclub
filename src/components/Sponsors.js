import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Content from './Content';

export default class Sponsors extends Component {

  state = {
    index: 0
  }

  render() {
    const sortedSponsors = this.props.sponsors.sort((a, b) => Math.sign(b.acf.value - a.acf.value));
    const max = Math.max(...this.props.sponsors.map(sponsor => sponsor.acf.value)) + 1; // Avoiding division by zero.
    let speed;
    const slides = sortedSponsors.map((sponsor, index) => {
      if (index === this.state.index) {
        speed = (parseInt(sponsor.acf.value) + 1) / max * 5000;
      }
      return (
        <a
          key={sponsor.id}
          href={sponsor.acf.link}
          target="_blank"
          className="sponsors__sponsor text-center"
          title={sponsor.acf.name}
        >
          <div className="sponsors__image" style={{ backgroundImage: `url(${sponsor.acf.image.sizes.large})` }} />
        </a>
      )
    });
    return (
      <Content
        title="Sponsors"
        background="https://s3-ap-southeast-2.amazonaws.com/ccmclub/manual/mud.jpg"
      >
        <div>
          <Slider
            autoplay
            arrows
            nextArrow={
              <div>
                <FontAwesomeIcon
                  className="sponsors__arrow sponsors__arrow--next"
                  icon={faChevronRight}
                  size="2x"
                />
              </div>
            }
            prevArrow={
              <div>
                <FontAwesomeIcon
                  className="sponsors__arrow sponsors__arrow--previous"
                  icon={faChevronLeft}
                  size="2x"
                />
              </div>
            }
            beforeChange={(current, next) => this.setState({ index: next })}
            autoplaySpeed={speed}
          >
            {slides}
          </Slider>
        </div>
      </Content>
    );
  }

}

Sponsors.propTypes = {
  sponsors: PropTypes.array.isRequired,
};
