import { Euler } from "three";
import { fakeCamera } from "../objects/fake_camera";

class PointerController {
  euler = new Euler(0, 0, 0, "YXZ");
  isActive = false;

  constructor() {
    document.onpointerdown = () => {
      this.isActive = true;
    };

    document.onpointermove = (event) => {
      if (this.isActive) {
        const { movementX, movementY } = event;

        this.euler.setFromQuaternion(fakeCamera.quaternion);
        this.euler.x -= movementY * 0.004;
        this.euler.y -= movementX * 0.004;

        this.euler.x = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, this.euler.x)
        );
      }
    };

    document.onpointerup = () => {
      this.isActive = false;
    };
  }
}

export const pointerController = new PointerController();
