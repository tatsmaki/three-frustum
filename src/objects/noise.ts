import Noise from "noise-ts";

const seed = Math.PI;

const noise = new Noise(seed);

export const getNoise = (x: number, y: number) => {
  return noise.perlin2(x, y);
};
