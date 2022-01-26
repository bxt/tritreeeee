import { CircleSections } from './CircleSections';
import { Triangles } from './Triangles';
import { Arrows } from './Arrows';

export const triangleVisualizers = {
  CircleSections,
  Triangles,
  Arrows,
} as const;
export type TriangleVisualizersName = keyof typeof triangleVisualizers;
