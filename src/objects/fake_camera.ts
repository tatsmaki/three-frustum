import {
  CameraHelper,
  Euler,
  Frustum,
  Matrix4,
  PerspectiveCamera,
} from "three";
import { pointerController } from "../controls/pointer";
import { keyboardController } from "../controls/keyboard";

const height = 1;
const m4 = new Matrix4();

export const fakeCamera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30
);

fakeCamera.position.set(0, height, 0);
fakeCamera.lookAt(10, height, 0);

export const fakeCameraHelper = new CameraHelper(fakeCamera);

export const renderFakeCamera = () => {
  fakeCamera.quaternion.setFromEuler(pointerController.euler);

  const direction = keyboardController.direction.normalize();

  const euler = new Euler();
  euler.setFromQuaternion(fakeCamera.quaternion, "YXZ");
  euler.x = 0;
  direction.applyEuler(euler);
  fakeCamera.position.addScaledVector(direction, 0.1);

  // const frustum = new Frustum().setFromProjectionMatrix(
  //   m4.copy(fakeCamera.projectionMatrix).multiply(fakeCamera.matrixWorldInverse)
  // );

  // console.log(frustum);
};
