import { GridHelper, Group, Vector3 } from "three";
import { createChunk } from "./chunk";
import { fakeCamera } from "./fake_camera";
import throttle from "lodash.throttle";
import { mapTiles, tileSize } from "./map_config";

export const map = new Group();

for (let x = -mapTiles; x <= mapTiles; x += 1) {
  for (let y = -mapTiles; y <= mapTiles; y += 1) {
    const chunk = createChunk(x, y);
    const dx = x * tileSize;
    const dy = y * tileSize;

    chunk.position.set(dx, dy, 0);

    map.add(chunk);
  }
}

export const gridHelper = new GridHelper(tileSize * 10, 10);

gridHelper.rotateX(-Math.PI / 2);

let prevPos = new Vector3();

export const renderMap = throttle(() => {
  const playerPos = fakeCamera.position.clone();

  playerPos.x = Math.round(playerPos.x / tileSize);
  playerPos.y = Math.round(playerPos.y / tileSize);
  playerPos.z = 0;

  const diff = playerPos.clone().sub(prevPos);

  if (diff.length() > 0) {
    for (let i = map.children.length - 1; i >= 0; i -= 1) {
      const chunk = map.children[i];
      const tilePos = chunk.userData.tilePos;

      const dx = playerPos.x - tilePos.x;
      const dy = playerPos.y - tilePos.y;

      if (Math.abs(dy) > mapTiles) {
        const newPos = tilePos.clone();

        newPos.y += (mapTiles * 2 + 1) * Math.sign(dy);

        const newChunk = createChunk(newPos.x, newPos.y);

        newPos.multiplyScalar(tileSize);
        newChunk.position.copy(newPos);
        map.remove(chunk);
        map.add(newChunk);
      }

      if (Math.abs(dx) > mapTiles) {
        const newPos = tilePos.clone();

        newPos.x += (mapTiles * 2 + 1) * Math.sign(dx);

        const newChunk = createChunk(newPos.x, newPos.y);

        newPos.multiplyScalar(tileSize);
        newChunk.position.copy(newPos);
        map.remove(chunk);
        map.add(newChunk);
      }
    }

    prevPos.copy(playerPos);
  }
}, 100);
