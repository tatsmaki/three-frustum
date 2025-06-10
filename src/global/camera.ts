import { PerspectiveCamera, Vector3 } from "three";

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 100;

export const camera = new PerspectiveCamera(fov, aspect, near, far);

export const cameraOffset = new Vector3(0, -30, 30);

camera.position.copy(cameraOffset);
camera.lookAt(0, -5, 0);
