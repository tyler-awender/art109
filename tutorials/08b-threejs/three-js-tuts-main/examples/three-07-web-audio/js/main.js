

/* Set up for the shader tutorial pt 2 by Suboptimal Engineer

LINK: https://youtu.be/dRo7SnOJlEM?feature=shared

Comment in/out Sections of code from lines 134 - 280 as you follow along with video

When you are done, choose one shader and experiment with changing the values to create your own!

Note values need to be floats not integers: this means they NEED a decimal place, eg. 1.0 instead of 1

 */


//~~~~~~~Import Three.js (also linked to as an import map in the HTML)~~~~~~
import * as THREE from 'three';


// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';

// import Stats from 'https://unpkg.com/three@0.162.0/examples/jsm/libs/stats.module.js';

// import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models


// ~~~~~~~~~~~~~~~~~ Global Variables ~~~~~~~~~~~~~~~~ //
// NOTE: Camera params;
let fov = 45;
let nearPlane = 1;
let farPlane = 1000;

// NOTE: Additional components.
let clock = undefined;
let stats = undefined;



// ~~~~~~~~~~~~~~~~Set up scene, camera, + renderer~~~~~~~~~~~~~~~~

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);

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
// const axesHelper = new THREE.AxesHelper(16);
// scene.add(axesHelper);

clock = new THREE.Clock();
// stats = Stats();
// document.body.appendChild(stats.dom);

// ~~~~~~~~~~~~~~~~Position Camera~~~~~~~~~~~~~~~~
// 50m back since cube is 16m
camera.position.z = 50;



const uniformData = {
    u_time: {
        type: 'f',
        value: clock.getElapsedTime(),
    },
};
const render = () => {
    uniformData.u_time.value = clock.getElapsedTime();
    window.requestAnimationFrame(render);
};
render();



// >>> ◼️◼️◼️ START glsl shader with uniform variables
const boxGeometry = new THREE.BoxGeometry(30, 10, 24, 24, 4, 24);
const boxMaterial = new THREE.ShaderMaterial({
  wireframe: true,
  uniforms: uniformData,
  vertexShader: `
  uniform float u_time;

  void main()	{
    vec4 result;

    // re-write boiler plate code with shader
    // result = vec4(position.x, position.y, position.z, 1.0);
    result = vec4(position.x, position.y + sin(u_time), position.z, 1.0);

    // convert box into a 2D sine wave plane
    result = vec4(position.x, sin(position.z), position.z, 1.0);
    // result = vec4(position.x, sin(position.z + u_time), position.z, 1.0);

    // change the 2D sine wave plane into a wavy box
    // result = vec4(position.x, sin(position.z) + position.y, position.z, 1.0);
    // result = vec4(position.x, sin(position.z + u_time) + position.y, position.z, 1.0);

    // change how wavy the box is by updating frequency
    // result = vec4(position.x, sin(position.z/4.0) + position.y, position.z, 1.0);
    // result = vec4(position.x, sin((position.z)/4.0 + u_time) + position.y, position.z, 1.0);

    // change the amplitude of the box's waves
    // result = vec4(position.x, 4.0*sin(position.z/4.0) + position.y, position.z, 1.0);
    // result = vec4(position.x, 4.0*sin(position.z/4.0 + u_time) + position.y, position.z, 1.0);

    gl_Position = projectionMatrix
      * modelViewMatrix
      * result;
  }
  `,
  fragmentShader: `
  uniform float u_time;
  void main() {
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    // gl_FragColor = vec4(sin(u_time), 0.0, 0.0, 1.0);
    gl_FragColor = vec4(abs(sin(u_time)*0.5), 0.0, 1.0, 1.0);
  }
  `,
});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(boxMesh);



  


// ~~~~~~~~~~~~~~~~ Animation Loop ~~~~~~~~~~~~~~~~
// (similar to draw loop in p5.js, updates every frame)

function animate() {
    requestAnimationFrame(animate); // start loop by with frame update

    // →→→→→→ add your animation here ↓↓↓↓

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
     boxMesh.rotation.x += .005;
     boxMesh.rotation.y += .005;



    // always end animation loop with renderer
    renderer.render(scene, camera);
}

animate(); // execute animation function
