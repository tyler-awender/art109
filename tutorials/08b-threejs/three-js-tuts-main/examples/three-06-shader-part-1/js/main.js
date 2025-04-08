
/* Set up for the shader tutorial by Suboptimal Engineer

LINK: https://youtu.be/EntBBM6nqQA?feature=shared

Comment in/out sections of shader code from lines 81-122 as you follow along with video

- Note: Axes helper enabled to visualize x, y, and z coordinates 

 */


//~~~~~~~Import Three.js (also linked to as an import map in the HTML)~~~~~~
import * as THREE from 'three';


// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';

// import Stats from 'https://unpkg.com/three@0.162.0/examples/jsm/libs/stats.module.js';

// import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models



// ~~~~~~~~~~~~~~~~Set up scene, camera, + renderer~~~~~~~~~~~~~~~~

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// ~~~~~~~~~~~~~~~~ Add Lights ~~~~~~~~~~~~~~~~

// ambient light which is for the whole scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
ambientLight.castShadow = true;
scene.add(ambientLight);

// directional light - parallel sun rays
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.castShadow = true;
directionalLight.position.set(0, 32, 64);
scene.add(directionalLight);


// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~

const controls = new OrbitControls(camera, renderer.domElement);
// const loader = new GLTFLoader(); // to load 3d models

// ~~~~> add axes helper to visualize x, y, and z coordinates
const axesHelper = new THREE.AxesHelper(16);
scene.add(axesHelper);



// ~~~~~~~~~~~~~~~~Position Camera~~~~~~~~~~~~~~~~
// 50m back since cube is 16m
camera.position.z = 50;



// ~~~~~~~~~~ Create Geometry ~~~~~~~~~~~~~~~~

// -----> boilerplate starter code for tut

// const boxGeometry = new THREE.BoxGeometry(16, 16, 16, 16, 16, 16); // with radius of 16m and 16 segmented faces along each side of the box

// const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, wireframe: true, }); // red wireframe

// const cube = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(cube);



// -----> Box with Shader Material Added

const boxGeometry = new THREE.BoxGeometry(16, 16, 16, 16, 16, 16); // with 16 segmented faces along each side of the box

// Material changed to ShaderMaterial with various shaders written in GLSL
// Note if you want to change numbers they need to be have a decimal eg. 1.0 (floats only, no integers)

const boxMaterial = new THREE.ShaderMaterial({
    wireframe: true, vertexShader:
        `void main() {
        
        // Comment out the various gl_Position lines below to see effects of different shaders

        gl_Position = projectionMatrix
          * modelViewMatrix
          * vec4(position.x, position.y, position.z, 1.0);

        // gl_Position = projectionMatrix
        //   * modelViewMatrix
        //   * vec4(position.x, sin(position.z), position.z, 1.0);
          
        // gl_Position = projectionMatrix
        //   * modelViewMatrix
        //   * vec4(position.x, sin(position.z) + position.y, position.z, 1.0);

        // gl_Position = projectionMatrix
        //   * modelViewMatrix
        //   * vec4(position.x, sin(position.z/4.0) + position.y, position.z, 1.0);

        // gl_Position = projectionMatrix
        //   * modelViewMatrix
        //   * vec4(position.x, 4.0*sin(position.z/4.0) + position.y, position.z, 1.0);
}`,
    fragmentShader:
        `void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }`,
}); 


const cube = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(cube);




// ~~~~~~~~~~~~~~~~ Animation Loop ~~~~~~~~~~~~~~~~
// (similar to draw loop in p5.js, updates every frame)

function animate() {
    requestAnimationFrame(animate); // start loop by with frame update

    // →→→→→→ add your animation here ↓↓↓↓

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;



    // always end animation loop with renderer
    renderer.render(scene, camera);
}

animate(); // execute animation function
