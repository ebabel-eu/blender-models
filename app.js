if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var stats;

var camera, controls, scene, renderer;

init();
animate();

var loader = new THREE.JSONLoader();

var loaderCallback = function (geometry, materials) {
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var object = new THREE.Mesh(geometry, material);
  scene.add(object);
};

loader.load('./models/chessboard.json', loaderCallback);
loader.load('./models/rook.json', loaderCallback);
loader.load('./models/knight.json', loaderCallback);
loader.load('./models/bishop.json', loaderCallback);
loader.load('./models/king.json', loaderCallback);
loader.load('./models/queen.json', loaderCallback);
loader.load('./models/pawn.json', loaderCallback);

function init() {
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x7ec0ee, 0.002 );

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( scene.fog.color );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  var container = document.getElementById( 'container' );
  container.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 55;

  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = false;

  // Lights.
  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1, 1, 1 );
  scene.add( light );
  light = new THREE.DirectionalLight( 0x002288 );
  light.position.set( -1, -1, -1 );
  scene.add( light );
  light = new THREE.AmbientLight( 0x222222 );
  scene.add( light );

  // Stats.
  stats = new Stats();
  container.appendChild( stats.dom );

  // Handle windows resize.
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
