// Update a property of the light object if the input offers a new value.
export const updateLight = (light, input, property) => {
  if (light[property] !== input) {
    light[property] = input;
  }
};
