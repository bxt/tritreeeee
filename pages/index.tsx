import type { NextPage } from 'next';
import Head from 'next/head';
import { FC, useCallback, useState } from 'react';
import styles from '../styles/Home.module.css';

const directions = ['mid', 'left', 'right', 'top'] as const;
type Direction = typeof directions[number];

type Coord = [number, number];
type TriangleCoords = [Coord, Coord, Coord];

type TriTree =
  | { divided: true; children: Record<Direction, TriTree> }
  | { divided: false; orientation: number };

const Triangle: FC<{
  coords: TriangleCoords;
  triTree: TriTree;
  path: Direction[];
  onClickTriangle: (path: Direction[]) => void;
}> = ({ coords, triTree, path, onClickTriangle }) => {
  if (triTree.divided) {
    const [l, m, r] = coords;
    const [[xl, yl], [xm, ym], [xr, yr]] = coords;
    const lm: Coord = [(xm + xl) / 2, (ym + yl) / 2];
    const rm: Coord = [(xm + xr) / 2, (ym + yr) / 2];
    const lr: Coord = [(xl + xr) / 2, (yl + yr) / 2];
    const { mid, left, right, top } = triTree.children;

    return (
      <>
        <Triangle
          triTree={left}
          coords={[l, lm, lr]}
          path={[...path, 'left']}
          onClickTriangle={onClickTriangle}
        />
        <Triangle
          triTree={right}
          coords={[lr, rm, r]}
          path={[...path, 'right']}
          onClickTriangle={onClickTriangle}
        />
        <Triangle
          triTree={mid}
          coords={[lm, lr, rm]}
          path={[...path, 'mid']}
          onClickTriangle={onClickTriangle}
        />
        <Triangle
          triTree={top}
          coords={[lm, m, rm]}
          path={[...path, 'top']}
          onClickTriangle={onClickTriangle}
        />
      </>
    );
  } else {
    const points = coords.map((c) => c.join(',')).join(' ');
    const fillNumber =
      triTree.orientation +
      path.reduce((acc, direction) => {
        return (
          acc +
          {
            mid: 0,
            left: 1,
            right: 3,
            top: 2,
          }[direction]
        );
      }, 0);
    const colors = [
      '#313131',
      '#77777',
      '#bfb1d5',
      '#adddcf',
      '#abe1fd',
      '#fed1be',
      '#f0e0a2',
      '#e8e7e5',
    ];
    const fill = colors[fillNumber % colors.length];
    return (
      <polygon
        points={points}
        data-path={path.join(',')}
        data-orientation={triTree.orientation}
        style={{ fill }}
        onClick={() => {
          onClickTriangle(path);
        }}
      />
    );
  }
};

const TriTreeVisualizer: FC<{
  triTree: TriTree;
  onClickTriangle: (path: Direction[]) => void;
}> = ({ triTree, onClickTriangle }) => {
  const initialPoints: TriangleCoords = [
    [0, 0],
    [500, 866],
    [1000, 0],
  ];
  return (
    <div className={styles.triContainer}>
      <svg viewBox="0 0 1000 866">
        <Triangle
          triTree={triTree}
          coords={initialPoints}
          path={[]}
          onClickTriangle={onClickTriangle}
        />
      </svg>
    </div>
  );
};

const initialTriTree: TriTree = {
  divided: true,
  children: {
    mid: {
      divided: true,
      children: {
        mid: {
          divided: false,
          orientation: 0,
        },
        left: {
          divided: false,
          orientation: 0,
        },
        right: {
          divided: false,
          orientation: 0,
        },
        top: {
          divided: false,
          orientation: 0,
        },
      },
    },
    left: {
      divided: false,
      orientation: 0,
    },
    right: {
      divided: false,
      orientation: 0,
    },
    top: {
      divided: false,
      orientation: 0,
    },
  },
};

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

const tools = { subdivide, rotate, merge } as const;
type ToolName = keyof typeof tools;

const Home: NextPage = () => {
  const [isControlsExpanded, setIsControlsExpanded] = useState(true);
  const [triTree, setTriTree] = useState<TriTree>(initialTriTree);
  const [toolName, setToolName] = useState<ToolName>('subdivide');

  const onClickTriangle = useCallback(
    (path: Direction[]): void => {
      setTriTree((triTree) => tools[toolName](triTree, path));
    },
    [toolName],
  );

  return (
    <>
      <Head>
        <title>Tritreeeee</title>
        <meta name="description" content="Build your own Tritree for fun" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <TriTreeVisualizer
          triTree={triTree}
          onClickTriangle={onClickTriangle}
        />
        <aside className={styles.controls}>
          <button
            title={isControlsExpanded ? 'collapse controls' : 'expand controls'}
            onClick={() => setIsControlsExpanded((x) => !x)}
          >
            {isControlsExpanded ? '-' : '+'}
          </button>
          {isControlsExpanded && (
            <>
              <span className={styles.title}>Tritreeeee</span>
              {Object.keys(tools).map((currentToolName) => (
                <>
                  {' '}
                  <button
                    key={currentToolName}
                    disabled={currentToolName === toolName}
                    onClick={() => {
                      setToolName(currentToolName as ToolName);
                    }}
                  >
                    {currentToolName}
                  </button>
                </>
              ))}
            </>
          )}
        </aside>
      </main>

      {isControlsExpanded && (
        <footer className={styles.footer}>
          {'Made 2022 by Bernhard Häussner – '}
          <a
            href="https://github.com/bxt/tritreeeee"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code on GitHub
          </a>
        </footer>
      )}
    </>
  );
};

export default Home;
