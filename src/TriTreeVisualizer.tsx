import { VFC, useCallback } from 'react';
import { interpolatePoints } from './coords';
import styles from './TriTreeVisualizer.module.css';
import type {
  Path,
  TriangleCoords,
  TriangleVisualizer,
  TriTree,
} from './types';

const Triangle: VFC<{
  coords: TriangleCoords;
  triTree: TriTree;
  path: Path;
  onClickTriangle: (path: Path) => void;
  TriangleVisualizer: TriangleVisualizer;
}> = ({ coords, triTree, path, onClickTriangle, TriangleVisualizer }) => {
  const onClick = useCallback(() => {
    onClickTriangle(path);
  }, [onClickTriangle, path]);

  if (triTree.divided) {
    const [l, m, r] = coords;
    const lm = interpolatePoints(m, l, 0.5);
    const rm = interpolatePoints(m, r, 0.5);
    const lr = interpolatePoints(l, r, 0.5);
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

export const TriTreeVisualizer: VFC<{
  triTree: TriTree;
  onClickTriangle: (path: Path) => void;
  TriangleVisualizer: TriangleVisualizer;
}> = ({ triTree, onClickTriangle, TriangleVisualizer }) => {
  const initialPoints: TriangleCoords = [
    [0, 0],
    [500, 866],
    [1000, 0],
  ];
  return (
    <div className={styles.triTreeVisualizer}>
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
