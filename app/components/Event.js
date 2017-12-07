import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactGa from 'react-ga';
import Countdown from './Countdown';

ReactGa.initialize('UA-110451547-1');

const Event = function Event(props) {
  const time = moment(props.data.acf.date, 'M/D/YY h:mm a');
  return (
    <div>
      <div className="grid-x grid-margin-x grid-margin-y align-bottom">
        <div className="medium-6 cell medium-text-right">
          <h2 className="event__title">
            #{props.data.title.rendered}
          </h2>
          <div className="event__date">
            {time.format('DD.MM.YYYY')}
          </div>
          <Countdown time={time} />
        </div>
        {!!props.data.acf.registration_url &&
          <div className="medium-6 cell">
            <a
              className="button large alert"
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
          </div>
        }
      </div>
      <hr />
      <div className="grid-x grid-padding-x grid-padding-y align-top">
        <div className="medium-6 cell medium-text-right">
          <img
            className="event__image"
            src={props.data.acf.feature_image.sizes.medium}
            alt=""
          />
        </div>
        <div className="medium-6 cell">
          {/* eslint-disable react/no-danger */}
          <p dangerouslySetInnerHTML={{ __html: props.data.content.rendered }} />
        </div>
      </div>
    </div>
  );
};

/* eslint-disable react/forbid-prop-types */
Event.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Event;
