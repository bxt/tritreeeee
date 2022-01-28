import type { Path, TriTree } from './types';

import { tools, type Tool } from './tools';

const baseTriTree: TriTree = {
  divided: false,
  orientation: 2,
};

const actions: [Tool, Path][] = [
  [tools.subdivide, []],
  [tools.subdivide, ['mid']],
  [tools.rotate, ['mid', 'right']],
  [tools.subdivide, ['mid', 'mid']],
  [tools.subdivide, ['mid', 'mid', 'left']],
];

export const initialTriTree: TriTree = actions.reduce(
  (acc: TriTree, [tool, path]) => tool(acc, path),
  baseTriTree,
);
