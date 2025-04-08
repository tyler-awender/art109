import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg')});

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 50;

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: 0xff6347 });

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);
torus.position.z=-50;
torus.position.x=-10;

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    camera.position.z = (t * 0.01);
    camera.position.y = (t * -0.01);
    camera.rotation.x = (t * 0.001);
}
document.body.onscroll = moveCamera;
moveCamera();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();