import { Group } from "three";
import { createChunk } from "./chunk";

export const map = new Group();

map.rotateX(-Math.PI / 2);

for (let i = 0; i < 10 * 10; i++) {
  const chunk = createChunk();

  chunk.position.set(i * 10, 0, 0);

  map.add(chunk);
}
