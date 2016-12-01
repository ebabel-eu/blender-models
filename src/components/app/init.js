import * as C from '../../constants';
import { OnWindowResize } from './on-window-resize';

export const Init = (scene, renderer, camera, controls, light, stats) => {
  scene.fog = new THREE.FogExp2(C.FOG_COLOR, C.FOG_DENSITY);

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

  controls.enableDamping = true;
  controls.dampingFactor = 0.75;
  controls.enableZoom = true;

  // Light.
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
  const shadowCamera = new THREE.CameraHelper(light.shadow.camera);
  scene.add(shadowCamera);

  // Stats.
  container.appendChild(stats.dom);

  // Handle windows resize.
  window.addEventListener('resize', () => OnWindowResize(camera, renderer), false);
};
