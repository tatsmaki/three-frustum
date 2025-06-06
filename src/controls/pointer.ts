import { Vector3 } from "three";

class PointerControl {
  pointer = new Vector3();
  isActive = false;

  constructor() {
    document.onpointerdown = () => {
      this.isActive = true;
    };

    document.onpointermove = (event) => {
      if (this.isActive) {
        const { clientX, clientY } = event;

        const x = (clientX / window.innerWidth) * 2 - 1;
        const y = (clientY / window.innerHeight) * -2 + 1;

        this.pointer.set(x, y, 0);
      }
    };

    document.onpointerup = () => {
      this.isActive = false;
    };
  }
}

export const pointerControl = new PointerControl();
