import { ambientLight } from "./global/ambient_light";
import { camera } from "./global/camera";
import { renderer } from "./global/renderer";
import { scene } from "./global/scene";
import { fakeCameraGroup, renderFakeCamera } from "./objects/fake_camera";
import { gridHelper, map, renderMap } from "./objects/map";
import "./style.css";

scene.add(camera, map, gridHelper, ambientLight, fakeCameraGroup);

renderer.setAnimationLoop(() => {
  renderFakeCamera();
  renderMap();
  renderer.render(scene, camera);
});

const onResize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

onResize();

window.addEventListener("resize", onResize);
