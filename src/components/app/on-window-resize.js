import debounce from 'lodash.debounce';

import * as C from '../../constants';

export const OnWindowResize = debounce((camera, renderer) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}, C.DEBOUNCE);
