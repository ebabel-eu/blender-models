if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var stats;

var camera, controls, scene, renderer;

init();
animate();

function init() {

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setClearColor( scene.fog.color );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  var container = document.getElementById( 'root' );
  container.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 10;

  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  // Load cube JSON model.
  var jsonLoader = new THREE.JSONLoader();
  var textureLoader = new THREE.TextureLoader();

  var loadJsonModel = function (material) {
    jsonLoader.load('./cube.json', function (geometry, materials) {
      var mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(0, 0, 0);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;

      scene.add(mesh);
    });
  };

  textureLoader.load(
    './cube-texture.png',
    function (texture) {
      var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading,
        map: texture
      });

      loadJsonModel(material);
    },
    function (xhr) {
      console.log(xhr.loaded / xhr.total * 100 + '% loaded');
    },
    function (xhr) {
      console.log('An error happened');
    }
  );

  // lights
  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 10, 10);
  scene.add(light);

  light = new THREE.AmbientLight(0xffffff, .7);
  scene.add(light);

  stats = new Stats();
  container.appendChild( stats.dom );

  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );

  controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true

  stats.update();

  render();
}

function render() {
  renderer.render( scene, camera );
}
