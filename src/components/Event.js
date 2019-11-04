import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactGa from 'react-ga';
import Countdown from './Countdown';
import Content from './Content';
import Tags from './Tags';
import Link from './Link';
import Video from './Video';

ReactGa.initialize('UA-110451547-1');

const Event = function Event(props) {
  const time = moment(props.event.acf.date, 'M/D/YY h:mm a');
  const buttons = [];
  const slug = props.event.slug;
  if (props.event.acf.youtube_url) {
    buttons.push({ name: 'Video', url: `/events/${slug}/video` });
  }
  if (props.event.acf.map_embed) {
    buttons.push({ name: 'Map', url: `/events/${slug}/map` });
  }
  // if (props.event.acf.facebook_album_url) {
  //   buttons.push({ name: 'Photos', url: `/events/${slug}/photos` });
  // }
  if (props.event.acf.results_url) {
    buttons.push({ name: 'Results', url: props.event.acf.results_url });
  }
  let imgSrc = false;
  try {
    imgSrc = props.event.acf.feature_image.sizes.medium;
  } catch (e) {
    /* eslint-disable */
    console.error(e);
    /* eslint-enable */
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
            label: props.event.title.rendered,
          });
        }}
      >
        {button.name}
      </Link>
    );
  })
  return (
    <>
    <Content
      title={props.event.title.rendered}
      background={props.event.acf.background.sizes.large}
    >
      <div className="grid-x align-middle align-center">
        <div className="cell shrink text-center">
          <div className="event__date">
            {time.format('dddd Do MMM YYYY')}
          </div>
          <Countdown time={time} />
          <Tags tags={props.event.acf.tags} />
        </div>
        <div className="cell shrink">
          <img
            className="event__image"
            src={imgSrc}
            alt=""
          />
        </div>
      </div>
      <div className="expanded button-group event__buttons stacked-for-small">
        {!!props.event.acf.registration_url &&
          <a
            className="button large"
            href={props.event.acf.registration_url}
            target="_blank"
            onClick={() => {
              ReactGa.event({
                category: 'Event',
                action: 'Visited register site',
                label: props.event.title.rendered,
              });
            }}
          >
            Register now
          </a>
        }
        {buttonMarkup}
      </div>
      {/* eslint-disable react/no-danger */}
      <p dangerouslySetInnerHTML={{ __html: props.event.content.rendered }} />
    </Content>
    {!!props.event.acf.youtube_url &&
      <Video
        data={props.event}
      />
    }
  </>
  );
};

Event.propTypes = {
  event: PropTypes.object.isRequired,
};

export default Event;
