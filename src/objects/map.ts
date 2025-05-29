import { GridHelper, Group, Vector2, Vector3 } from "three";
import { createChunk } from "./chunk";
import { fakeCamera } from "./fake_camera";
import throttle from "lodash.throttle";

export const map = new Group();

const mapTiles = 2;
const mapTileSize = 10;
// const maxDistance = mapTileSize * mapTiles;
const chunkOffset = new Vector3(mapTileSize / 2, mapTileSize / 2, 0);
const maxChunks = mapTiles * Math.sqrt(2);

map.position.copy(chunkOffset);

for (let x = -mapTiles; x < mapTiles; x += 1) {
  for (let y = -mapTiles; y < mapTiles; y += 1) {
    const chunk = createChunk();

    const dx = x * mapTileSize;
    const dy = y * mapTileSize;

    chunk.position.set(dx, dy, 0);
    // chunk.position.add(chunkOffset);
    // chunk.userData = { x, y };
    chunk.userData = {
      position: new Vector2(x, y),
    };

    map.add(chunk);
  }
}

export const gridHelper = new GridHelper(mapTileSize * 10, 10);

gridHelper.rotateX(-Math.PI / 2);

export const renderMap = throttle(() => {
  const playerPos = new Vector2(fakeCamera.position.x, fakeCamera.position.y);

  playerPos.x =
    Math.sign(playerPos.x) * Math.ceil(Math.abs(playerPos.x) / mapTileSize);
  playerPos.y =
    Math.sign(playerPos.y) * Math.ceil(Math.abs(playerPos.y) / mapTileSize);

  // console.log(playerPos);

  // 1 delete tile -> add tile (reposition)

  map.children.forEach((chunk) => {
    const position = chunk.userData.position;
    const distance = playerPos.distanceTo(position);

    if (distance > maxChunks) {
      // console.log(chunk.userData.position, distance);

      const oldPos = position.clone();

      const newPos = playerPos.clone().sub(oldPos);

      // console.log(newPos);
      // chunk.userData = {
      //   position: new Vector2(newPos.x, newPos.y),
      // };
      chunk.position.set(newPos.x * mapTileSize, newPos.y * mapTileSize, 0);
    }
  });

  // 2 calc new tiles around new player pos
}, 100);
