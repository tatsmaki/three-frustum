import {
  CanvasTexture,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  Vector3,
} from "three";

const createTexture = (x: number, y: number) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.width = 256;
  canvas.height = 256;
  ctx.fillStyle = "white";
  ctx.font = "48px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const text = `${x},${y}`;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new CanvasTexture(canvas);

  return texture;
};

export const createChunk = (x: number, y: number) => {
  const planeGeo = new PlaneGeometry(10, 10);
  const planeMat = new MeshStandardMaterial({
    color: 0x47b598,
    transparent: true,
  });
  const plane = new Mesh(planeGeo, planeMat);
  const tilePos = new Vector3(x, y, 0);

  plane.userData = { tilePos };
  plane.material.lightMap = createTexture(x, y);
  plane.material.needsUpdate = true;

  return plane;
};

export type Chunk = ReturnType<typeof createChunk>;
