import { getColor } from '../themes';
import { TriangleVisualizer } from '../types';

export const Triangles: TriangleVisualizer = ({
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
  const fill = getColor(fillNumber);
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
