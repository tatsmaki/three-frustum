import { Mesh, Vector3 } from "three";
import { createMat } from "./chunk_mat";
import { createGeometry } from "./chunk_geo";

export const createChunk = (x: number, y: number) => {
  const planeGeo = createGeometry(x, y);
  const planeMat = createMat(x, y);
  const plane = new Mesh(planeGeo, planeMat);
  const tilePos = new Vector3(x, y, 0);

  plane.userData = { tilePos };

  return plane;
};

export type Chunk = ReturnType<typeof createChunk>;
