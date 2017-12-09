import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactGa from 'react-ga';
import Countdown from './Countdown';
import Content from './Content';
import Tags from './Tags';
import Link from './Link';

ReactGa.initialize('UA-110451547-1');

const Event = function Event(props) {
  const time = moment(props.data.acf.date, 'M/D/YY h:mm a');
  const buttons = [];
  const slug = props.data.slug;
  if (props.data.acf.youtube_url) {
    buttons.push({ name: 'Video', url: `/events/${slug}/video` });
  }
  if (props.data.acf.map_embed) {
    buttons.push({ name: 'Map', url: `/events/${slug}/map` });
  }
  if (props.data.acf.facebook_album_url) {
    buttons.push({ name: 'Photos', url: `/events/${slug}/photos` });
  }
  if (props.data.acf.results_url) {
    buttons.push({ name: 'Results', url: props.data.acf.results_url });
  }
  const buttonMarkup = buttons.map((button) => {
    return (
      <Link
        key={button.name}
        className="button hollow large"
        url={button.url}
        onClick={() => {
          ReactGa.event({
            category: 'Event',
            action: `${button.name} pressed`,
            label: props.data.title.rendered,
          });
        }}
      >
        {button.name}
      </Link>
    );
  })
  return (
    <Content title={props.data.title.rendered}>
      <div className="grid-x align-middle align-center">
        <div className="cell shrink text-center">
          <div className="event__date">
            {time.format('dddd do MMM YYYY')}
          </div>
          <Countdown time={time} />
          <Tags tags={props.data.acf.tags} />
        </div>
        <div className="cell shrink">
          <img
            className="event__image"
            src={props.data.acf.feature_image.sizes.medium}
            alt=""
          />
        </div>
      </div>
      <div className="expanded button-group event__buttons stacked-for-small">
        {!!props.data.acf.registration_url &&
          <a
            className="button large"
            href={props.data.acf.registration_url}
            target="_blank"
            onClick={() => {
              ReactGa.event({
                category: 'Event',
                action: 'Visited register site',
                label: props.data.title.rendered,
              });
            }}
          >
            Register now
          </a>
        }
        {buttonMarkup}
      </div>
      {/* eslint-disable react/no-danger */}
      <p dangerouslySetInnerHTML={{ __html: props.data.content.rendered }} />
    </Content>
  );
};

/* eslint-disable react/forbid-prop-types */
Event.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Event;
