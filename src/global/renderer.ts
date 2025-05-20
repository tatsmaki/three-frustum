import { WebGLRenderer } from "three";

const canvas = document.getElementById("app")!;

export const renderer = new WebGLRenderer({
  canvas,
  antialias: true,
});
