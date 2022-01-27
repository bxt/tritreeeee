import { CircleSections } from './CircleSections';
import { Triangles } from './Triangles';
import { Lines } from './Lines';
import { Arrows } from './Arrows';

export const triangleVisualizers = {
  CircleSections,
  Triangles,
  Lines,
  Arrows,
} as const;
export type TriangleVisualizersName = keyof typeof triangleVisualizers;
