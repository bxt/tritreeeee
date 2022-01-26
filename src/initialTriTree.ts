import { TriTree } from './types';

import { tools } from './tools';

const baseTriTree: TriTree = {
  divided: false,
  orientation: 0,
};

export const initialTriTree: TriTree = tools.subdivide(
  tools.subdivide(baseTriTree, []),
  ['mid'],
);
