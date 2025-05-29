import {
  CameraHelper,
  Euler,
  // Frustum,
  // Matrix4,
  PerspectiveCamera,
} from "three";
import { pointerController } from "../controls/pointer";
import { keyboardController } from "../controls/keyboard";

const fov = 30;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 30;

const height = 1;
// const m4 = new Matrix4();

export const fakeCamera = new PerspectiveCamera(fov, aspect, near, far);

fakeCamera.position.set(0, 0, height);
// fakeCamera.lookAt(0, 10, height);
// fakeCamera.rotateX(Math.PI / 2);

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
