import React, { Component } from 'react';

import * as C from '../../constants';
import Info from '../info/info';
import { Init } from './init';
import { LoadModels } from './load-models';
import { Gui } from '../gui/gui';
import { WebglSupport } from '../webgl-support/webgl-support';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.stats = new Stats();
    this.camera =  new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.light = new THREE.SpotLight(C.LIGHT_COLOR, C.LIGHT_INTENSITY);

    this.animate = this.animate.bind(this);
  }

  threeRender() {
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.controls.update(); // required if this.controls.enableDamping = true, or if this.controls.autoRotate = true
    this.stats.update();

    this.threeRender();
  }

  componentDidMount() {
    WebglSupport();

    Init(this.scene, this.renderer, this.camera, this.controls, this.light, this.stats);

    LoadModels(this.scene);

    this.animate();

    Gui(this.scene, this.light);
  }

  render() {
    return (
      <div id="container" className="disable-select">
        <Info />
      </div>
    );
  }
}
