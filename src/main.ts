import { ambientLight } from "./global/ambient_light";
import { camera } from "./global/camera";
import { renderer } from "./global/renderer";
import { scene } from "./global/scene";
import {
  fakeCamera,
  fakeCameraHelper,
  renderFakeCamera,
} from "./objects/fake_camera";
import { map } from "./objects/map";
import "./style.css";

scene.add(camera, map, ambientLight, fakeCamera, fakeCameraHelper);

renderer.setAnimationLoop(() => {
  renderFakeCamera();
  renderer.render(scene, camera);
});

const onResize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

onResize();

window.addEventListener("resize", onResize);
