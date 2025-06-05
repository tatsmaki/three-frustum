import { CameraHelper, Group, PerspectiveCamera } from "three";
import { pointerControl } from "../controls/pointer";
import { keyboardController } from "../controls/keyboard";

const fov = 30;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 30;

const height = 1;

export const fakeCamera = new PerspectiveCamera(fov, aspect, near, far);
export const fakeCameraHelper = new CameraHelper(fakeCamera);
export const fakeCameraGroup = new Group();

fakeCameraGroup.add(fakeCamera, fakeCameraHelper);

fakeCamera.position.set(0, 0, height);
fakeCamera.rotateX(Math.PI / 2);

export const renderFakeCamera = () => {
  const pointer = pointerControl.pointer;

  if (pointer.length()) {
    const angle = Math.atan2(pointer.y, pointer.x);
    fakeCamera.rotation.y = angle - Math.PI / 2;
  }

  const direction = keyboardController.direction.normalize();

  fakeCamera.position.addScaledVector(direction, 0.1);
};
