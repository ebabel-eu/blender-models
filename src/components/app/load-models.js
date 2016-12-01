import Data from './data';

export const LoadModels = scene => {
  const jsonLoader = new THREE.JSONLoader();

  Data.models.map(model => {
    jsonLoader.load(model.g, (geometry, materials) => {
      const material = new THREE.MeshLambertMaterial({
        color: model.m,
        shading: THREE.FlatShading,
      });

      const object = new THREE.Mesh(geometry, material);

      object.position.set(model.x || 0, model.y || 0, model.z || 0);
      object.rotation.set(model.rx || 0, model.ry || 0, model.rz || 0);

      object.castShadow = model.cs;
      object.receiveShadow = model.rs;

      scene.add(object);
    });
  });
};
