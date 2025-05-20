import { Mesh, MeshStandardMaterial, PlaneGeometry } from "three";

export const createChunk = () => {
  const planeGeo = new PlaneGeometry(10, 10);
  const planeMat = new MeshStandardMaterial({
    color: 0x00ff00,
    // transparent: true,
    // opacity: 0.5,
  });
  const plane = new Mesh(planeGeo, planeMat);

  return plane;
};
