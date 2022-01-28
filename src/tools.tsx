import type { Path, TriTree } from './types';

export type Tool = (triTri: TriTree, path: Path) => TriTree;

type Mapper = (riTri: TriTree) => TriTree;

const makeToolFromMapper = (mapper: Mapper): Tool => {
  const tool: Tool = (triTri, path) => {
    if (path.length === 0) return mapper(triTri);

    const [next, ...rest] = path;

    if (!triTri.divided)
      throw new Error('Moving down a path which is not split');

    return {
      ...triTri,
      children: {
        ...triTri.children,
        [next]: tool(triTri.children[next], rest),
      },
    };
  };

  return tool;
};

const rotate = makeToolFromMapper((triTri) => {
  if (triTri.divided) throw new Error('Rotating a path which is split');
  return {
    ...triTri,
    orientation: triTri.orientation + 1,
  };
});

const subdivide = makeToolFromMapper((triTri) => ({
  divided: true,
  children: {
    mid: triTri,
    left: triTri,
    right: triTri,
    top: triTri,
  },
}));

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
