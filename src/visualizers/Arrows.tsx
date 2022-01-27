import { interpolatePoints, rotate } from '../coords';
import type { TriangleVisualizer } from '../types';

export const Arrows: TriangleVisualizer = ({
  coords,
  orientation,
  path,
  onClick,
}) => {
  const [l, m, r] = rotate(coords, orientation);

  const llr = interpolatePoints(l, r, 2 / 3);
  const lrr = interpolatePoints(l, r, 1 / 3);
  const coordsArrow = [llr, m, lrr];
  const pointsArrow = coordsArrow.map((c) => c.join(',')).join(' ');

  return (
    <>
      <polygon
        points={pointsArrow}
        style={{ fill: 'var(--colorPrimary)' }}
        onClick={onClick}
      />
    </>
  );
};
