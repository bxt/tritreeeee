import type { Direction, TriTree } from './types';

type Tool = (triTri: TriTree, path: Direction[]) => TriTree;

const subdivide: Tool = (triTri, path) => {
  if (path.length === 0)
    return {
      divided: true,
      children: {
        mid: triTri,
        left: triTri,
        right: triTri,
        top: triTri,
      },
    };

  const [next, ...rest] = path;

  if (!triTri.divided) throw new Error('Moving down a path which is not split');

  return {
    ...triTri,
    children: {
      ...triTri.children,
      [next]: subdivide(triTri.children[next], rest),
    },
  };
};

const rotate: Tool = (triTri, path) => {
  if (path.length === 0) {
    if (triTri.divided) throw new Error('Rotating a path which is split');
    return {
      ...triTri,
      orientation: triTri.orientation + 1,
    };
  }

  const [next, ...rest] = path;

  if (!triTri.divided) throw new Error('Moving down a path which is not split');

  return {
    ...triTri,
    children: {
      ...triTri.children,
      [next]: rotate(triTri.children[next], rest),
    },
  };
};

const merge: Tool = (triTri, path) => {
  if (path.length === 0) {
    // trying to merge topmost tri
    return triTri;
  }

  if (path.length === 1) {
    if (!triTri.divided) throw new Error('Merging a path which is not split');
    return triTri.children[path[0]];
  }

  const [next, ...rest] = path;

  if (!triTri.divided) throw new Error('Moving down a path which is not split');

  return {
    ...triTri,
    children: {
      ...triTri.children,
      [next]: merge(triTri.children[next], rest),
    },
  };
};

export const tools = { subdivide, rotate, merge } as const;
export type ToolName = keyof typeof tools;
