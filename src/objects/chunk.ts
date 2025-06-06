import { Mesh, MeshStandardMaterial, PlaneGeometry } from "three";

export const createChunk = () => {
  const planeGeo = new PlaneGeometry(10, 10);
  const planeMat = new MeshStandardMaterial({
    color: 0x47b598,
    transparent: true,
  });
  const plane = new Mesh(planeGeo, planeMat);

  return plane;
};

export type Chunk = ReturnType<typeof createChunk>;
