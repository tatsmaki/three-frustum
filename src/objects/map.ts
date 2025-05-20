import { GridHelper, Group } from "three";
import { createChunk } from "./chunk";

export const map = new Group();

map.rotateX(-Math.PI / 2);

for (let x = -2; x < 2; x++) {
  for (let y = -2; y < 2; y++) {
    const chunk = createChunk();

    const dx = x * 10;
    const dy = y * 10;

    chunk.position.set(dx + 5, dy + 5, 0);

    map.add(chunk);
  }
}

export const gridHelper = new GridHelper(100, 10);
