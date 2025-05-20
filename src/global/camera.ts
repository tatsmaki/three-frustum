import { PerspectiveCamera } from "three";

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 100;

export const camera = new PerspectiveCamera(fov, aspect, near, far);

camera.position.set(0, 50, 0);
camera.lookAt(0, 0, 0);
