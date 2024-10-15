import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.JS Scene
const scene = new THREE.Scene();

// Create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0.2, -0.7, 5); // Ajuste a posição da câmera conforme necessário

// Instantiate a loader for the .glb file
const loader = new GLTFLoader();

let mixer; // Para gerenciar animações

// Load the file
loader.load('3d/spaceman.glb', function (gltf) {
    // If the file is loaded, add it to the scene
    const object = gltf.scene;
    scene.add(object);

    // Adjust the initial position and rotation of the model
    object.position.set(0.2, -0.7, 0); // Ajuste a posição conforme necessário
    object.rotation.set(0, 2.2, 0); // Ajuste a rotação conforme necessário
    object.scale.set(2.5, 2.5, 2.5); // Ajuste a escala conforme necessário

    // Se houver animações no modelo
    if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(object);
        gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play(); // Reproduz cada animação
        });
    }

}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, function (error) {
    console.error(error);
});

// Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

// Add lights to the scene, so we can actually see the 3D model
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(-5, -5, -5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    
    // Atualiza o mixer de animação, se houver animações
    if (mixer) {
        mixer.update(0.01); // Atualiza a animação
    }

    renderer.render(scene, camera);
}

// Start the 3D rendering
animate();
