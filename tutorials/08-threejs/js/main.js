// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// ~~~~~~~~~~~~~~~~Set up~~~~~~~~~~~~~~~~
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xfffff, 3);
light.position.set(1, 1, 5);
scene.add(light);



// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader(); // to load 3d models

loader.load(
    './dog_shiny.gltf',
    function (gltf) {
        const dog = gltf.scene;
        scene.add(dog);
    
        dog.position.set(0, 0, 0);
        dog.scale.set(5, 5, 5);
    }

  );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const texture = new THREE.TextureLoader().load('textures/grasslight-big.jpg');
const material = new THREE.MeshStandardMaterial({ map: texture });
const cube = new THREE.Mesh( geometry, material );
const cube2 = new THREE.Mesh( geometry, material );
scene.add( cube, cube2 );

camera.position.z = 5;

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
  }
  renderer.setAnimationLoop( animate );