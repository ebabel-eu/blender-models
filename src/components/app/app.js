import React, { Component } from 'react';

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

const stats = new Stats();
const camera =  new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
const loader = new THREE.JSONLoader();
let controls;
let scene;
let renderer;
let light;

// Dat GUI
let gui;
let guiElements;
const param = {color: '0xffffff'};

const clearGui = () => {
  if ( gui ) gui.destroy();
  gui = new dat.GUI();
  gui.open();
}

const buildGui = () => {
  clearGui();

  addGui('light color', light.color.getHex(), val => {
    light.color.setHex(val);
    threeRender();
  }, true);

  addGui('light intensity', light.intensity, val => {
    light.intensity = val;
    threeRender();
  }, false, 0, 5);

  addGui('light distance', light.distance, val => {
    light.distance = val;
    threeRender();
  }, false, 100, 500);

  addGui('light penumbra', light.penumbra, val => {
    light.penumbra = val;
    threeRender();
  }, false, 0, 1);

  addGui('light decay', light.decay, val => {
    light.decay = val;
    threeRender();
  }, false, 0, 10);

  addGui('light x', light.position.x, val => {
    light.position.x = val;
    threeRender();
  }, false, -80, 80);

  addGui('light y', light.position.y, val => {
    light.position.y = val;
    threeRender();
  }, false, -80, 80);

  addGui('light z', light.position.z, val => {
    light.position.z = val;
    threeRender();
  }, false, -80, 80);

}

const addGui = (name, value, callback, isColor, min, max) => {
  let node;
  param[name] = value;

  if (isColor) {
    node = gui.addColor(param, name).onChange(() => {
      callback(param[name]);
    });
  } else if (typeof value == 'object') {
    node = gui.add(param, name, value).onChange(() => {
      callback(param[name]);
    });
  } else {
    node = gui.add(param, name, min, max).onChange(() => {
      callback(param[name]);
    });
  }

  return node;
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
  light.position.set(10, 41, -2);
  light.castShadow = true;
  light.angle = Math.PI / 4;
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
