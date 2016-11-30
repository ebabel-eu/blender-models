import React, { Component } from 'react';

import Info from '../info/info';
import data from './data';
import * as C from '../../constants';


// todo: refactor all the loose code.
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

const stats = new Stats();
const camera =  new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
const loader = new THREE.JSONLoader();
let controls;
let scene;
let renderer;
let light;
let shadowCamera;

// Dat GUI
let gui;
let guiElements;
let lightController;

const clearGui = () => {
  if (gui) {
    gui.destroy();
  }

  gui = new dat.GUI();
  gui.open();
}

const buildGui = () => {
  clearGui();

  const lightFolder = gui.addFolder('Light');

  lightController = {
    color: light.color.getHex(),
    intensity: light.intensity,
    distance: light.distance,
    decay: light.decay,
    positionX: light.position.x,
    positionY: light.position.y,
    positionZ: light.position.z,
  };

  lightFolder.addColor(lightController, 'color', C.LIGHT_COLOR).name('Color').onChange(updateLightColor);
  lightFolder.add(lightController, 'intensity', 0, 5, 0.01).name('Intensity').onChange(updateLightIntensity);
  lightFolder.add(lightController, 'distance', 100, 500, 10).name('Distance').onChange(updateLightDistance);
  lightFolder.add(lightController, 'decay', 0, 10, 0.01).name('Decay').onChange(updateLightDecay);
  lightFolder.add(lightController, 'positionX', -80, 80, 0.1).name('x').onChange(updateLightPosition);
  lightFolder.add(lightController, 'positionY', 10, 80, 0.1).name('y').onChange(updateLightPosition);
  lightFolder.add(lightController, 'positionZ', -20, 80, 0.1).name('z').onChange(updateLightPosition);

  gui.add(scene.fog, 'density', 0.01, 0.05, 0.001).name('Fog');
}

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

  renderer.setSize(window.innerWidth, window.innerHeight);
}

const animate = () => {
  requestAnimationFrame(animate);

  controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true

  stats.update();

  threeRender();
}

const updateLightColor = () => {
  let input = lightController.color;

  switch (typeof input) {
    case 'number':
      light.color.setHex(input);
      break;
    case 'string':
      light.color.setHex(input.replace('#', '0x'));
      break;
    default:
      throw new Error('Unexpected color input.');
  }
}

const updateLightIntensity = () => {
  light.intensity = lightController.intensity;
}

const updateLightDistance = () => {
  light.distance = lightController.distance;
}

const updateLightDecay = () => {
  light.decay = lightController.decay;
}

const updateLightPosition = () => {
  light.position.set(
    lightController.positionX,
    lightController.positionY,
    lightController.positionZ
  );
}

const threeRender = () => {
  renderer.render(scene, camera);
}

export default class App extends Component {
  componentDidMount() {
    data.models.map(model => {
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
    animate();
    buildGui();
  }

  render() {
    return (
      <div id="container" className="disable-select">
        <Info />
      </div>
    );
  }
}
