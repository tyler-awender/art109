// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as an import map in the HTML)~~~~~~
import * as THREE from 'three';


// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models



// ~~~~~~~~~~~~~~~~ Declare Global Variables~~~~~~~~~~~~~~~~
let scene, camera, renderer, cube, torus;


// ~~~~~~~~~~~~~~~~ Initialize Scene in init() ~~~~~~~~~~~~~~~~
function init() {

    // ~~~~~~Set up scene, camera, + renderer ~~~~~~

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    // ~~~~~~ Initiate add-ons ~~~~~~

    const controls = new OrbitControls(camera, renderer.domElement);
    // const loader = new GLTFLoader(); // to load 3d models



    // ~~~~~~ Create Geometry ~~~~~~

    // Cube
    const geometryCube = new THREE.BoxGeometry(2, 2, 2);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    const textureCube = new THREE.TextureLoader().load('textures/animalPrint-crop-512.png');

    const materialCube = new THREE.MeshBasicMaterial({ map: textureCube });

    cube = new THREE.Mesh(geometryCube, materialCube);
    scene.add(cube);


    // Torus knot
    const geometryTorus = new THREE.TorusKnotGeometry(5, 1, 100, 16);

    // const materialTorus = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // To add texture
    const textureTorus = new THREE.TextureLoader().load('textures/animalPrint-crop-1024.png');
    const materialTorus = new THREE.MeshBasicMaterial({ map: textureTorus });

    torus = new THREE.Mesh(geometryTorus, materialTorus);
    scene.add(torus);

    // torus.scale.set(.5, .5, .5); // to change scale
    // torus.position.x = 2; // to change position


    // ~~~~~~Position Camera~~~~~~
    camera.position.z = 4;


}



// ~~~~~~~~~~~~~~~~ Animation Loop ~~~~~~~~~~~~~~~~
// (similar to draw loop in p5.js, updates every frame)

function animate() {
    requestAnimationFrame(animate); // start loop by with frame update

    // →→→→→→ add your animation here ↓↓↓↓

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    torus.rotation.x += 0.001;
    torus.rotation.y += 0.001;

    camera.position.z += .025;

    // always end animation loop with renderer
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize, false);

init(); // execute initialize function
animate(); // execute animation function
