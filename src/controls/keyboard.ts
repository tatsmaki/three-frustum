import { Vector3 } from "three";

export class KeyboardController {
  private w = false;
  private a = false;
  private s = false;
  private d = false;

  constructor() {
    document.onkeydown = this.handleKeyDown.bind(this);
    document.onkeyup = this.handleKeyUp.bind(this);
  }

  private handleKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case "KeyW": {
        this.w = true;
        break;
      }
      case "KeyA": {
        this.a = true;
        break;
      }
      case "KeyS": {
        this.s = true;
        break;
      }
      case "KeyD": {
        this.d = true;
        break;
      }
      default: {
        break;
      }
    }
  }

  private handleKeyUp(event: KeyboardEvent) {
    switch (event.code) {
      case "KeyW": {
        this.w = false;
        break;
      }
      case "KeyA": {
        this.a = false;
        break;
      }
      case "KeyS": {
        this.s = false;
        break;
      }
      case "KeyD": {
        this.d = false;
        break;
      }
      default: {
        break;
      }
    }
  }

  get direction() {
    const x = Number(this.d) - Number(this.a);
    const y = Number(this.w) - Number(this.s);

    return new Vector3(x, y, 0);
  }
}

export const keyboardController = new KeyboardController();
