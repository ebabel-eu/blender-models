import * as C from '../../constants';
import { clear } from './clear';
import { updateLightColor } from './update-light-color';
import { updateLight } from './update-light';

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
    .onChange(input => updateLight(light, input, 'intensity'));

  lightFolder
    .add(lightController, 'distance', 100, 500, 10)
    .name('Distance')
    .onChange(input => updateLight(light, input, 'distance'));

  lightFolder
    .add(lightController, 'decay', 0, 10, 0.01)
    .name('Decay')
    .onChange(input => updateLight(light, input, 'decay'));

  lightFolder
    .add(lightController, 'positionX', -80, 80, 0.1)
    .name('x')
    .onChange(input => updateLight(light.position, input, 'x'));

  lightFolder
    .add(lightController, 'positionY', 10, 80, 0.1)
    .name('y')
    .onChange(input => updateLight(light.position, input, 'y'));

  lightFolder
    .add(lightController, 'positionZ', -20, 80, 0.1)
    .name('z')
    .onChange(input => updateLight(light.position, input, 'z'));

  // Standalone gui control.
  gui
    .add(scene.fog, 'density', 0.01, 0.05, 0.001)
    .name('Fog');

  return lightController;
};
