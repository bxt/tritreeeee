import { VFC } from 'react';
import styles from './CircleSections.module.css';
import type { TriangleCoords, TriangleVisualizer } from '../types';
import { distance, interpolatePoints, rotate } from '../coords';

const circleSectionsDepth = 7;
const circleSectionsStroke = 5;

const CircleSection: VFC<{
  coords: TriangleCoords;
  orientation: number;
  socketCount: number;
  socketNumber: number;
  sweepFlag: number;
}> = ({ coords, orientation, socketCount, socketNumber, sweepFlag }) => {
  const socketCountTwice = socketCount * 2;
  const [l, m, r] = rotate(coords, orientation);

  const fraction = (socketCountTwice - socketNumber * 2 - 1) / socketCountTwice;
  const from = interpolatePoints(m, l, fraction);
  const to = interpolatePoints(m, r, fraction);

  const radius = distance(m, from);

  const pathInstructions = [
    `M ${from.join(' ')}`,
    `A ${radius} ${radius} 0 0 ${sweepFlag} ${to.join(' ')}`,
  ];

  return (
    <path
      d={pathInstructions.join(' ')}
      className={styles.circleSection}
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
  const [l, m, r] = rotate(coords, orientation);

  const d = distance(l, m);
  const strokeFraction = ((circleSectionsStroke / d) * socketCountTwice) / 2;

  const fraction =
    (socketCountTwice - socketNumber * 2 - 1 + strokeFraction) /
    socketCountTwice;
  const from = interpolatePoints(m, r, fraction);
  const to = interpolatePoints(m, l, fraction);

  const radius = distance(m, from);

  const pathInstructions = [
    `M ${m.join(' ')}`,
    `L ${to.join(' ')}`,
    `A ${radius} ${radius} 0 0 ${sweepFlag} ${from.join(' ')}`,
    `Z`,
  ];

  return <path d={pathInstructions.join(' ')} className={styles.circleCover} />;
};

export const CircleSections: TriangleVisualizer = ({
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

  // whether the triangle is upside down
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
