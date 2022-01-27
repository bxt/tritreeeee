import { VFC } from 'react';
import styles from './CircleSections.module.css';
import type { TriangleCoords, TriangleVisualizer } from '../types';

const circleSectionsDepth = 7;
const circleSectionsStroke = 5;

export const CircleSection: VFC<{
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
      className={styles.circleCover}
    />
  );
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
