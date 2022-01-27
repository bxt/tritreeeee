import { Coord, TriangleCoords } from './types';

export const distance = ([x1, y1]: Coord, [x2, y2]: Coord): number =>
  Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

export const interpolatePoints = (
  [x1, y1]: Coord,
  [x2, y2]: Coord,
  fraction: number,
): Coord => {
  const otherFraction = 1 - fraction;
  return [
    x1 * fraction + x2 * otherFraction,
    y1 * fraction + y2 * otherFraction,
  ];
};

export const rotate = (
  triangleCoords: TriangleCoords,
  orientation: number,
): TriangleCoords =>
  triangleCoords.map(
    (_, i) => triangleCoords[(i + orientation) % triangleCoords.length],
  ) as TriangleCoords;
