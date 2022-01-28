import { VFC, useCallback, useState, Fragment } from 'react';
import { initialTriTree } from './initialTriTree';
import styles from './Main.module.css';
import { ButtonSelect, Select } from './Select';
import { ThemeName, themes } from './themes';
import { ToolName, tools } from './tools';
import { TriTreeVisualizer } from './TriTreeVisualizer';
import type { Path, TriTree } from './types';
import { triangleVisualizers, TriangleVisualizersName } from './visualizers';

export const Main: VFC = () => {
  const [isControlsExpanded, setIsControlsExpanded] = useState(true);
  const [triTree, setTriTree] = useState<TriTree>(initialTriTree);
  const [toolName, setToolName] = useState<ToolName>('subdivide');
  const [triangleVisualizerName, setTriangleVisualizerName] =
    useState<TriangleVisualizersName>('CircleSections');
  const [themeName, setThemeName] = useState<ThemeName>('grayscale');

  const onClickTriangle = useCallback(
    (path: Path): void => {
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
              <ButtonSelect<ToolName>
                values={tools}
                value={toolName}
                setValue={setToolName}
              />
              <> </>
              <Select<TriangleVisualizersName>
                values={triangleVisualizers}
                value={triangleVisualizerName}
                setValue={setTriangleVisualizerName}
              />
              <> </>
              <Select<ThemeName>
                values={themes}
                value={themeName}
                setValue={setThemeName}
              />
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
