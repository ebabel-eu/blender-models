import React, { Component } from 'react';

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

const stats = new Stats();
const camera =  new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
let controls;
let scene;
let renderer;
let light;

// JSON data for all models: where to load their geometry and what their material is.
// @g: geometry path.
// @m: material color.
// Note: to save storage space, the data is as concise as possible.
const data = {
  models: [
    {
      g: './models/chessboard.json',
      m: 0xf9da94,
    },
    {
      g: './models/rook.json',
      m: 0xff0000,
    },
    {
      g: './models/knight.json',
      m: 0x00ff00,
    },
    {
      g: './models/bishop.json',
      m: 0x0000ff,
    },
    {
      g: './models/king.json',
      m: 0xff00ff,
    },
    {
      g: './models/queen.json',
      m: 0x990099,
    },
    {
      g: './models/pawn.json',
      m: 0x009900,
    },
  ],
};

const loader = new THREE.JSONLoader();

data.models.map(model => {
  loader.load(model.g, (geometry, materials) => {
    const material = new THREE.MeshBasicMaterial({
      color: model.m,
    });

    const object = new THREE.Mesh(geometry, material);

    scene.add(object);
  });
});

function init() {
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x7ec0ee, 0.002 );

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( scene.fog.color );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  const container = document.getElementById( 'container' );
  container.appendChild( renderer.domElement );

  camera.position.z = 55;

  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = false;

  // Lights.
  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1, 1, 1 );
  scene.add( light );
  light = new THREE.DirectionalLight( 0x002288 );
  light.position.set( -1, -1, -1 );
  scene.add( light );
  light = new THREE.AmbientLight( 0x222222 );
  scene.add( light );

  // Stats.
  container.appendChild( stats.dom );

  // Handle windows resize.
  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );

  controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true

  stats.update();

  threeRender();
}

function threeRender() {
  renderer.render(scene, camera);
}

import Info from '../info/info';
import './app.scss';

export default class App extends Component {
  componentDidMount() {
    init();
    animate();
  }

  render() {
    return (
      <div id="container">
        <Info />
      </div>
    );
  }
}
