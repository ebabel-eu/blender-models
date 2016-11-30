// Display a message with a link to old browsers that don't support WebGL.
export const WebglSupport = () => {
  if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
  };
};
