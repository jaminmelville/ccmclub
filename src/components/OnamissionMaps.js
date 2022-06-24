import React, { useState } from 'react';
import Content from './Content';
import OnamissionMap from './OnamissionMap';

export default function OnamissionMaps() {
  const [course, setCourse] = useState('short');
  return (
    <Content
      title="Map Course"
      id="map"
      background="https://s3-ap-southeast-2.amazonaws.com/ccmclub/manual/map.jpg"
    >
      <div className="text-center margin-bottom-2">
        <fieldset className="fieldset">
          <legend>Course</legend>
          {[{id: 'short', label: 'Short (42KM)'}, {id: 'long', label: 'Long (63KM)'}].map((item) => (
            <React.Fragment key={item.id}>
              <input
                type="radio"
                name="course"
                value="short"
                id={item.id}
                checked={course === item.id}
                onChange={() => setCourse(item.id)}
              />
              <label htmlFor="value">{item.label}</label>
            </React.Fragment>
          ))}
        </fieldset>
      </div>
      <OnamissionMap key={course} course={course} />
      <a className="thumbnail" href={`${process.env.PUBLIC_URL}/2020 OAM Course Map.jpg`} target="_blank">
        <img src={`${process.env.PUBLIC_URL}/2020 OAM Course Map thumb.jpg`} />
      </a>
      <div className="cell small-4">Click on the image to view full size</div>
    </Content>
  );
}
