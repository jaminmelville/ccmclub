import React from 'react';
import PropTypes from 'prop-types';
import '../vendor/multi-style-layer.js';
import L from 'leaflet';
import json_Track_2 from '../data/Track_2';
import json_Points_3 from '../data/Points_3';

export default class MtbPark extends React.Component {

  componentDidMount() {
    var map = L.map(this.element, {
      zoomControl:true,
      maxZoom:28,
      minZoom:1
    })
    var bounds_group = new L.featureGroup([]);
    function setBounds() {
      if (bounds_group.getLayers().length) {
        map.fitBounds(bounds_group.getBounds());
      }
    }
    var layer_Map_0 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 1.0,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

    map.addLayer(layer_Map_0);
    var layer_Drone_1 = L.tileLayer('https://d2vfiwcrwiq34w.cloudfront.net/mtb-park/{z}/{x}/{y}.png', {
      opacity: 1.0,
      maxNativeZoom: 23,
      maxZoom: 28,
      attribution: '&copy; <a href="https://www.orrbodies.com/">Orr & Associates</a>',
    });

    map.addLayer(layer_Drone_1);
    function style_Track_2_0() {
      return {
        pane: 'pane_Track_2',
        opacity: 1,
        color: 'rgba(0,0,0,1.0)',
        dashArray: '',
        lineCap: 'round',
        lineJoin: 'round',
        weight: 8.0,
        fillOpacity: 0,
      }
    }
    function style_Track_2_1() {
      return {
        pane: 'pane_Track_2',
        opacity: 1,
        color: 'rgba(255,109,34,1.0)',
        dashArray: '',
        lineCap: 'round',
        lineJoin: 'round',
        weight: 6.0,
        fillOpacity: 0,
      }
    }
    map.createPane('pane_Track_2');
    map.getPane('pane_Track_2').style.zIndex = 402;
    map.getPane('pane_Track_2').style['mix-blend-mode'] = 'normal';
    var layer_Track_2 = new L.geoJson.multiStyle(json_Track_2, {
      attribution: '',
      pane: 'pane_Track_2',
      styles: [style_Track_2_0,style_Track_2_1,]
    });
    bounds_group.addLayer(layer_Track_2);
    map.addLayer(layer_Track_2);
    function style_Points_3_0() {
      return {
        pane: 'pane_Points_3',
        radius: 6.4,
        opacity: 1,
        color: 'rgba(0,0,0,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1.0,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(255,255,255,1.0)',
      }
    }
    function style_Points_3_1() {
      return {
        pane: 'pane_Points_3',
        radius: 1.4,
        opacity: 1,
        color: 'rgba(0,0,0,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 2.0,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(0,0,0,1.0)',
      }
    }
    map.createPane('pane_Points_3');
    map.getPane('pane_Points_3').style.zIndex = 403;
    map.getPane('pane_Points_3').style['mix-blend-mode'] = 'normal';
    var layer_Points_3 = new L.geoJson.multiStyle(json_Points_3, {
      attribution: '',
      pane: 'pane_Points_3',
      pointToLayers: [function (feature, latlng) {
        var context = {
          feature: feature,
          variables: {}
        };
        const marker = L.circleMarker(latlng, style_Points_3_0(feature));
        marker.bindTooltip(feature.properties['Name'] , { permanent: true }).openTooltip();
        return marker;
      },function (feature, latlng) {
        var context = {
          feature: feature,
          variables: {}
        };
        const marker = L.circleMarker(latlng, style_Points_3_1(feature));
        return marker;
      },
    ]});
    bounds_group.addLayer(layer_Points_3);
    map.addLayer(layer_Points_3);
    setBounds();
  }

  render() {
    return (
      <div className="mtb-park">
        <div
          className="mtb-park__map"
          ref={e => this.element = e}
        />
      </div>
    );
  }

}
