import { PlaneGeometry } from "three";
import { getNoise } from "./noise";
import { tileSize } from "./map_config";

const tileSegments = 10;

export const createGeometry = (x: number, y: number) => {
  const geometry = new PlaneGeometry(
    tileSize,
    tileSize,
    tileSegments,
    tileSegments
  );
  const positions = geometry.attributes.position.array;

  for (let i = 0; i < positions.length; i += 3) {
    const vx = positions[i] / 10 + x;
    const vy = positions[i + 1] / 10 + y;

    positions[i + 2] = getNoise(vx, vy) * 2;
  }

  return geometry;
};
