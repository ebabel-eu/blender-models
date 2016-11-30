import React, { Component } from 'react';

import * as C from '../../constants';
import Info from '../info/info';
import { Gui } from '../gui/gui';
import { WebglSupport } from '../webgl-support/webgl-support';
import Data from './data';

const stats = new Stats();
const camera =  new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
const loader = new THREE.JSONLoader();
let controls;
let scene;
let renderer;
let light;
let shadowCamera;

// Dat GUI
let lightController;

const init = () => {
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(C.FOG_COLOR, C.FOG_DENSITY);

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(scene.fog.color);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const container = document.getElementById('container');
  container.appendChild(renderer.domElement);

  camera.position.set(
    C.CAMERA_POSITION.X,
    C.CAMERA_POSITION.Y,
    C.CAMERA_POSITION.Z,
  );

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.75;
  controls.enableZoom = true;

  // Light.
  light = new THREE.SpotLight(C.LIGHT_COLOR, C.LIGHT_INTENSITY);
  light.position.set(
    C.LIGHT_POSITION.X,
    C.LIGHT_POSITION.Y,
    C.LIGHT_POSITION.Z,
  );
  light.castShadow = true;
  light.angle = C.LIGHT_ANGLE;
  light.penumbra = 0.39;
  light.decay = 2;
  light.distance = 200;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 200;
  scene.add(light);

  // Enable shadow rendering.
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Shadow camera helper.
  shadowCamera = new THREE.CameraHelper(light.shadow.camera);
  scene.add(shadowCamera);

  // Stats.
  container.appendChild(stats.dom);

  // Handle windows resize.
  window.addEventListener('resize', onWindowResize, false);
}

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  console.log(`${window.innerWidth} x ${window.innerHeight}`);

  renderer.setSize(window.innerWidth, window.innerHeight);
}

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

    init();
    this.animate();

    lightController = Gui(scene, light);
  }

  render() {
    return (
      <div id="container" className="disable-select">
        <Info />
      </div>
    );
  }
}
