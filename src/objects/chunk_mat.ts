import { CanvasTexture, MeshStandardMaterial } from "three";

const textureSize = 256;

const createTexture = (x: number, y: number) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.width = textureSize;
  canvas.height = textureSize;
  ctx.fillStyle = "white";
  ctx.font = "48px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const text = `${x},${y}`;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new CanvasTexture(canvas);

  return texture;
};

export const createMat = (x: number, y: number) => {
  const material = new MeshStandardMaterial({
    color: 0x47b598,
    transparent: true,
    lightMap: createTexture(x, y),
  });

  return material;
};
