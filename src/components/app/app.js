import React, { Component } from 'react';

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

const stats = new Stats();
const camera =  new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
const loader = new THREE.JSONLoader();
let controls;
let scene;
let renderer;
let light;

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
  light.position.set(15, 40, 35);
  light.castShadow = true;
  light.angle = Math.PI / 4;
  light.penumbra = 0.05;
  light.decay = 2;
  light.distance = 200;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 200;
  scene.add(light);

  // Enable shadow rendering.
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowCameraNear = 3;
  renderer.shadowCameraFar = camera.far;
  renderer.shadowCameraFov = 50;
  renderer.shadowMapBias = 0.0039;
  renderer.shadowMapDarkness = 0.5;
  renderer.shadowMapWidth = 1024;
  renderer.shadowMapHeight = 1024;  

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

const threeRender = () => {
  renderer.render(scene, camera);
}

import Info from '../info/info';
import data from './data';

export default class App extends Component {
  componentDidMount() {
    data.models.map(model => {
      loader.load(model.g, (geometry, materials) => {
        const material = new THREE.MeshLambertMaterial({
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
  }

  render() {
    return (
      <div id="container" className="disable-select">
        <Info />
      </div>
    );
  }
}
