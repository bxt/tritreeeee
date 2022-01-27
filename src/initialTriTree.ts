import type { TriTree } from './types';

import { tools } from './tools';

const baseTriTree: TriTree = {
  divided: false,
  orientation: 0,
};

export const initialTriTree: TriTree = tools.rotate(
  tools.subdivide(
    tools.subdivide(
      tools.subdivide(tools.subdivide(baseTriTree, []), ['mid']),
      ['mid', 'mid'],
    ),
    ['mid', 'mid', 'left'],
  ),
  ['mid', 'right'],
);
