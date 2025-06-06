import { Color, FogExp2, Scene } from "three";

export const scene = new Scene();

scene.background = new Color(0x2d313d);
scene.fog = new FogExp2(0xffffff, 0.01);
