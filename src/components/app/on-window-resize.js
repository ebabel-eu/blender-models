export const OnWindowResize = (camera, renderer) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  console.log(`${window.innerWidth} x ${window.innerHeight}`);

  renderer.setSize(window.innerWidth, window.innerHeight);
};

//import debounce from 'lodash.debounce';
//var debounce = require('lodash.debounce');
