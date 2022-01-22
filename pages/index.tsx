import type { NextPage } from 'next';
import Head from 'next/head';
import { VFC, useCallback, useState, Fragment } from 'react';
import styles from '../styles/Home.module.css';

const directions = ['mid', 'left', 'right', 'top'] as const;
type Direction = typeof directions[number];

type Coord = [number, number];
type TriangleCoords = [Coord, Coord, Coord];

type TriTree =
  | { divided: true; children: Record<Direction, TriTree> }
  | { divided: false; orientation: number };

type TriangleVisualizer = VFC<{
  coords: TriangleCoords;
  orientation: number;
  path: Direction[];
  onClick: () => void;
}>;

const PastellyTris: TriangleVisualizer = ({
  coords,
  orientation,
  path,
  onClick,
}) => {
  const points = coords.map((c) => c.join(',')).join(' ');
  const fillNumber =
    orientation +
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
      data-orientation={orientation}
      style={{ fill }}
      onClick={onClick}
    />
  );
};

const Arrows: TriangleVisualizer = ({ coords, orientation, path, onClick }) => {
  const points = coords.map((c) => c.join(',')).join(' ');

  const [[xl, yl], m, [xr, yr]] = coords.map(
    (_, i) => coords[(i + orientation) % coords.length],
  );
  const llr = [(xl + xl + xr) / 3, (yl + yl + yr) / 3];
  const lrr = [(xl + xr + xr) / 3, (yl + yr + yr) / 3];
  const coordsArrow = [llr, m, lrr];
  const pointsArrow = coordsArrow.map((c) => c.join(',')).join(' ');

  return (
    <>
      <polygon
        points={pointsArrow}
        style={{ fill: '#e1933b' }}
        onClick={onClick}
      />
    </>
  );
};

const circleSectionsDepth = 7;
const circleSectionsStroke = 4;

const CircleSection: VFC<{
  coords: TriangleCoords;
  orientation: number;
  socketCount: number;
  socketNumber: number;
  sweepFlag: number;
}> = ({ coords, orientation, socketCount, socketNumber, sweepFlag }) => {
  const socketCountTwice = socketCount * 2;

  const [[xl, yl], [xm, ym], [xr, yr]] = coords.map(
    (_, i) => coords[(i + orientation) % coords.length],
  );

  const a = socketCountTwice - socketNumber * 2 - 1;
  const b = socketNumber * 2 + 1;
  const from = [
    (xl * a + xr * b) / socketCountTwice,
    (yl * a + yr * b) / socketCountTwice,
  ];
  const to = [
    (xl * a + xm * b) / socketCountTwice,
    (yl * a + ym * b) / socketCountTwice,
  ];
  const r = Math.sqrt((xl - from[0]) ** 2 + (yl - from[1]) ** 2);
  return (
    <path
      d={`M ${from.join(' ')} A ${r} ${r} 0 0 ${sweepFlag} ${to.join(' ')}`}
      fill="none"
      stroke="hotpink"
      strokeWidth={circleSectionsStroke}
    />
  );
};

const CircleCover: VFC<{
  coords: TriangleCoords;
  orientation: number;
  socketCount: number;
  socketNumber: number;
  sweepFlag: number;
}> = ({ coords, orientation, socketCount, socketNumber, sweepFlag }) => {
  const socketCountTwice = socketCount * 2;

  const [[xl, yl], [xm, ym], [xr, yr]] = coords.map(
    (_, i) => coords[(i + orientation) % coords.length],
  );

  const d = Math.sqrt((xl - xm) ** 2 + (yl - ym) ** 2);
  const strokeFraction = ((circleSectionsStroke / d) * socketCountTwice) / 2;

  const a = socketCountTwice - socketNumber * 2 - 1 + strokeFraction;
  const b = socketNumber * 2 + 1 - strokeFraction;
  const from = [
    (xl * a + xr * b) / socketCountTwice,
    (yl * a + yr * b) / socketCountTwice,
  ];
  const to = [
    (xl * a + xm * b) / socketCountTwice,
    (yl * a + ym * b) / socketCountTwice,
  ];
  const r = Math.sqrt((xl - from[0]) ** 2 + (yl - from[1]) ** 2);
  return (
    <path
      d={`M ${xl} ${yl} L ${from.join(
        ' ',
      )} A ${r} ${r} 0 0 ${sweepFlag} ${to.join(' ')} Z`}
      fill="rgb(50, 0, 90)"
    />
  );
};

const CircleSections: TriangleVisualizer = ({
  coords,
  orientation,
  path,
  onClick,
}) => {
  const size = circleSectionsDepth - path.length;
  if (size < 0) return <></>;

  const points = coords.map((c) => c.join(',')).join(' ');

  const socketCount = 2 ** size;
  const skipSockets = size >= 2 ? 2 ** (size - 2) : 0;
  const coreSocketCount = socketCount - skipSockets;
  const leftSocketCount = size >= 2 ? 2 ** (size - 1) + 1 : 0;
  const rightSocketCount = size >= 2 ? 2 ** (size - 1) - 1 : 0;

  const sweepFlag =
    (1 + path.length + path.filter((direction) => direction !== 'mid').length) %
    2;

  return (
    <>
      {Array(leftSocketCount)
        .fill(null)
        .map((_, i) => (
          <CircleSection
            key={i}
            coords={coords}
            orientation={orientation + 1}
            socketCount={socketCount}
            socketNumber={i}
            sweepFlag={sweepFlag}
          />
        ))}
      {Array(rightSocketCount)
        .fill(null)
        .map((_, i) => (
          <CircleSection
            key={i}
            coords={coords}
            orientation={orientation + 2}
            socketCount={socketCount}
            socketNumber={i}
            sweepFlag={sweepFlag}
          />
        ))}
      <CircleCover
        coords={coords}
        orientation={orientation}
        socketCount={socketCount}
        socketNumber={coreSocketCount}
        sweepFlag={sweepFlag}
      />
      {Array(coreSocketCount)
        .fill(null)
        .map((_, i) => (
          <CircleSection
            key={i}
            coords={coords}
            orientation={orientation}
            socketCount={socketCount}
            socketNumber={i}
            sweepFlag={sweepFlag}
          />
        ))}

      <polygon
        points={points}
        className={styles.interactionHelper}
        onClick={onClick}
      />
    </>
  );
};

const triangleVisualizers = { CircleSections, PastellyTris, Arrows } as const;
type TriangleVisualizersName = keyof typeof triangleVisualizers;

const Triangle: VFC<{
  coords: TriangleCoords;
  triTree: TriTree;
  path: Direction[];
  onClickTriangle: (path: Direction[]) => void;
  TriangleVisualizer: TriangleVisualizer;
}> = ({ coords, triTree, path, onClickTriangle, TriangleVisualizer }) => {
  const onClick = useCallback(() => {
    onClickTriangle(path);
  }, [onClickTriangle, path]);

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
          TriangleVisualizer={TriangleVisualizer}
        />
        <Triangle
          triTree={right}
          coords={[lr, rm, r]}
          path={[...path, 'right']}
          onClickTriangle={onClickTriangle}
          TriangleVisualizer={TriangleVisualizer}
        />
        <Triangle
          triTree={mid}
          coords={[lm, lr, rm]}
          path={[...path, 'mid']}
          onClickTriangle={onClickTriangle}
          TriangleVisualizer={TriangleVisualizer}
        />
        <Triangle
          triTree={top}
          coords={[lm, m, rm]}
          path={[...path, 'top']}
          onClickTriangle={onClickTriangle}
          TriangleVisualizer={TriangleVisualizer}
        />
      </>
    );
  } else {
    return (
      <TriangleVisualizer
        coords={coords}
        orientation={triTree.orientation}
        path={path}
        onClick={onClick}
      />
    );
  }
};

const TriTreeVisualizer: VFC<{
  triTree: TriTree;
  onClickTriangle: (path: Direction[]) => void;
  TriangleVisualizer: TriangleVisualizer;
}> = ({ triTree, onClickTriangle, TriangleVisualizer }) => {
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
          TriangleVisualizer={TriangleVisualizer}
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
  const [triangleVisualizerName, setTriangleVisualizerName] =
    useState<TriangleVisualizersName>('CircleSections');

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
          TriangleVisualizer={triangleVisualizers[triangleVisualizerName]}
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
              <span className={styles.title}> Tritreeeee</span>
              {Object.keys(tools).map((currentToolName) => (
                <Fragment key={currentToolName}>
                  {' '}
                  <button
                    disabled={currentToolName === toolName}
                    onClick={() => {
                      setToolName(currentToolName as ToolName);
                    }}
                  >
                    {currentToolName}
                  </button>
                </Fragment>
              ))}{' '}
              <select
                value={triangleVisualizerName}
                onChange={(event) => {
                  setTriangleVisualizerName(
                    event.target.value as TriangleVisualizersName,
                  );
                }}
              >
                {Object.keys(triangleVisualizers).map(
                  (currentTriangleVisualizerName) => (
                    <option key={currentTriangleVisualizerName}>
                      {currentTriangleVisualizerName}
                    </option>
                  ),
                )}
              </select>
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
