import { Vector2 } from "three";

class PointerControl {
  pointer = new Vector2();
  isActive = false;

  constructor() {
    document.onpointerdown = () => {
      this.isActive = true;
    };

    document.onpointermove = (event) => {
      if (this.isActive) {
        const { screenX, screenY } = event;

        const x = (screenX / window.innerWidth) * 2 - 1;
        const y = (screenY / window.innerHeight) * -2 + 1;

        this.pointer.set(x, y);
      }
    };

    document.onpointerup = () => {
      this.isActive = false;
    };
  }
}

export const pointerControl = new PointerControl();
