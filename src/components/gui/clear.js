export const clear = gui => {
  if (gui) {
    gui.destroy();
  }

  gui = new dat.GUI();
  gui.open();

  return gui;
};
