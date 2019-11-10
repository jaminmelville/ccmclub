import React, { Component } from 'react';
import classNames from 'classnames';
import L from 'leaflet';
import axios from 'axios';
import async from 'async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import svgs from './Svgs';
import Content from './Content';


class OnamissionMap extends Component {

  state = {
    position: 0.0,
    playing: true,
    stages: [
      {
        latlngs: [],
        elevations: [],
        svg: svgs.bike,
        id: 1,
        title: 'Bike stage',
        distance: '23km',
      },
      {
        latlngs: [],
        elevations: [],
        svg: svgs.kayak,
        id: 2,
        title: 'Kayak to Dunk stage',
        distance: '4km',
      },
      {
        latlngs: [],
        elevations: [],
        svg: svgs.run,
        id: 3,
        title: 'Run on Dunk stage',
        distance: '6km',
      },
      {
        latlngs: [],
        elevations: [],
        svg: svgs.kayak,
        id: 4,
        title: 'Kayak to Mainland stage',
        distance: '4km',
      },
      {
        latlngs: [],
        elevations: [],
        svg: svgs.run,
        id: 5,
        title: 'Mainland run stage',
        distance: '7km',
      },
    ],
  }

  polylines = []

  componentDidMount() {
    const tasks = {};
    this.state.stages.map((stage) => {
      tasks[stage.id] = cb => axios
        .get(`${process.env.PUBLIC_URL}/geojson/${stage.id}.geojson`)
        .then(data => cb(null, data.data.features[0].geometry.coordinates[0]));
    });
    async.parallel(tasks, (err, result) => {
      const stages = this.state.stages.map((stage) => {
        return {
          ...stage,
          latlngs: result[stage.id].map(c => [c[1], c[0]]),
          elevations: result[stage.id].map(c => c[2]),
        };
      });
      this.setState({
        stages,
      }, this.createMap);
    });
  }

  createMap = () => {
    this.map = L.map(this.element, {
      center: [-17.915, 146.105],
    });
    this.map.fitBounds([
      [-17.8545651, 146.049592],
      [-17.972847, 146.1826398],
    ]);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    this.state.stages.forEach((stage) => {
      this.polylines[stage.id] = L.polyline([]).addTo(this.map);
    });
      // @TODO: map.fitBounds(polyline.getBounds());
    this.play();
  }

  updatePolylines = () => {
    let position = this.state.position += 0.002;
    if (position > 1) {
      position = 0;
    }
    let currentStage = this.state.stages[0];
    this.state.stages.forEach((stage, index) => {
      let latLngs = []
      let style = { color: 'black' };
      if (position > (index + 1) / this.state.stages.length) {
        latLngs = stage.latlngs;
      } else {
        const percent = (position - index / this.state.stages.length) * this.state.stages.length;
        if (percent > 0) {
          const numberToShow = parseInt( stage.latlngs.length * percent);
          latLngs = stage.latlngs.slice(0, numberToShow);
          style = { color: '#ff6d22' };
          currentStage = stage;
        }
      }
      this.polylines[stage.id].setStyle(style);
      this.polylines[stage.id].setLatLngs(latLngs);
    });
    this.setState({ position, currentStage });
  }

  play = () => {
    this.setState({ playing: true });
    this.interval = setInterval(this.updatePolylines, 50);
  }

  pause = () => {
    this.setState({ playing: false });
    clearInterval(this.interval);
  }

  componentWillUnmount() {
    this.pause();
    this.map.remove();
  }

  render() {
    const stageOverviews = this.state.stages.map((stage, index) => (
      <li
        key={stage.id}
        title={stage.title}
        className="onamission-map__stage-container"
        onClick={() => {
          this.setState({ position: parseFloat(index / this.state.stages.length) }, this.updatePolylines);
        }}
      >
        {stage.svg({ fill: stage === this.state.currentStage ? '#ff6d22' : '#ffffff' })}
        <div className={classNames({ 'onamission-map__stage--active': this.state.currentStage === stage })}>
          {stage.distance}
        </div>
      </li>
    ))
    return (
      <Content
        title="map"
        id="map"
        background="https://s3-ap-southeast-2.amazonaws.com/ccmclub/manual/map.jpg"
      >
        <div className="onamission-map">
          <div className="flex-container margin-bottom-2">
            <ul className="flex-container flex-dir-column align-spaced padding-horizontal-2">
              {stageOverviews}
            </ul>
            <div className="responsive-embed widescreen onamission-map__container">
              <div ref={e => this.element = e} />
            </div>
          </div>
          <div className="flex-container">
            <button
              onClick={() => {
                if (this.state.playing) {
                  this.pause();
                } else {
                  this.play();
                }
              }}
              className="hollow button margin-horizontal-2"
            >
              {this.state.playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
            </button>
            <div className="onamission-map__slider">
              <input
                id="sliderOutput"
                type="range"
                max="1"
                min="0"
                step="0.001"
                onChange={(e) => {
                  this.setState({ position: parseFloat(e.target.value)}, this.updatePolylines);
                }}
                value={this.state.position}
              />
            </div>
          </div>
        </div>
      </Content>
    );
  }

}

export default OnamissionMap;
