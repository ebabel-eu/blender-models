import React, { Component } from 'react';

import * as C from '../../constants';
import Info from '../info/info';
import { Init } from './init';
import { Gui } from '../gui/gui';
import { WebglSupport } from '../webgl-support/webgl-support';
import Data from './data';

const stats = new Stats();
const camera =  new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
const loader = new THREE.JSONLoader();
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const controls = new THREE.OrbitControls(camera, renderer.domElement);
const light = new THREE.SpotLight(C.LIGHT_COLOR, C.LIGHT_INTENSITY);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.animate = this.animate.bind(this);
  }

  threeRender() {
    renderer.render(scene, camera);
  }

  animate() {
    requestAnimationFrame(this.animate);
    controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
    stats.update();

    this.threeRender();
  }

  componentDidMount() {
    WebglSupport();

    Init(scene, renderer, camera, controls, light, stats);

    Data.models.map(model => {
      loader.load(model.g, (geometry, materials) => {
        const material = new THREE.MeshLambertMaterial({
          color: model.m,
          shading: THREE.FlatShading,
        });

        const object = new THREE.Mesh(geometry, material);

        object.position.set(model.x || 0, model.y || 0, model.z || 0);
        object.rotation.set(model.rx || 0, model.ry || 0, model.rz || 0);

        object.castShadow = model.cs;
        object.receiveShadow = model.rs;

        scene.add(object);
      });
    });

    this.animate();

    Gui(scene, light);
  }

  render() {
    return (
      <div id="container" className="disable-select">
        <Info />
      </div>
    );
  }
}
