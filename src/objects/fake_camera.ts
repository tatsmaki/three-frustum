import {
  CameraHelper,
  Frustum,
  Group,
  Matrix4,
  PerspectiveCamera,
} from "three";
import { pointerControl } from "../controls/pointer";
import { keyboardController } from "../controls/keyboard";
import { map } from "./map";
import type { Chunk } from "./chunk";

const fov = 50;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 30;

const height = 1;
const matrix = new Matrix4();
const frustum = new Frustum();

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

  fakeCamera.position.addScaledVector(direction, 0.2);

  matrix.copy(fakeCamera.projectionMatrix);
  matrix.multiply(fakeCamera.matrixWorldInverse);
  frustum.setFromProjectionMatrix(matrix);

  map.children.forEach((child) => {
    const chunk = child as Chunk;

    if (frustum.intersectsObject(chunk)) {
      chunk.material.opacity = 1;
    } else {
      chunk.material.opacity = 0.5;
    }
  });
};
