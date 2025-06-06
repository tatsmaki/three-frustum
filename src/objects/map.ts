import { GridHelper, Group, Vector3 } from "three";
import { createChunk } from "./chunk";
import { fakeCamera } from "./fake_camera";
import throttle from "lodash.throttle";

export const map = new Group();

const mapTiles = 2;
const mapTileSize = 10;

for (let x = -mapTiles; x <= mapTiles; x += 1) {
  for (let y = -mapTiles; y <= mapTiles; y += 1) {
    const chunk = createChunk(x, y);
    const dx = x * mapTileSize;
    const dy = y * mapTileSize;

    chunk.position.set(dx, dy, 0);
    chunk.userData.chunk = { x, y };

    map.add(chunk);
  }
}

export const gridHelper = new GridHelper(mapTileSize * 10, 10);

gridHelper.rotateX(-Math.PI / 2);

let prevPos = new Vector3();

export const renderMap = throttle(() => {
  const playerPos = fakeCamera.position.clone();

  playerPos.x = Math.round(playerPos.x / mapTileSize);
  playerPos.y = Math.round(playerPos.y / mapTileSize);
  playerPos.z = 0;

  const diff = playerPos.clone().sub(prevPos);

  diff.multiplyScalar(mapTileSize);

  if (diff.length() > 0) {
    map.children.forEach((chunk) => {
      chunk.position.add(diff);
    });

    prevPos.copy(playerPos);
  }
}, 100);
