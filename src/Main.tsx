import { VFC, useCallback, useState, Fragment } from 'react';
import { initialTriTree } from './initialTriTree';
import styles from './Main.module.css';
import { ThemeName, themes } from './themes';
import { ToolName, tools } from './tools';
import { TriTreeVisualizer } from './TriTreeVisualizer';
import { Direction, TriTree } from './types';
import { triangleVisualizers, TriangleVisualizersName } from './visualizers';

export const Main: VFC = () => {
  const [isControlsExpanded, setIsControlsExpanded] = useState(true);
  const [triTree, setTriTree] = useState<TriTree>(initialTriTree);
  const [toolName, setToolName] = useState<ToolName>('subdivide');
  const [triangleVisualizerName, setTriangleVisualizerName] =
    useState<TriangleVisualizersName>('CircleSections');
  const [themeName, setThemeName] = useState<ThemeName>('grayscale');

  const onClickTriangle = useCallback(
    (path: Direction[]): void => {
      setTriTree((triTree) => tools[toolName](triTree, path));
    },
    [toolName],
  );

  return (
    <div className={`${themes[themeName]} ${styles.theme}`}>
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
              </select>{' '}
              <select
                value={themeName}
                onChange={(event) => {
                  setThemeName(event.target.value as ThemeName);
                }}
              >
                {Object.keys(themes).map((currentThemeName) => (
                  <option key={currentThemeName}>{currentThemeName}</option>
                ))}
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
    </div>
  );
};
