/* Doggo loves ball!
1. Scene is parented to a div with id scene-container --- added <div id="scene-container"><div> to HTML
2. Event listeners for mouse events added above animation() loop
    - Tail animation starts / pauses with mousedown and mouse up
    - Ball spins when mouse is dragged
*/


//~~~~~~~Import Three.js (also linked to as an import map in the HTML)~~~~~~
import * as THREE from 'three';


// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models



// ~~~~~~~~~~~~~~~~ Declare Global Variables~~~~~~~~~~~~~~~~
let scene, camera, renderer, ball, dog, mixer;

// Animation variables
let actionPant, actionTail;


// ~~~~~~~~~~~~~~~~ Initialize Scene in init() ~~~~~~~~~~~~~~~~
function init() {

    // ~~~~~~Set up scene, camera, + renderer ~~~~~~
    scene = new THREE.Scene();

    // change scene background color
    scene.background = new THREE.Color(0x0a1f16);
    // scene.background = new THREE.Color(0x015220);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.querySelector('#scene-container').appendChild(renderer.domElement);     // adds scene to #scene-container div
    // document.body.appendChild(renderer.domElement); // adds scene to main HTML body



    // ~~~~~~ Add lights ~~~~~~

    // ~~ add direction light to the right
    const lightRight = new THREE.DirectionalLight(0xffffff, 4);
    lightRight.position.set(3, 4, 5);
    scene.add(lightRight);

    // Add helper to debug the light's position - COMMENT OUT WHEN DONE placing the light! https://threejs.org/docs/#api/en/helpers/DirectionalLightHelper
    // const helperRight = new THREE.DirectionalLightHelper(lightRight, 5);
    // scene.add(helperRight);


    // ~~ add directional light to the left
    const lightLeft = new THREE.DirectionalLight(0xffff00, 4);
    lightLeft.position.set(-3, 2, 3);
    scene.add(lightLeft);

    // const helperLeft = new THREE.DirectionalLightHelper(lightLeft, 5);
    // scene.add(helperLeft);



    // ~~~~~~ Initiate add-ons ~~~~~~

    const controls = new OrbitControls(camera, renderer.domElement);
    const loader = new GLTFLoader(); // to load 3d models



    // ~~~~~~ Create Geometry ~~~~~~

    // create ball
    const geometryBall = new THREE.SphereGeometry(.3, 32, 16);

    // NOTE! You have to CHANGE MATERIAL FROM BASIC TO STANDARD for lighting

    // const materialBall = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // plain color

    const textureBall = new THREE.TextureLoader().load('textures/grasslight-big.jpg');
    const materialBall = new THREE.MeshStandardMaterial({ map: textureBall });


    ball = new THREE.Mesh(geometryBall, materialBall);
    scene.add(ball);


    // load dog model
    loader.load('assets/dog_shiny.gltf', function (gltf) {
        dog = gltf.scene;
        scene.add(dog);
        dog.scale.set(2, 2, 2);
        dog.position.y = -1.5; // move down a little

        // animation!
        mixer = new THREE.AnimationMixer(dog); // initiate mixer
        const clips = gltf.animations;  // load all clips

        // load + play pant animation
        const clipPant = THREE.AnimationClip.findByName(clips, 'pant');
        actionPant = mixer.clipAction(clipPant);
        actionPant.play();

        // load + play tail animation
        const clipTail = THREE.AnimationClip.findByName(clips, 'tail');
        actionTail = mixer.clipAction(clipTail);
        // actionTail.play(); // moved action tail to mouse events
    });



    // ~~~~~~Position Camera~~~~~~
    camera.position.z = 5;


}



// ~~~~~~~~~~~~~~~~ Mouse Events ~~~~~~~~~~~~~~~~

let mouseDown = false;

// try changing '#scene-container' to 'header' so that click applies to the header (and not the scene)

document.querySelector('#scene-container').addEventListener('mousedown', () => {
    console.log("mouse clicked");
    mouseDown = true;
    actionTail.play();
    actionTail.paused = false;

});
document.querySelector('#scene-container').addEventListener('mouseup', () => {
    console.log("mouse released");
    mouseDown = false;
    // actionTail.stop();
    actionTail.paused = true;

});

document.querySelector('#scene-container').addEventListener('mousemove', (e) => {
    if (mouseDown) {
        console.log("dragged");
        ball.rotation.x += .5;
    }
});




// ~~~~~~~~~~~~~~~~ Animation Loop ~~~~~~~~~~~~~~~~



const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate); // start loop by with frame update

    // →→→→→→ add your animation here ↓↓↓↓

    ball.rotation.x += 0.007;
    ball.rotation.y += 0.007;

    // --> animate ball position with sin wave

    // Date.now() returns the date in milliseconds. It constantly increases and creates an infinite sin wave
    // Play with the values: Math.sin(Date.now() / [increase # to slow]) * [increase # to amplify])
    ball.position.x = Math.sin(Date.now() / 5000) * 2;
    ball.position.y = Math.sin(Date.now() / 3000) * 2;
    ball.position.z = Math.sin(Date.now() / 4000) * 2;


    if (dog) { // check to see if model loaded first

        // animation mixer update
        mixer.update(clock.getDelta());

        // dog.rotation.y += 0.007; // 360 rotation
        dog.rotation.y = Math.sin(Date.now() / 2000) * 1.2; // sin rotation

    }

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


