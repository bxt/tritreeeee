import styles from './Lines.module.css';
import type { TriangleVisualizer } from '../types';
import { interpolatePoints, rotate } from '../coords';

const linesDepth = 7;

export const Lines: TriangleVisualizer = ({
  coords,
  orientation,
  path,
  onClick,
}) => {
  const size = linesDepth - path.length;
  if (size < 0) return <></>;

  const points = coords.map((c) => c.join(',')).join(' ');

  const socketCount = 2 ** size;
  const socketCountTwice = socketCount * 2;
  const [l, m, r] = rotate(coords, orientation);

  const pathInstructions = Array(socketCount)
    .fill(null)
    .flatMap((_, socketNumber) => {
      const fraction =
        (socketCountTwice - socketNumber * 2 - 1) / socketCountTwice;
      const from = interpolatePoints(l, r, fraction);
      const to = interpolatePoints(l, m, fraction);

      return [`M ${from.join(' ')}`, `L ${to.join(' ')}`];
    });

  return (
    <>
      <path d={pathInstructions.join(' ')} className={styles.line} />;
      <polygon
        points={points}
        className={styles.interactionHelper}
        onClick={onClick}
      />
    </>
  );
};
