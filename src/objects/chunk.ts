import { Mesh, MeshStandardMaterial, PlaneGeometry } from "three";

export const createChunk = () => {
  const planeGeo = new PlaneGeometry(10, 10);
  const planeMat = new MeshStandardMaterial();
  const plane = new Mesh(planeGeo, planeMat);

  return plane;
};
