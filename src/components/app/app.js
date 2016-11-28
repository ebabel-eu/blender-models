import React, { Component } from 'react';

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

  lightFolder.addColor(lightController, 'color', '0xffffff').name('Color').onChange(updateRender);
  lightFolder.add(lightController, 'intensity', 0, 5, 0.01).name('Intensity').onChange(updateRender);
  lightFolder.add(lightController, 'distance', 100, 500, 10).name('Distance').onChange(updateRender);
  lightFolder.add(lightController, 'decay', 0, 10, 0.01).name('Decay').onChange(updateRender);
  lightFolder.add(lightController, 'positionX', -80, 80, 0.1).name('x').onChange(updateRender);
  lightFolder.add(lightController, 'positionY', 10, 80, 0.1).name('y').onChange(updateRender);
  lightFolder.add(lightController, 'positionZ', -20, 80, 0.1).name('z').onChange(updateRender);

  gui.add(scene.fog, 'density', 0.01, 0.05, 0.001).name('Fog');
}

const init = () => {
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x7ec0ee, 0.02);

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(scene.fog.color);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const container = document.getElementById('container');
  container.appendChild(renderer.domElement);

  camera.position.z = 55;

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  // Light.
  light = new THREE.SpotLight(0xffffff, 2);
  light.position.set(-37, 17, -5);
  light.castShadow = true;
  light.angle = Math.PI / 5;
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

const updateRender = () => {
  light.color.setHex(lightController.color);
  light.intensity = lightController.intensity;
  light.distance = lightController.distance;
  light.decay = lightController.decay;

  light.position.set(
    lightController.positionX,
    lightController.positionY,
    lightController.positionZ
  );

  threeRender();
}

const threeRender = () => {
  renderer.render(scene, camera);
}

import Info from '../info/info';
import data from './data';

export default class App extends Component {
  componentDidMount() {
    data.models.map(model => {
      loader.load(model.g, (geometry, materials) => {
        const material = new THREE.MeshPhongMaterial({
          color: model.m,
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
