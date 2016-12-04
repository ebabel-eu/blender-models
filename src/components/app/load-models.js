import Data from './data';

const jsonLoader = new THREE.JSONLoader();
const textureLoader = new THREE.TextureLoader();

const plainMaterial = (model, scene) => {
  const material = new THREE.MeshLambertMaterial({
    color: model.m,
    shading: THREE.FlatShading,
  });

  createMesh(material, model, scene);
};

const uvTexture = (model, scene) => {
  textureLoader.load(
    model.t,
    texture => {
      const material = new THREE.MeshLambertMaterial({
        shading: THREE.FlatShading,
        map: texture,
      });

      createMesh(material, model, scene);
    },
    xhr => console.log(`${model.t} ${xhr.loaded / xhr.total * 100}% loaded`),
    xhr => console.error(`${model.t} failed to load.`),
  );
};

const createMesh = (material, model, scene) => {
  jsonLoader.load(model.g, (geometry, materials) => {
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(model.x || 0, model.y || 0, model.z || 0);
    mesh.rotation.set(model.rx || 0, model.ry || 0, model.rz || 0);
    mesh.scale.set(model.sx || 1, model.sy || 1, model.sz || 1);

    mesh.castShadow = model.cs;
    mesh.receiveShadow = model.rs;

    scene.add(mesh);
  });
};

export const LoadModels = scene =>
  Data.models.map(model =>
    model.t ? uvTexture(model, scene) : plainMaterial(model, scene));
