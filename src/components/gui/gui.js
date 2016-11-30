import * as C from '../../constants';
import { clear } from './clear';
import { updateLightColor } from './update-light-color';

export const Gui = (scene, light, gui) => {
  gui = clear(gui);

  const lightFolder = gui.addFolder('Light');

  const lightController = {
    color: light.color.getHex(),
    intensity: light.intensity,
    distance: light.distance,
    decay: light.decay,
    positionX: light.position.x,
    positionY: light.position.y,
    positionZ: light.position.z,
  };

  lightFolder
    .addColor(lightController, 'color', C.LIGHT_COLOR)
    .name('Color')
    .onChange(input => updateLightColor(light, input));

  lightFolder
    .add(lightController, 'intensity', 0, 5, 0.01)
    .name('Intensity')
    .onChange(updateLightIntensity);

  lightFolder
    .add(lightController, 'distance', 100, 500, 10)
    .name('Distance')
    .onChange(updateLightDistance);

  lightFolder
    .add(lightController, 'decay', 0, 10, 0.01)
    .name('Decay')
    .onChange(updateLightDecay);

  lightFolder
    .add(lightController, 'positionX', -80, 80, 0.1)
    .name('x')
    .onChange(updateLightPosition);

  lightFolder
    .add(lightController, 'positionY', 10, 80, 0.1)
    .name('y')
    .onChange(updateLightPosition);

  lightFolder
    .add(lightController, 'positionZ', -20, 80, 0.1)
    .name('z')
    .onChange(updateLightPosition);

  // Standalone gui control.
  gui
    .add(scene.fog, 'density', 0.01, 0.05, 0.001)
    .name('Fog');

  return lightController;
};
