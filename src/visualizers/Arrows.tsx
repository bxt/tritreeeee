import type { TriangleVisualizer } from '../types';

export const Arrows: TriangleVisualizer = ({
  coords,
  orientation,
  path,
  onClick,
}) => {
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
        style={{ fill: 'var(--colorPrimary)' }}
        onClick={onClick}
      />
    </>
  );
};
