import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const geometry = new THREE.IcosahedronGeometry(1.0, 2);
const material = new THREE.MeshStandardMaterial({
  color: "9D9D9D",
  flatShading: true,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const temp = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const fov = 75;
const aspect = temp.width / temp.height;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0x080820, 1);
scene.add(hemiLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(temp.width, temp.height);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

const loader = new GLTFLoader();

document.body.appendChild(renderer.domElement);

const wireMesh = new THREE.MeshBasicMaterial({
  color: "white",
  wireframe: true,
});
const wireframe = new THREE.Mesh(geometry, wireMesh);
cube.add(wireframe);

camera.position.z = 2;
renderer.render(scene, camera);

function animate(t = 0) {
  requestAnimationFrame(animate);
  cube.rotation.y = t * 0.0001;
  renderer.render(scene, camera);
}

animate();
