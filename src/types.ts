import { VFC } from 'react';

export const directions = ['mid', 'left', 'right', 'top'] as const;
export type Direction = typeof directions[number];
export type Path = Direction[];

export type Coord = [number, number];
export type TriangleCoords = [Coord, Coord, Coord];

export type TriTree =
  | { divided: true; children: Record<Direction, TriTree> }
  | { divided: false; orientation: number };

export type TriangleVisualizer = VFC<{
  coords: TriangleCoords;
  orientation: number;
  path: Path;
  onClick: () => void;
}>;
