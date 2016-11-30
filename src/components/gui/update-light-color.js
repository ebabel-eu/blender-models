export const updateLightColor = (light, input) => {
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
};
