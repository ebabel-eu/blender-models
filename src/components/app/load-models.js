import Data from './data';

export const LoadModels = scene => {
  const jsonLoader = new THREE.JSONLoader();

  Data.models.map(model => {
    jsonLoader.load(model.g, (geometry, materials) => {
      const material = new THREE.MeshLambertMaterial({
        color: model.m,
        shading: THREE.FlatShading,
      });

      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(model.x || 0, model.y || 0, model.z || 0);
      mesh.rotation.set(model.rx || 0, model.ry || 0, model.rz || 0);
      mesh.scale.set(model.sx || 1, model.sy || 1, model.sz || 1);

      mesh.castShadow = model.cs;
      mesh.receiveShadow = model.rs;

      scene.add(mesh);
    });
  });
};
