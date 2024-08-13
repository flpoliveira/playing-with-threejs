import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";

// Create scene
const scene = new THREE.Scene();

const temp = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Set up camera
const fov = 45;
const aspect = temp.width / temp.height;
const near = 1;
const far = 10000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 2, 10);

// Set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(temp.width, temp.height);
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Strong directional light
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Set up OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.target.set(0, 0, 0); // Focus on the origin (or adjust as needed)
controls.update();

let mixer = null;

// Load FBX model
const loader = new FBXLoader();
loader.load(
  "/animated_human.fbx",
  function (object) {
    object.scale.set(0.01, 0.01, 0.01);

    // Set up the animation mixer
    mixer = new THREE.AnimationMixer(object);

    console.log("Object animations: ", object.animations[6]);

    // Assuming the first animation in the model
    const action = mixer.clipAction(object.animations[6]);
    action.play();
    scene.add(object);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error(error);
  }
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  if (mixer) mixer.update(0.01); // Adjust the time delta as necessary
  // Update controls
  controls.update();

  // Render the scene
  renderer.render(scene, camera);
}

// Start animation loop
animate();
